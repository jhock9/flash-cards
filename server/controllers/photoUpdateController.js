const logger = require('../config/winston');
const Photo = require('../models/photoModel');
const fetchGooglePhotos = require('../api/googlePhotosAPI'); // fetchGooglePhotos(oauth2Client)
const photoController = require('../controllers/photoController'); // savePhoto(photoData)

// Update photo data in database
const updatePhotoData = async (oauth2Client) => {
  logger.info('Starting database photo data update...');
  try {
    const fetchedPhotos = await fetchGooglePhotos(oauth2Client);
    logger.info(`Fetched ${fetchedPhotos.length} photos from Google Photos API`);
    
    // Fetch existing photos from the database
    const existingPhotos = await Photo.find({});
    
    // Convert existing photos to a Map for easy lookup
    const existingPhotosMap = new Map(existingPhotos.map(photo => [photo.googleId, photo]));
    
    // Prepare photo data to add
    const photosToAdd = [];
    for (const fetchedPhoto of fetchedPhotos) {
      if (!existingPhotosMap.has(fetchedPhoto.googleId)) {
        // If the photo data does not exist in the database, add it
        photosToAdd.push(fetchedPhoto);
      }
    }
    // Add photo data
    for (const photo of photosToAdd) {
      await photoController.savePhoto(photo);
    }
    logger.info(`Added ${photosToAdd.length} photos to the database`);
  } catch (error) {
    logger.error(`Failed to fetch photos from Google Photos API: ${error}`);
  }
};

// Export updatePhotoData(oauth2Client) to googleAuthRoutes.js and server.js
module.exports = updatePhotoData;
