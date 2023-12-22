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
    // Generate a unique clientID
    const clientID = await generateUniqueClientID();
    
    const client = new Client({ fullname, user: existingUser._id, clientID });
    await client.save();
    res.status(201).json({ success: true });
  
  } catch (error) {
    logger.error(`ERROR saving client to database: ${error}`);
    res.status(400).json({ error: error.message });
  } 
});

const generateUniqueClientID = async () => {
  const lastClient = await Client.findOne().sort({ createdAt: -1 });
  let lastID = lastClient ? parseInt(lastClient.clientID) : 0;
  let newID = (lastID + 1).toString().padStart(5, '0');
  
  // Check if newID already exists
  const existingClient = await Client.findOne({ clientID: newID });
  if (existingClient) {
    // If newID already exists, increment lastID and try again
    newID = (lastID + 2).toString().padStart(5, '0');
  }
  return newID;
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

// Export to server.js
module.exports = router;
