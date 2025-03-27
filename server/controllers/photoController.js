const logger = require('../config/winston');
const Photo = require('../models/photoModel');
// Save photo to database, checking if it already exists
// keep for future features (e.g. a photo upload UI, manual upload from a dashboard, or admin tagging).
const savePhoto = async (mappedPhotoData) => {
  if (!mappedPhotoData.tagsFromAws || !mappedPhotoData.awsKey) {
    logger.error(`Invalid photo data: ${JSON.stringify(mappedPhotoData)}`);
    return;
  }
  
  try {
    const existingPhoto = await Photo.findOne({ awsKey: mappedPhotoData.awsKey });
    
    if (existingPhoto) {
      let updated = false;
      
      // Update baseUrl if changed
      if (existingPhoto.baseUrl !== mappedPhotoData.baseUrl) {
        existingPhoto.baseUrl = mappedPhotoData.baseUrl;
        updated = true;
      }
      
      // Update tags if changed
      if (!arraysAreEqual(existingPhoto.tagsFromAws, mappedPhotoData.tagsFromAws)) {
        existingPhoto.tagsFromAws = mappedPhotoData.tagsFromAws;
        updated = true;
      }
      
      if (updated) {
        await existingPhoto.save();
        logger.info(`Updated existing photo: ${existingPhoto.awsKey}`);
      } else {
        logger.info(`Photo already up-to-date: ${existingPhoto.awsKey}`);
      }
    } else {
      // Insert new photo if it doesn't exist
      const newPhoto = new Photo(mappedPhotoData);
      await newPhoto.save();
      logger.info(`Inserted new photo: ${mappedPhotoData.awsKey}`);
      return 'inserted';
    }
  } catch (error) {
    logger.error(`Error saving photo to database: ${error.message}, Photo data: ${JSON.stringify(mappedPhotoData)}`);
  }
};

// Helper function to check if two arrays are equal
const arraysAreEqual = (arr1, arr2) => {
  return arr1.length === arr2.length && arr1.every((value) => arr2.includes(value));
};

// Get tags to be displayed from database
const getPhotoTags = async () => {
  try {
    const photos = await Photo.find({});
    const tagCounts = {};
    
    photos.forEach(photo => {
      photo.tagsFromAws.forEach(tag => {
        if (tag in tagCounts) {
          tagCounts[tag]++;
        } else {
          tagCounts[tag] = 1;
        }
      });
    });
    
    const filteredTags = [];
    for (const tag in tagCounts) {
      if (tagCounts[tag] >= 6) {
        filteredTags.push(tag);
      }
    }
    
    filteredTags.sort();
    return filteredTags;
  } catch (error) {
    logger.error(`Error getting photo tags: ${error}`);
    return [];
  }
};

// Get all photos from database
const getAllPhotos = async () => {
  try {
    const photos = await Photo.find({});
    return photos.map(photo => ({ photoData: photo }));
  } catch (error) {
    logger.error(`Error getting all photos: ${error}`);
    return [];
  }
};

// Get selected photos and their selected tag from database
const getSelectedPhotos = async (tags) => {
  try {
    const selectedPhotos = [];
    for (const tag of tags) {
      const photos = await Photo.find({ tagsFromAws: tag });
      for (const photo of photos) {
        selectedPhotos.push({ photoData: photo, tag });
      }
    }
    return selectedPhotos;
  } catch (error) {
    logger.error(`ERROR getting selected photos: ${error}`);
    return [];
  }
};

// Export to photoDBRoutes.js for CRUD routes, except savePhoto
module.exports = {
  savePhoto, // not exported anywhere currently
  getPhotoTags,
  getSelectedPhotos, // getSelectedPhotos(tags)
  getAllPhotos,
};
