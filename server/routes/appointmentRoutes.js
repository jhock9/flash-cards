const router = require('express').Router();
const logger = require('../config/winston');
const Appointment = require('../models/appointmentModel');

router.get('/:clientId', async (req, res) => {
  logger.info('Received request for /:clientId...');
  try {
    const appointment = await Appointment.findOne({ client: req.params.clientId });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ appointment });
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/create-appt', async (req, res) => {
  logger.info('Received request for /create-appt...');
  try {
    const newAppointment = new Appointment({ client: req.body.clientId });
    await newAppointment.save();
    res.status(201).json({ appointment: newAppointment });
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route handler to get saved tags
router.get('/:appointmentId/load-tags', async (req, res) => {
  // Find the appointment and return the savedTags array
  logger.info('Received request for /:appointmentId/load-tags...');
  try {
    const appointment = await Appointment.findById(req.params.appointmentId); 
    res.json({ savedTags: appointment.savedTags });
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route handler to save tags
router.post('/:appointmentId/save-tags', async (req, res) => {
  // Find the appointment and update the savedTags array
  logger.info('Received request for /:appointmentId/save-tags...');
  
  try {
    const { savedTag } = req.body;
    
    if (!Array.isArray(savedTag)) {
      return res.status(400).json({ message: 'Invalid request: savedTag must be an array' });
    }
    
    const appointment = await Appointment.findById(req.params.appointmentId);
    
    savedTag.forEach(newTag => {
      const existingTagIndex = appointment.savedTags.findIndex(tag => tag.name === newTag.name);
      
      if (existingTagIndex !== -1) {
        // If the tag exists, update it
        appointment.savedTags[existingTagIndex] = newTag;
      } else {
        // If the tag doesn't exist, add it
        appointment.savedTags.push(newTag);
      }
    });
    
    await appointment.save();
    
    res.json({ message: 'Tags saved successfully' });
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route handler to remove tags
router.post('/:appointmentId/remove-tags', async (req, res) => {
  // Find the appointment and removed savedTag from the savedTags array
  logger.info('Received request for /:appointmentId/remove-tags...');
  
  const { savedTag } = req.body;
  try {
    const appointment = await Appointment.findById(req.params.appointmentId); 
    // remove savedTags from array
    appointment.savedTags = appointment.savedTags.filter(tag => !savedTag.some(saved => saved.name === tag.name));
    await appointment.save();
    
    res.json({ message: 'Tags removed successfully' });
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route handler to save a photo
router.post('/:appointmentId/save-photo', async (req, res) => {
  // Find the appointment and add the photo to the savedPhotos array
  logger.info('Received request for /:appointmentId/save-photo...');

  const { photoId, selectedTag } = req.body;
  try {
    const appointment = await Appointment.findById(req.params.appointmentId); 
    
    if (!appointment.savedPhotos.some(photo => photo.photo.toString() === photoId)) { 
    // Check the photo field of each item, and only add the photo if it's not already in the array
      appointment.savedPhotos.push({ photo: photoId, selectedTag: selectedTag });
      await appointment.save();
      
      res.json({ message: 'Photo saved successfully' });
    } else {
      res.json({ message: 'Photo already saved' });
    }
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route handler to remove a photo
router.post('/:appointmentId/remove-photo', async (req, res) => {
  // Find the appointment and remove the photo from the savedPhotos array
  logger.info('Received request for /:appointmentId/remove-photo...');
  
  const { photoId } = req.body;
  try {
    const appointment = await Appointment.findById(req.params.appointmentId); 
    
    appointment.savedPhotos = appointment.savedPhotos.filter(photo => photo.photo.toString() !== photoId);
    await appointment.save();
    
    res.json({ message: 'Photo removed successfully' });
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
