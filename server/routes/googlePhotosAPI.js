const axios = require('axios');
const logger = require('../config/winston');
const photoController = require('../controllers/photoController');
const { JWT } = require('google-auth-library');
const key = require('../../google-keyfile.json');

let tokens;

logger.info('Google Photos client initialized...');
const jwtClient = new JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/photoslibrary.readonly'],
  null
);

jwtClient.authorize((err, tokenResponse) => {
  logger.info('Google Photos client authorized...');
  if (err) {
    logger.error('Error during authorization:', err);
    return;
  }
  tokens = tokenResponse;
});

// Fetch photos from Google Photos API and send to photoDBRoutes.js
const fetchGooglePhotos = async () => {
  logger.info('fetching photos and photo data...');
  
  try {
    // Refresh the access token
    jwtClient.authorize((err, tokenResponse) => {
      if (err) {
        logger.error('ERROR refreshing access token:', err);
        return;
      }
      tokens = tokenResponse;
    });
    
    try {
      let nextPageToken
      let allPhotos = [];
      
      do {
        const params = {
          pageSize: 100,
          pageToken: nextPageToken,
        };
        
        logger.info('Google Photos client options set...');
        const options = {
          headers: {
            'Authorization': `Bearer ${tokens.access_token}`
          }
        };
        const response = await axios.post('https://photoslibrary.googleapis.com/v1/mediaItems:search', params, options);
        logger.info('Google Photos API response received...');
        
        allPhotos = allPhotos.concat(response.data.mediaItems);
        nextPageToken = response.data.nextPageToken;
        
        // Save photo data to database
        for (const photoData of response.data.mediaItems) {
          await photoController.savePhoto(photoData);
        }
      } while (nextPageToken);
      
      return allPhotos;
    } catch (error) {
      logger.error('ERROR getting photos:', error)
      throw error;
    }
  } catch (error) {
    logger.error('ERROR refreshing access token:', error);
    throw error;
  }
};

// Fetch photos from Google Photos API and send to photoDBRoutes.js
module.exports = fetchGooglePhotos;
