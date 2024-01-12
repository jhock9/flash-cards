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
    // get the appointment _id value
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
  logger.debug('Request body:', req.body);
  
  try {
    const { savedTag } = req.body;
    logger.debug('savedTag:', savedTag);

    if (!Array.isArray(savedTag)) {
      return res.status(400).json({ message: 'Invalid request: savedTag must be an array' });
    }
    // get the appointment data by _id value
    // await Appointment.findByIdAndUpdate(req.params.appointmentId, { $push: { savedTags: { $each: savedTag } } });
    
    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.appointmentId, { $push: { savedTags: { $each: savedTag } } }, { new: true });
    logger.debug('Updated appointment:', updatedAppointment); // Log the updated appointment

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
  logger.debug('Request body:', req.body);
  
  const { savedTag } = req.body;
  try {
    logger.debug('savedTag:', savedTag); 
    // get the appointment _id value
    const appointment = await Appointment.findById(req.params.appointmentId); 
    // remove savedTags from array
    appointment.savedTags = appointment.savedTags.filter(tag => !savedTag.some(saved => saved.name === tag.name));
    // await appointment.save();
    const updatedAppointment = await appointment.save();
    logger.debug('Updated appointment:', updatedAppointment); // Log the updated appointment

    res.json({ message: 'Tags removed successfully' });
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// TODO: Update the server-side route handler for the request sent by savePhoto(). 
// This handler should find the appointment with the specified ID and add the photo ID to the savedPhotos array.

// Route handler to save a photo
router.post('/:appointmentId/save-photo', (req, res) => {
  // Find the appointment and add the photo to the savedPhotos array
});

// Route handler to save an appointment
router.post('/:appointmentId/save-appt', (req, res) => {
  // Find the appointment and update the savedTags and savedPhotos arrays
});

module.exports = router;
