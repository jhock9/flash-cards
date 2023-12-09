const router = require('express').Router();
const url = require('url');
const logger = require('../config/winston');
const Token = require('../models/tokenModel');
const { oauth2Client } = require('../config/googleClient');
const updatePhotoData = require('../controllers/photoUpdateController'); // updatePhotoData(oauth2Client)

// Generate the URL that will be used for the consent dialog
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline', // Gets refresh token
  scope: 'https://www.googleapis.com/auth/photoslibrary.readonly',
  include_granted_scopes: true,
  response_type: 'code',
});
logger.info('OAuth2 client AUTH URL generated...');

// Redirect to Google's OAuth 2.0 server
router.get('/authorize', (req, res) => {
  logger.debug('Received request for /authorize...')
  logger.info('Received request for /authorize...');
  res.redirect(authUrl);
  logger.info("Redirected to Google's OAuth 2.0 server...");
  // This response will be sent back to the specified redirect URL 
  // with endpoint /oauth2callback
});

// Exchange authorization code for access and refresh tokens
router.get('/oauth2callback', async (req, res) => {
  logger.debug(`Received OAuth2 callback with URL: ${req.url}`);
  try {
    logger.info('Received request for /oauth2callback...');
    const q = url.parse(req.url, true).query;
    logger.info('Query parameters parsed...');
    
    if (q.error) {
      logger.error(`Error in query parameters: ${q.error}`);
      res.status(400).send('Authentication failed');
      return;
    }
    // Get access and refresh tokens
    logger.info('Attempting to get tokens with code...');
    
    const { tokens } = await oauth2Client.getToken(q.code);
    logger.debug(`Received tokens of type: ${typeof tokens}`);
    logger.debug(`Received tokens: ${tokens}`)
    logger.debug(`Token model: ${Token}`);
    logger.debug(`Tokens: ${JSON.stringify(tokens)}`);
    logger.debug(`Token model: ${Token.toString()}`);
        
    // Save the refresh token to your database
    if (tokens.refresh_token) {
      const tokenDoc = await Token.findOneAndUpdate({}, { accessToken: tokens.access_token, refreshToken: tokens.refresh_token, isGoogleAuthenticated: true }, { upsert: true, new: true });
      logger.debug(`Tokens saved to database: ${tokenDoc}`);
    }
    oauth2Client.setCredentials(tokens);
    logger.info('Tokens set in OAuth2 client.');
    
    // Update photo data after tokens have been set
    try {
      await updatePhotoData(oauth2Client);
      logger.info('Photo data updated.');
      logger.debug(`Photo data updated with oauth2Client: ${oauth2Client}`);
    } catch (error) {
      logger.error(`Failed to update photo data: ${error}`);
    }
    
    res.redirect('/dashboard');
  } catch (error) {
    logger.error(`ERROR in /oauth2callback: ${error}`);
    res.status(500).send(`Something went wrong! Error: ${error.message}`);
  }
});

// Check if access token is valid
const checkTokenValidity = async (accessToken) => {
  try {
    logger.info('Checking token validity...');
    oauth2Client.setCredentials({ access_token: accessToken });
    const tokenInfo = await oauth2Client.getTokenInfo(accessToken);
    const isValid = Date.now() < tokenInfo.expiry_date;
    logger.debug(`Token is valid: ${isValid}`);
    return isValid;
  } catch (error) {
    if (error.message === 'invalid_token') {
      logger.info('Token is invalid.');
      return false;
    }
    logger.error(`Error while checking token validity: ${error}`);
    throw error;
  }
};

// Check if admin has authenticated with database
router.get('/google-check', async (req, res) => {
  logger.info('Received request for /google-check...');
  try {
    const tokenDoc = await Token.findOne({});
    if (tokenDoc) {
      // Check if the access token is valid
      const isValid = await checkTokenValidity(tokenDoc.accessToken);
      logger.debug(`Token validity: ${isValid}`);
      if (isValid) {
        res.json({ isGoogleAuthenticated: tokenDoc.isGoogleAuthenticated });
      } else {
        res.json({ isGoogleAuthenticated: false });
      }
    } else {
      logger.info('No token document found.');
      res.json({ isGoogleAuthenticated: false });
    }
  } catch (error) {
    logger.error(`Error checking Google authentication: ${error}`);
    res.status(500).send(`Something went wrong! Error: ${error.message}`);
  }});

// Export to server.js
module.exports = router;
