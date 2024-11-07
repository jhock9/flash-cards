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
    const updatedPhotos = [];
    const photosToAdd = [];
    
    for (const fetchedPhoto of fetchedPhotos) {
      const existingPhoto = existingPhotosMap.get(fetchedPhoto.googleId);
      if (existingPhoto) {
        // Update photo if any details (tags, baseUrl) have changed
        if (!arraysAreEqual(existingPhoto.tagsFromGoogle, fetchedPhoto.tagsFromGoogle) || existingPhoto.baseUrl !== fetchedPhoto.baseUrl) {
          existingPhoto.tagsFromGoogle = fetchedPhoto.tagsFromGoogle;
          existingPhoto.baseUrl = fetchedPhoto.baseUrl;
          updatedPhotos.push(existingPhoto);
        }
      } else {
        // If the photo data does not exist in the database, add it
        photosToAdd.push(fetchedPhoto);
      }
    }
    
    // Update photos that have changed
    for (const photo of updatedPhotos) {
      await photo.save();
    }
    logger.info(`Updated ${updatedPhotos.length} photos in the database`);
    
    // Add photo data
    for (const photo of photosToAdd) {
      await photoController.savePhoto(photo);
    }
    logger.info(`Added ${photosToAdd.length} photos to the database`);

    // Remove photos that no longer exist in Google Photos
    const fetchedPhotoIds = new Set(fetchedPhotos.map(photo => photo.googleId));
    const photosToRemove = existingPhotos.filter(photo => !fetchedPhotoIds.has(photo.googleId));
    for (const photo of photosToRemove) {
      await photo.remove();
    }
    logger.info(`Removed ${photosToRemove.length} photos from the database`);
  } catch (error) {
    logger.error(`Failed to fetch photos from Google Photos API: ${error}`);
  }
};

// Export updatePhotoData(oauth2Client) to googleAuthRoutes.js and server.js
module.exports = updatePhotoData;
