const axios = require('axios');
const logger = require('../config/winston');
const photoController = require('../controllers/photoController'); // savePhoto(photoData)
const Token = require('../models/tokenModel');

// Fetch Google Photos and send to photoDBRoutes.js
const fetchGooglePhotos = async (oauth2Client) => {
  logger.info('fetching photos and photo data...');
  
  try {
    logger.info('Initializing Google Photos client...');
    
    let nextPageToken;
    let response;
    do {
      const params = {
        pageSize: 50,
        pageToken: nextPageToken,
      };
      try {
        // Get photos from Google Photos API
        response = await callGooglePhotosAPI(params, oauth2Client);
        logger.info(`Received ${response.data.mediaItems.length} photos from Google Photos API in initial request`);
      } catch (error) {
        logger.error(`Error getting photos: ${error.message}`);
        if (error.response && error.response.status === 401) { // If the token is expired
          logger.error(`Error response from Google Photos API: ${error.response.data}`);
          try {
            // Refresh the token
            await refreshAccessToken(oauth2Client);
            // Retry the request with the new token
            response = await callGooglePhotosAPI(params, oauth2Client);
            logger.info(`Received ${response.data.mediaItems.length} photos from Google Photos API after refreshing token`);
          } catch (refreshError) {
            logger.error(`Failed to refresh access token: ${refreshError}`);
            
            await Token.findOneAndUpdate({}, { isGoogleAuthenticated: false });
            throw refreshError;
          }
        } else {
          logger.error(`Error getting photos: ${error.message}, Error stack: ${error.stack}`);
          throw error;
        }
      }    
      logger.info('Received media items...');
      
      // Save photo data to database
      const photosToProcess = response.data.mediaItems.filter(photoData => photoData.description);
      await Promise.all(photosToProcess.map(processPhotoData));
      nextPageToken = response.data.nextPageToken;
    } while (nextPageToken);
    
    return response ? response.data.mediaItems : [];
  } catch (error) {
    logger.error(`ERROR getting photos: ${error.message}`);
    logger.error(`Stack trace: ${error.stack}`);
    throw new Error('Failed to fetch Google Photos');
  }
};

const callGooglePhotosAPI = async (params, oauth2Client) => {
  return await axios.post('https://photoslibrary.googleapis.com/v1/mediaItems:search', params, {
    headers: {
      'Authorization': `Bearer ${oauth2Client.credentials.access_token}`,
      'Content-Type': 'application/json',
    },
  });
};

const refreshAccessToken = async (oauth2Client) => {
  const newTokens = await oauth2Client.refreshAccessToken();
  oauth2Client.setCredentials(newTokens.credentials);
  logger.info('Tokens refreshed and set in OAuth2 client.');
};

const processPhotoData = async (photoData) => {
  if (!photoData.id) {
    logger.error(`Photo missing id: ${JSON.stringify(photoData)}`);
    return;
  }
  const mappedPhotoData = {
    googleId: photoData.id,
    baseUrl: `${photoData.baseUrl}=w2048-h1024`,
    tagsFromGoogle: photoData.description.split(' ').filter(Boolean),
  };
  try {
    await photoController.savePhoto(mappedPhotoData);
  } catch (error) {
    logger.error(`Error saving photo to database: ${error.message}, Photo data: ${JSON.stringify(mappedPhotoData)}`);
    throw error;
  }
};

// Export fetchGooglePhotos(oauth2Client) to photoUpdateController.js
module.exports = fetchGooglePhotos;