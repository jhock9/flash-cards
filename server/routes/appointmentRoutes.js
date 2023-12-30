const router = require('express').Router();
const logger = require('../config/winston');
const Appointment = require('../models/appointmentModel');

router.get('/:clientId', async (req, res) => {
  logger.info('Received request for /appointment/:clientId...');
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

module.exports = router;
