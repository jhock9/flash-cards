const router = require('express').Router();
const logger = require('../config/winston');
const User = require('../models/userModel');

router.post('/create-user', async (req, res) => {
  logger.info('Received request for /create-user...');
  const { fullname, username, password, role } = req.body;
  
  // Validation checks
  if (!fullname || !username || !password || !role) {
    return res.status(400).json({ error: 'Full name, username, password, and role are required' });
  }
  
  // Check if username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: 'Username already exists.' });
  }
  
  // Password = 4 digit code
  if (!password.match(/^\d{4}$/)) {
    return res.status(400).json({ error: 'Password must be a 4 digit code.' });
  }
  
  logger.info('New user validated...');
  try {
    const user = new User({ fullname, username, password, role });
    await user.save();
    res.status(201).json({ success: true });
    
  } catch (error) {
    logger.error(`ERROR saving user to database: ${error}`);
    res.status(400).json({ error: error.message });
  } 
});

router.get('/refresh-users', async (req, res) => {
  logger.info('Received request for /refresh-users...');
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    logger.error(`ERROR fetching users from database: ${error}`);
    res.status(400).json({ error: error.message });
  }
});

// Export to server.js
module.exports = router;
