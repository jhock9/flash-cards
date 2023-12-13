const logger = require('../config/winston');
const router = require('express').Router();
const User = require('../models/userModel');

router.get('/account-data', async (req, res) => {
  try {
    logger.debug('Session data:', req.session); // Log the session data

    if (!req.session.user || !req.session.user.username) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    const user = await User.findOne({ username: req.session.user.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ user });
  } catch (error) {
    logger.debug('Error in /account-data route:', error)
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;