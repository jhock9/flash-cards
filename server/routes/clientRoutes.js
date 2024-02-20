const router = require('express').Router();
const logger = require('../config/winston');
const Client = require('../models/clientModel');
const User = require('../models/userModel');

router.post('/create-client', async (req, res) => {
  logger.info('Received request for /create-client...');
  const { fullname, techName } = req.body;
  
  // Validation checks
  if (!fullname || !techName) {
    return res.status(400).json({ error: 'Client name and Therapist/Tech name are required' });
  }
  
  // Check if techName exists in User collection
  const existingUser = await User.findOne({ username: techName });
  if (!existingUser) {
    return res.status(400).json({ error: 'Therapist/Tech name does not exist.' });
  }
  
  logger.info('New client validated...');
  try {
    // Generate a unique clientId
    const clientId = await generateUniqueClientId();
    
    const client = new Client({ fullname, user: existingUser._id, clientId });
    await client.save();
    res.status(201).json({ success: true });
    
  } catch (error) {
    logger.error(`ERROR saving client to database: ${error}`);
    res.status(400).json({ error: error.message });
  } 
});

const generateUniqueClientId = async () => {
  const lastClient = await Client.findOne().sort({ createdAt: -1 });
  let lastId = lastClient ? parseInt(lastClient.clientId) : 0;
  let newId = (lastId + 1).toString().padStart(5, '0');
  
  // Check if newId already exists
  const existingClient = await Client.findOne({ clientId: newId });
  if (existingClient) {
    // If newId already exists, increment lastId and try again
    newId = (lastId + 2).toString().padStart(5, '0');
  }
  return newId;
};

router.get('/refresh-clients', async (req, res) => {
  logger.info('Received request for /refresh-clients...');
  try {
    const clients = await Client.find().populate('user');
    res.status(200).json(clients);
  } catch (error) {
    logger.error(`ERROR fetching clients from database: ${error}`);
    res.status(400).json({ error: error.message });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const clients = await Client.find({ user: req.params.userId });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// Export to server.js
module.exports = router;
