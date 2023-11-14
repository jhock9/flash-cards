const router = require('express').Router();
const url = require('url');
const axios = require('axios');
const cron = require('node-cron');

const oauth2Client = require('../config/googleClient');
const Token = require('../models/tokenModel');
const Photo = require('../models/photoModel');
const logger = require('../config/winston');

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
    
    req.session.isAuthenticated = true;
    
    res.redirect('/flashcards');
  } catch (error) {
    logger.error('ERROR in /oauth2callback:', error);
    res.status(500).send(`Something went wrong! Error: ${error.message}`);
  }
});

// Fetch photos from database and send them to client
router.get('/getPhotos', async (req, res) => {
  const photos = await Photo.find();
  res.json(photos);
});

// Fetch photo Google Photos 
const fetchGooglePhotos = async () => {
  logger.info('fetching photos and photo data...');
  
  try {
    logger.info('Initializing Google Photos client...');
    
    let nextPageToken
    let allPhotos = [];
    do {
      const params = {
        pageSize: 100,
        pageToken: nextPageToken,
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
      
      allPhotos = allPhotos.concat(response.data.mediaItems);
      nextPageToken = response.data.nextPageToken;
    } while (nextPageToken);
    
    res.json(response.data.mediaItems);
  } catch (error) {
    logger.error('Error in /getPhotos route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update photo data in database 
const updatePhotoData = async () => {
  logger.info('Updating database photo data using cron job...');
  const fetchedPhotos = await fetchGooglePhotos();
  
  // Fetch existing photos from the database
  const existingPhotos = await Photo.find({});
  
  // Convert existing photos to a Map for easy lookup
  const existingPhotosMap = new Map(existingPhotos.map(photo => [photo.id, photo]));
  
  // Prepare photo data to add
  const photosToAdd = [];
  for (const fetchedPhoto of fetchedPhotos) {
    if (existingPhotosMap.has(fetchedPhoto.id)) {
      // If the photo data does not exist in the database, add it
      photosToAdd.push(fetchedPhoto);
    }
  }
  
  // Add photo data
  for (const photo of photosToAdd) {
    await Photo.create(photo);
  }
};

// Fetch photos at 2:00 AM every day
cron.schedule('0 2 * * *', updatePhotoData);

module.exports = { router, updatePhotoData };
