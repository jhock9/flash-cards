const router = require('express').Router();
const url = require('url');
const oauth2Client = require('../config/googleClient');
const Token = require('../models/tokenModel');
const axios = require('axios');

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

//* HANDLING THE OAUTH 2.0 SERVER RESPONSE
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
    
    req.session.isAuthenticated = true;
    
    res.redirect('/flashcards');
  } catch (error) {
    logger.error('ERROR in /oauth2callback:', error);
    res.status(500).send(`Something went wrong! Error: ${error.message}`);
  }
});

//* PHOTOS LIBRARY API
app.get('/getPhotos', async (req, res) => {
  logger.info('Received request for /getPhotos...');
  
  try {
    logger.info('Initializing Google Photos client...');
    
    const params = {
      pageSize: 100,
    };
    let response;
    try {
      response = await axios.post('https://photoslibrary.googleapis.com/v1/mediaItems:search', params, {
        headers: {
          'Authorization': `Bearer ${oauth2Client.credentials.access_token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 401) { // If the token is expired
        // Refresh the token
        const newTokens = await oauth2Client.refreshAccessToken();
        oauth2Client.setCredentials(newTokens.credentials);
        logger.info('Tokens refreshed and set in OAuth2 client.');
        
        // Retry the request with the new token
        response = await axios.post('https://photoslibrary.googleapis.com/v1/mediaItems:search', params, {
          headers: {
            'Authorization': `Bearer ${oauth2Client.credentials.access_token}`,
            'Content-Type': 'application/json',
          },
        });
      } else {
        throw error;
      }
    }
    
    logger.info('Received media items...');
    
    res.json(response.data.mediaItems);
  } catch (error) {
    logger.error('Error in /getPhotos route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
