const Photo = require('../models/photoModel.js');

const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find({});
    res.send(photos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

module.exports = {
  getAllPhotos,
  getPhotoById,
  updatePhotoById,
};