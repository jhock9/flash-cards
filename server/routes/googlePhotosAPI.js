const axios = require('axios');
const logger = require('../config/winston');
const photoController = require('../controllers/photoController'); // savePhoto()

// Fetch Google Photos and send to photoDBRoutes.js
const fetchGooglePhotos = async (oauth2Client) => {
  logger.info('fetching photos and photo data...');
  
  try {
    logger.info('Initializing Google Photos client...');
    
    let nextPageToken
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
      
      nextPageToken = response.data.nextPageToken;
      
      // Save photo data to database
      for (const photoData of response.data.mediaItems) {
        // Skip the photo if it doesn't have a description
        if (!photoData.description) {
          continue;
        }
        
        const mappedPhotoData = {
          googleId: photoData.id,
          productUrl: photoData.productUrl,
          tagsFromGoogle: photoData.description,
        };  
        
        try {
          await photoController.savePhoto(mappedPhotoData);
        } catch (error) {
          throw error; // This will stop the execution of fetchGooglePhotos
        }
      }
    } while (nextPageToken);
    
    return response.data.mediaItems;
  } catch (error) {
    logger.error('ERROR getting photos:', error)
    throw new Error('Failed to fetch Google Photos');
  }
};

// Export fetchGooglePhotos(oauth2Client) to photoUpdateController.js
module.exports = fetchGooglePhotos;