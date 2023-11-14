const router = require('express').Router();
const cron = require('node-cron');
const logger = require('../config/winston');
const Photo = require('../models/photoModel');
const photoController = require('../controllers/photoController');
const { fetchGooglePhotos } = require('./routes/googleAPI');

// Fetch filtered tags from database (photoController) and send to client
router.get('/get-tags', async (req, res) => {
  const filteredTags =  await photoController.getPhotoTags();
  res.json(filteredTags);
});

// Fetch selected photos from database (photoController) and send to client
router.get('/get-photos', async (req, res) => {
  const selectedPhotos = await Photo.find();
  res.json(selectedPhotos);
});

// Update photo data in database 
const updatePhotoData = async () => {
  logger.info('Updating database photo data using cron job...');
  const fetchedPhotos = await fetchGooglePhotos();
  
  // Fetch existing photos from the database
  const existingPhotos = await Photo.find({});
  
  // Convert existing photos to a Map for easy lookup
  const existingPhotosMap = new Map(existingPhotos.map(photo => [photo.id, photo]));
  
  // Prepare photo data to add
  const photosToAdd = [];
  for (const fetchedPhoto of fetchedPhotos) {
    if (existingPhotosMap.has(fetchedPhoto.id)) {
      // If the photo data does not exist in the database, add it
      photosToAdd.push(fetchedPhoto);
    }
  }
  
  // Add photo data
  for (const photo of photosToAdd) {
    await Photo.create(photo);
  }
};

// at 2:00 AM every day
cron.schedule('0 2 * * *', updatePhotoData);