const router = require('express').Router();
const { // For CRUD operations
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

// Export to server.js and googleAuthRoutes.js
module.exports = router;
