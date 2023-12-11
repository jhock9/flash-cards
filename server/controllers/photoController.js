const logger = require('../config/winston.js');
const Photo = require('../models/photoModel.js');

// Save photo to database
const savePhoto = async (mappedPhotoData, logCounter) => {
  if (mappedPhotoData.tagsFromGoogle) {
    const existingPhoto = await Photo.findOne({ googleId: mappedPhotoData.googleId });
    if (existingPhoto) {
      // Photo already exists in the database, update it
      if (existingPhoto.baseUrl !== mappedPhotoData.baseUrl || !arraysAreEqual(existingPhoto.tagsFromGoogle, mappedPhotoData.tagsFromGoogle)) {
        existingPhoto.baseUrl = mappedPhotoData.baseUrl;
        existingPhoto.tagsFromGoogle = mappedPhotoData.tagsFromGoogle;
        await existingPhoto.save();
        if (logCounter < 2) {
          logger.debug(`Updated existing photo: ${mappedPhotoData.googleId}`);
        }
      }
    } else {
      // Photo has a unique googleId, insert it into the database
      const photo = new Photo(mappedPhotoData);
      await photo.save();
      if (logCounter < 2) { 
        logger.debug(`Inserted new photo: ${mappedPhotoData.googleId}`);
      }
    }
  }
};

// Helper function to check if two arrays are equal
const arraysAreEqual = (arr1, arr2) => {
  return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
};

// Get tags to be displayed from database
const getPhotoTags = async () => {
  try {
    const photos = await Photo.find({});
    const tagCounts = {};
    
    photos.forEach(photo => {
      photo.tagsFromGoogle.forEach(tag => {
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

// Get selected photos from database
const getSelectedPhotos = async (tags) => {
  try {
    const selectedPhotos = await Photo.find({ tagsFromGoogle: { $in: tags } });
    return selectedPhotos;
  } catch (error) {
    logger.error(`ERROR getting selected photos: ${error}`);
    return [];
  }
};

// Get photo by id from database
const getPhotoById = async (id) => {
  try {
    const photo = await Photo.findById(id);
    return photo;
  } catch (error) {
    logger.error(`ERROR getting photo by id ${id}:`, error);
    return null;
  }
}

// Get all photos from database
const getAllPhotos = async () => {
  try {
    const photos = await Photo.find({});
    return photos;
  } catch (error) {
    logger.error(`ERROR getting all photos: ${error}`);
    return [];
  }
};

// Export to photoDBRoutes.js for CRUD routes, except savePhoto
module.exports = {
  savePhoto, // Export savePhoto(mappedPhotoData) to googlePhotosAPI.js and photoUpdateController.js
  getPhotoTags,
  getSelectedPhotos, // getSelectedPhotos(tags)
  getPhotoById, // getPhotoById(id)
  getAllPhotos,
};
