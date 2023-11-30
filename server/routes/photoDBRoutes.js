const router = require('express').Router();
const { // For CRUD operations
  getPhotoTags, 
  getSelectedPhotos,
  getPhotoById,
  getAllPhotos,
} = require('../controllers/photoController');

//**   CRUD routes  **//

// Fetch tags to display from database (photoController) and send to client
router.get('/get-tags', async (req, res) => {
  const displayedTags =  await getPhotoTags();
  res.json(displayedTags);
});

// Fetch selected photos from database (photoController) and send to client
router.post('/get-photos', async (req, res) => {
  const tags = req.body.tags;
  const selectedPhotos = await getSelectedPhotos(tags);
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

// Export to server.js
module.exports = router;
