const router = require('express').Router();
const { // For CRUD operations
  getPhotoTags, 
  getAllPhotos,
  getSelectedPhotos, // getSelectedPhotos(tags)
} = require('../controllers/photoController');
const updatePhotoData = require('../services/photoSyncService');

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

// Sync photos from AWS S3 to MongoDB
router.post('/sync', async (req, res) => {
  try {
    await updatePhotoData();
    res.status(200).json({ message: 'Photos synced successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Photo sync failed.' });
  }
});

// Export to server.js
module.exports = router;
