const logger = require('../config/winston.js');
const Photo = require('../models/photoModel.js');

// Save photo to database
const savePhoto = async (mappedPhotoData) => {
  if (mappedPhotoData.tagsFromGoogle) {
    const existingPhoto = await Photo.findOne({ googleId: mappedPhotoData.googleId });
    if (existingPhoto) {
      // baseURL expires every 60 minutes, update it every time
      existingPhoto.baseUrl = mappedPhotoData.baseUrl;
      
      // Check if any tags have been added or removed
      if (!arraysAreEqual(existingPhoto.tagsFromGoogle, mappedPhotoData.tagsFromGoogle)) {
        existingPhoto.tagsFromGoogle = mappedPhotoData.tagsFromGoogle;
      }
      
      await existingPhoto.save();
    } else {
      // If the photo does not exist, insert it as new
      const photo = new Photo(mappedPhotoData);
      await photo.save();
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

// Get selected photos and their selected tag from database
const getSelectedPhotos = async (tags) => {
  try {
    const selectedPhotos = [];
    for (const tag of tags) {
      const photos = await Photo.find({ tagsFromGoogle: tag });
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
  savePhoto, // Export savePhoto(mappedPhotoData) to googlePhotosAPI.js and photoUpdateController.js
  getPhotoTags,
  getSelectedPhotos, // getSelectedPhotos(tags)
};
