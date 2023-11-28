const logger = require('../config/winston.js');
const Photo = require('../models/photoModel.js');

// Save photo to database
const savePhoto = async (photoData) => {
  try {
    const photo = new Photo({
      googleId: photoData.id,
      productUrl: photoData.url,
      tagsFromGoogle: photoData.tagsFromGoogle,
      selectedBy: photoData.selected,
    });
    await photo.save();
  } catch (error) {
    logger.error('ERROR saving photo to database:', error);
  }
};

// Get tags to be displayed from database
const getPhotoTags = async () => {
  try {
    const photos = await Photo.find({});
    const tagCounts = {};
    
    photos.forEach(photo => {
      const tags = photo.tagsFromGoogle.split(' ');
      tags.forEach(tag => {
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
    console.error('Error getting photo tags:', error);
    return [];
  }
};

// Get selected photos from database
const getSelectedPhotos = async () => {
  try {
    const selectedPhotos = await Photo.find({});
    return selectedPhotos;
  } catch (error) {
    logger.error('ERROR getting selected photos:', error);
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
    logger.error('ERROR getting all photos:', error);
    return [];
  }
};

// Export to photoDBRoutes.js for CRUD routes
module.exports = {
  savePhoto, //also googlePhotosAPI.js
  getPhotoTags,
  getSelectedPhotos,
  getPhotoById,
  getAllPhotos,
};
