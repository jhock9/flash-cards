import fs from 'fs';

const logger = require('../config/winston');
const Photo = require('../models/photoModel');
const fetchGooglePhotos = require('../api/googlePhotosAPI'); // fetchGooglePhotos(oauth2Client)

// Update photo data in database
const updatePhotoData = async (oauth2Client) => {
  logger.info('Updating database photo data using cron job...');
  logger.debug('updatePhotoData called...');
  try {
    const fetchedPhotos = await fetchGooglePhotos(oauth2Client);
    logger.debug(`Fetched photos from Google Photos API: ${fetchedPhotos.length}`);

    // Write the data to a file
    fs.writeFileSync('data.json', JSON.stringify(fetchedPhotos[0], null, 2));
    logger.debug('Wrote fetched photos to data.json');

    // Fetch existing photos from the database
    const existingPhotos = await Photo.find({});
    logger.debug(`Fetched existing photos from database: ${existingPhotos.length}`);

    // Convert existing photos to a Map for easy lookup
    const existingPhotosMap = new Map(existingPhotos.map(photo => [photo.googleId, photo]));
    logger.debug(`Converted existing photos to a map: ${existingPhotosMap.size}`);

    // Prepare photo data to add
    const photosToAdd = [];
    for (const fetchedPhoto of fetchedPhotos) {
      if (!existingPhotosMap.has(fetchedPhoto.googleId)) {
        // If the photo data does not exist in the database, add it
        photosToAdd.push(fetchedPhoto);
      }
    }
    logger.debug(`Prepared photos to add: ${photosToAdd.length}`);

    // Add photo data
    for (const photo of photosToAdd) {
      await Photo.create(photo);
    }
    logger.debug(`Added photos to database: ${photosToAdd.length}`);
  } catch (error) {
    logger.error(`Failed to fetch photos from Google Photos API: ${error}`);
  }
};

// Export updatePhotoData(oauth2Client) to googleAuthRoutes.js and server.js
module.exports = updatePhotoData;
