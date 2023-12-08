const axios = require('axios');
const logger = require('../config/winston');
const photoController = require('../controllers/photoController'); // savePhoto(photoData)

// Fetch Google Photos and send to photoDBRoutes.js
const fetchGooglePhotos = async (oauth2Client) => {
  logger.info('fetching photos and photo data...');
  logger.debug('fetch photos from API, oauth2Client:', oauth2Client);
  
  try {
    logger.info('Initializing Google Photos client...');
    
    let nextPageToken;
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
        logger.debug(`Received ${response.data.mediaItems.length} photos from Google Photos API in initial request`);
      } catch (error) {
        if (error.response && error.response.status === 401) { // If the token is expired
          try {
            // Refresh the token
            const newTokens = await oauth2Client.refreshAccessToken();
            oauth2Client.setCredentials(newTokens.credentials);
            logger.info('Tokens refreshed and set in OAuth2 client.');
            
            logger.debug('New tokens:', newTokens);
            logger.debug('Token model:', Token);
            logger.debug('oauth2Client:', oauth2Client);
            
            // Retry the request with the new token
            response = await axios.post('https://photoslibrary.googleapis.com/v1/mediaItems:search', params, {
              headers: {
                'Authorization': `Bearer ${oauth2Client.credentials.access_token}`,
                'Content-Type': 'application/json',
              },
            });
            logger.debug(`Received ${response.data.mediaItems.length} photos from Google Photos API after refreshing token`);          } catch (refreshError) {
            logger.error('Failed to refresh access token:', refreshError);
            
            await Token.findOneAndUpdate({}, { isGoogleAuthenticated: false });
            throw refreshError;
          }
        } else {
          throw error;
        }
      }
      
      logger.info('Received media items...');
      nextPageToken = response.data.nextPageToken;
      logger.debug('nextPageToken:', nextPageToken);

      // Save photo data to database
      for (const photoData of response.data.mediaItems) {
        logger.debug('photoData:', photoData);
        if (photoData.description) { // Only process photos with a description
          const mappedPhotoData = {
            googleId: photoData.id,
            baseUrl: photoData.baseUrl,
            tagsFromGoogle: photoData.description.split(' ').filter(Boolean),
          };  
          try {
            await photoController.savePhoto(mappedPhotoData);
            logger.debug(`Saved photo data to database with Google ID: ${mappedPhotoData.googleId}`);
          } catch (error) {
            throw error; // This will stop the execution of fetchGooglePhotos
          }
        }
      }
    } while (nextPageToken);
    
    return response.data.mediaItems;
  } catch (error) {
    logger.error('ERROR getting photos:', error.message);
    logger.error('Stack trace:', error.stack);
    throw new Error('Failed to fetch Google Photos');
  }
};

// Export fetchGooglePhotos(oauth2Client) to photoUpdateController.js
module.exports = fetchGooglePhotos;