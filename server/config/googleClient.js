require('dotenv').config();
const { google } = require('googleapis');
const logger = require('./winston');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN
logger.info(`Environment variables: REDIRECT_URL = ${REDIRECT_URL}, NODE_ENV = ${NODE_ENV}`);

// Set up your OAuth2 client for the API
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URL,
);
logger.info('OAuth2 client CREATED...');

// Listen for the "tokens" event for refreshing the access token when expired
oauth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    // store the refresh_token in my database!
    logger.info(tokens.refresh_token);
  }
  logger.info(tokens.access_token);
});

oauth2Client.setCredentials({
  refresh_token: GOOGLE_REFRESH_TOKEN
});

// Export to googleAuthRoutes.js
module.exports = oauth2Client;
