const router = require('express').Router();
const { // For CRUD operations
  getPhotoTags, 
  getAllPhotos,
  getSelectedPhotos, // getSelectedPhotos(tags)
} = require('../controllers/photoController');

//**   CRUD routes  **//

// Fetch tags to display from database (photoController) and send to client
router.get('/get-tags', async (req, res) => {
  const displayedTags =  await getPhotoTags();
  res.json(displayedTags);
});

// Fetch photos from database (photoController) and send to client
router.post('/get-photos', async (req, res) => {
  const tags = req.body.tags;
  let photos;
  if (tags.length === 0) {
    // If tags is an empty array, fetch all photos
    photos = await getAllPhotos();
  } else {
    // Otherwise, fetch photos based on the selected tags
    photos = await getSelectedPhotos(tags);
  }
  res.json(photos);
});

// Export to server.js
module.exports = router;
