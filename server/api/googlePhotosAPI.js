const axios = require('axios');
const logger = require('../config/winston');
const photoController = require('../controllers/photoController'); // savePhoto(photoData)

// Fetch Google Photos and send to photoDBRoutes.js
const fetchGooglePhotos = async (oauth2Client) => {
  logger.info('fetching photos and photo data...');
  
  try {
    logger.info('Initializing Google Photos client...');
    
    let nextPageToken;
    let response;
    do {
      const params = {
        pageSize: 100,
        pageToken: nextPageToken,
      };
      try {
        response = await axios.post('https://photoslibrary.googleapis.com/v1/mediaItems:search', params, {
          headers: {
            'Authorization': `Bearer ${oauth2Client.credentials.access_token}`,
            'Content-Type': 'application/json',
          },
        });
        logger.info(`Received ${response.data.mediaItems.length} photos from Google Photos API in initial request`);
      } catch (error) {
        logger.error(`Error getting photos: ${error.message}`);
        if (error.response && error.response.status === 401) { // If the token is expired
          logger.error(`Error response from Google Photos API: ${error.response.data}`);
          try {
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
      for (const photoData of response.data.mediaItems) {
        if (photoData.description) { // Only process photos with a description
          if (!photoData.id) {
            logger.error(`Photo missing id: ${JSON.stringify(photoData)}`);
            continue; // Skip this photo and move to the next one
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
            throw error; // This will stop the execution of fetchGooglePhotos
          }
        }
      }
    } while (nextPageToken);
    
    return response ? response.data.mediaItems : [];
  } catch (error) {
    logger.error(`ERROR getting photos: ${error.message}`);
    logger.error(`Stack trace: ${error.stack}`);
    throw new Error('Failed to fetch Google Photos');
  }
};

// Export fetchGooglePhotos(oauth2Client) to photoUpdateController.js
module.exports = fetchGooglePhotos;