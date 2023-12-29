const router = require('express').Router();
const logger = require('../config/winston');
const Appointment = require('./models/appointmentModel');

router.post('/appointment', async (req, res) => {
  logger.info('Received request for /appointment...');
  try {
    const newAppointment = new Appointment({ client: req.body.clientId });
    await newAppointment.save();
    res.status(201).json({ appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/appointment/:clientId', async (req, res) => {
  logger.info('Received request for /appointment/:clientId...');
  try {
    const appointment = await Appointment.findOne({ client: req.params.clientId });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
