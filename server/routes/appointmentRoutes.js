const router = require('express').Router();
const logger = require('../config/winston');
const Appointment = require('../models/appointmentModel');

//!! just for debugging
router.use((req, res, next) => {
  logger.debug(`Received request: ${req.method} ${req.path}`);
  next();
});

router.post('/appointment', async (req, res) => {
  logger.info('Received request for /appointment...');
  logger.debug('Received request for /appointment...');
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

router.get('/appointment/:clientId', async (req, res) => {
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

module.exports = router;
