const logger = require('../config/winston.js');
const Photo = require('../models/photoModel.js');

// Save photo to database
const savePhoto = async (photoData) => {
  try {
    const photo = new Photo({
      id: photoData.id,
      url: photoData.productUrl,
      tagsFromGoogle: photoData.description,
    });
    await photo.save();
  } catch (error) {
    logger.error('ERROR saving photo to database:', error);
  }
};

// Get all photos from database
const getAllPhotos = async (req, res) => {Post
  try {
    const photos = await Photo.find({});
    res.send(photos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get photo tags from database, filter, sort, and send to photoRoutes.js
const getPhotoTags = async (req, res) => {
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
    res.json(filteredTags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get selected photos from database and send to photoRoutes.js
const getSelectedPhotos = async (req, res) => {
  try {
    const selectedPhotos = await Photo.find({});
    res.json(selectedPhotos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get photo by id from database
const getPhotoById = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (photo) {
      res.send(photo);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update photo by id in database
const updatePhotoById = async (req, res) => {
  try {
    const photo = await Photo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!photo) {
      return res.status(404).send();
    }
    res.send(photo);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Export to server.js, googlePhotosAPI.js, and photoDBRoutes.js
module.exports = {
  savePhoto, // Export to server.js and googlePhotosAPI.js
  getAllPhotos, // Export to server.js
  getPhotoTags, // Export to server.js and photoDBRoutes.js
  getSelectedPhotos, // Export to server.js
  getPhotoById, // Export to server.js
  updatePhotoById // Export to server.js
};
