const axios = require('axios');
const logger = require('../config/winston');
const photoController = require('../controllers/photoController');
const { oauth2Client } = require('./routes/googleRoutes');
const newOauth2Client = oauth2Client;

// Fetch photo Google Photos and send to photoDBRoutes.js
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
            'Authorization': `Bearer ${newOauth2Client.credentials.access_token}`,
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        if (error.response && error.response.status === 401) { // If the token is expired
          // Refresh the token
          const newTokens = await newOauth2Client.refreshAccessToken();
          newOauth2Client.setCredentials(newTokens.credentials);
          logger.info('Tokens refreshed and set in OAuth2 client.');
          
          // Retry the request with the new token
          response = await axios.post('https://photoslibrary.googleapis.com/v1/mediaItems:search', params, {
            headers: {
              'Authorization': `Bearer ${newOauth2Client.credentials.access_token}`,
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
      
      // Save photo data to database
      for (const photoData of response.data.mediaItems) {
        await photoController.savePhoto(photoData);
      }
    } while (nextPageToken);
    
    return response.data.mediaItems;
  } catch (error) {
    logger.error('ERROR getting photos:', error)
    throw new Error('Failed to fetch Google Photos');
  }
};

// Export to photoDBRoutes.js
module.exports = { fetchGooglePhotos };