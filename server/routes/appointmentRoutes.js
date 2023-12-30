const router = require('express').Router();
const logger = require('../config/winston');
const Appointment = require('../models/appointmentModel');

router.get('/:clientId', async (req, res) => {
  logger.info('Received request for /appointment/:clientId...');
  logger.debug('Received request for /appointment/:clientId...');
  logger.debug(`clientId: ${req.params.clientId}`);
  try {
    const appointment = await Appointment.findOne({ client: req.params.clientId });
    logger.debug(`findOne result: ${appointment}`);
    if (!appointment) {
      logger.debug('No appointment found');
      return res.status(404).json({ message: 'Appointment not found' });
    }
    logger.debug(`Found appointment: ${appointment}`);
    res.json({ appointment });
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/create-appt', async (req, res) => {
  logger.info('Received request for /create-appt...');
  logger.debug('Received request for /create-appt...');
  logger.debug(`Request body: ${JSON.stringify(req.body)}`);
  try {
    const newAppointment = new Appointment({ client: req.body.clientId });
    await newAppointment.save();
    logger.debug(`New appointment: ${JSON.stringify(newAppointment)}`);
    res.status(201).json({ appointment: newAppointment });
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
