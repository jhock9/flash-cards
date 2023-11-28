const router = require('express').Router();
const url = require('url');
const logger = require('../config/winston');
const Token = require('../models/tokenModel');
const { oauth2Client } = require('../config/googleClient');
const { updatePhotoData } = require('./photoDBRoutes');

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
  logger.info('Received request for /authorize...');
  res.redirect(authUrl);
  logger.info("Redirected to Google's OAuth 2.0 server...");
  // This response will be sent back to the specified redirect URL 
  // with endpoint /oauth2callback
});

// Exchange authorization code for access and refresh tokens
router.get('/oauth2callback', async (req, res) => {
  logger.info(`Received OAuth2 callback with URL: ${req.url}`);
  try {
    logger.info('Received request for /oauth2callback...');
    const q = url.parse(req.url, true).query;
    logger.info('Query parameters parsed...');
    
    if (q.error) {
      logger.error('Error in query parameters:', q.error);
      res.status(400).send('Authentication failed');
      return;
    }
    // Get access and refresh tokens
    logger.info('Attempting to get tokens with code...');
    
    const { tokens } = await oauth2Client.getToken(q.code);
    logger.info(`Received tokens of type: ${typeof tokens}`);
    
    // Save the refresh token to your database and environment variables
    if (tokens.refresh_token) {
      process.env.GOOGLE_REFRESH_TOKEN = tokens.refresh_token;
      const tokenDoc = await Token.findOneAndUpdate({}, { accessToken: tokens.access_token, refreshToken: tokens.refresh_token }, { upsert: true, new: true });
      logger.info('Tokens saved to database:', tokenDoc);
      }
    oauth2Client.setCredentials(tokens);
    logger.info('Tokens set in OAuth2 client.');
    
    // Update photo data after tokens have been set
    try {
      await updatePhotoData();
      logger.info('Photo data updated.');
    } catch (error) {
      logger.error('Failed to update photo data:', error);
    }
    
    req.session.isAuthenticated = true;
    
    res.redirect('/flashcards');
  } catch (error) {
    logger.error('ERROR in /oauth2callback:', error);
    res.status(500).send(`Something went wrong! Error: ${error.message}`);
  }
});

// Check if user is authenticated
router.get('/is-authenticated', (req, res) => {
  logger.info('Received request for /is-authenticated...');
  if (req.session && req.session.isAuthenticated) {
    res.status(200).json({ isAuthenticated: true });
  } else {
    res.status(200).json({ isAuthenticated: false });
  }
});

// Export to server.js and googlePhotosAPI.js, respectively
module.exports = { 
  router, 
  oauth2Client
};