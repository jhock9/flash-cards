require('dotenv').config();
const { google } = require('googleapis');
const logger = require('./winston');
const Token = require('../models/tokenModel');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
logger.info(`Environment variables: REDIRECT_URL = ${REDIRECT_URL}`);

// Set up your OAuth2 client for the API
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URL,
);
logger.info('OAuth2 client CREATED...');

// Fetch the refresh token from the database
(async () => {
  try {
    const tokenDoc = await Token.findOne({});
    if (tokenDoc) {
      oauth2Client.setCredentials({ refresh_token: tokenDoc.refreshToken });
    }
  } catch (err) {
    logger.error('Failed to fetch refresh token from database:', err);
  }
})();

// Listen for the "tokens" event for refreshing the access token when expired
oauth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    // Update the refresh token in the database
    Token.findOneAndUpdate({}, { refreshToken: tokens.refresh_token }, { upsert: true }, (err) => {
      if (err) {
        logger.error('Failed to update refresh token in database:', err);
      }
    });
  }
});

// Initialize the OAuth2 client with the refresh token
const initializeOauthClient = async () => {
  try {
    const tokenDoc = await Token.findOne({});
    if (tokenDoc) {
      oauth2Client.setCredentials({ refresh_token: tokenDoc.refreshToken });
    }
  } catch (err) {
    logger.error('Failed to fetch refresh token from database:', err);
  }
  return oauth2Client;
};

// Export to server.js and googleAuthRoutes.js, respectively
module.exports = {
  GOOGLE_CLIENT_ID,
  initializeOauthClient,
  oauth2Client // Export to googleAuthRoutes.js
};
