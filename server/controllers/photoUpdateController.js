const logger = require('../config/winston');
const Photo = require('../models/photoModel');
const fetchGooglePhotos = require('../api/googlePhotosAPI'); // fetchGooglePhotos(oauth2Client)

// Update photo data in database
const updatePhotoData = async (oauth2Client) => {
  logger.info('Updating database photo data using cron job...');
  try {
    const fetchedPhotos = await fetchGooglePhotos(oauth2Client);
    
    // Write the data to a file
    fs.writeFileSync('data.json', JSON.stringify(fetchedPhotos[0], null, 2));
    
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
      await Photo.create(photo);
    }
  } catch (error) {
    logger.error('Failed to update photo data:', error);
  }
};

// Export updatePhotoData(oauth2Client) to googleAuthRoutes.js and server.js
module.exports = updatePhotoData;