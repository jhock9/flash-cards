const router = require('express').Router();
const cron = require('node-cron');
const logger = require('../config/winston');
const Photo = require('../models/photoModel');
const fetchGooglePhotos = require('./googlePhotosAPI');

// For CRUD operations
const {
  savePhoto,
  getPhotoTags, 
  getSelectedPhotos,
  getPhotoById,
  getAllPhotos,
} = require('../controllers/photoController');

//**   CRUD routes  **//

// Save photo to database (photoController)
router.post('/save-photos', async (req, res) => {
  try {
    await savePhoto(req.body);
    res.status(201).json(req.body);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Fetch tags to display from database (photoController) and send to client
router.get('/get-tags', async (req, res) => {
  const displayedTags =  await getPhotoTags();
  res.json(displayedTags);
});

// Fetch selected photos from database (photoController) and send to client
router.get('/get-photos', async (req, res) => {
  const selectedPhotos = await getSelectedPhotos();
  res.json(selectedPhotos);
});

// Fetch photo by id from database (photoController) and send to client
router.get('/get-photo/:id', async (req, res) => {
  const photo = await getPhotoById(req.params.id);
  res.json(photo);
});

// Fetch all photos from database (photoController) and send to client
router.get('/get-all-photos', async (req, res) => {
  const allPhotos = await getAllPhotos();
  res.json(allPhotos);
});


//** Google Photos API **//

// Update photo data in database
const updatePhotoData = async () => {
  logger.info('Updating database photo data using cron job...');
  try {
    const fetchedPhotos = await fetchGooglePhotos();
    
    // Limit the logging
    logger.info(fetchedPhotos.length); // logs the number of photos fetched
    logger.info(fetchedPhotos.slice(0, 5).map(photo => ({ id: photo.id, url: photo.productUrl }))); // logs the first 5 photos fetched with their id and url
    
    // Write the data to a file
    fs.writeFileSync('data.json', JSON.stringify(fetchedPhotos[0], null, 2));
    
    // Fetch existing photos from the database
    const existingPhotos = await Photo.find({});
    
    // Convert existing photos to a Map for easy lookup
    const existingPhotosMap = new Map(existingPhotos.map(photo => [photo.id, photo]));
    
    // Prepare photo data to add
    const photosToAdd = [];
    for (const fetchedPhoto of fetchedPhotos) {
      if (!existingPhotosMap.has(fetchedPhoto.id)) {
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

// Update photo data in database at 2:00 AM every day
cron.schedule('0 2 * * *', updatePhotoData);

// Export to server.js and googleAuthRoutes.js, respectively
module.exports = {
  router,
  updatePhotoData
};
