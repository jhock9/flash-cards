require('dotenv').config();
const axios = require('axios');
const logger = require('../config/winston');
const photoController = require('../controllers/photoController'); // savePhoto(photoData)
const Token = require('../models/tokenModel');

const albumTitle = process.env.GOOGLE_PHOTOS_ALBUM_ID; // Name of the album to fetch photos from
let cachedAlbumId;

// Get Albums from Google Photos
const getAlbums = async (oauth2Client) => {
  try {
    const response = await axios.get('https://photoslibrary.googleapis.com/v1/albums', {
      headers: {
        'Authorization': `Bearer ${oauth2Client.credentials.access_token}`,
        'Content-Type': 'application/json',
      },
    });
    
    const albums = response.data.albums;
    logger.info('Fetched albums:', albums);
    const targetAlbum = albums.find(album => album.title === albumTitle);
    
    // Get album ID for albumTitle
    if (targetAlbum) {
      logger.info(`Found album ${targetAlbum.title} with ID: ${targetAlbum.id}`);
      return targetAlbum.id;
    } else {
      throw new Error(`Album ${albumTitle} not found.`);
    }
  } catch (error) {
    logger.error('Error fetching albums:', error.message);
    throw error;
  }
};

// Fetch Google Photos and send to photoDBRoutes.js
const fetchGooglePhotos = async (oauth2Client) => {
  await refreshAccessToken(oauth2Client);
  logger.info('fetching photos and photo data...');
  
  try {
    logger.info('Initializing Google Photos client...');
    
    if (!cachedAlbumId) {
      cachedAlbumId = await getAlbums(oauth2Client);
    }
    
    let nextPageToken;
    let response;
    do {
      const params = {
        pageSize: 50,
        pageToken: nextPageToken,
        albumId: cachedAlbumId,
      };
      // Get photos from Google Photos API
      response = await callGooglePhotosAPI(params, oauth2Client);
      logger.info(`Received ${response.data.mediaItems.length} photos from Google Photos API in initial request`);
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

// Check and refresh the access token if it is about to expire
const refreshAccessToken = async (oauth2Client) => {
  if (!oauth2Client.credentials || !oauth2Client.credentials.expiry_date || new Date() >= new Date(oauth2Client.credentials.expiry_date)) {
    try {
      const newTokens = await oauth2Client.refreshAccessToken();
      oauth2Client.setCredentials(newTokens.credentials);
      logger.info('Tokens refreshed and set in OAuth2 client.');
      logger.info(`Access token retrieved at: ${new Date().toISOString()}`);
      logger.info(`Access token expires in: ${newTokens.credentials.expiry_date ? new Date(newTokens.credentials.expiry_date).toISOString() : 'Unknown'}`);
    } catch (error) {
      logger.error('Failed to refresh access token:', error);
      await Token.findOneAndUpdate({}, { isGoogleAuthenticated: false });
      throw error;
    }
  } else {
    logger.info('Access token is still valid. No refresh needed.');
  }
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