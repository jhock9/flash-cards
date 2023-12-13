const router = require('express').Router();
const User = require('../models/userModel');

router.get('/account-data', async (req, res) => {
  try {
    if (!req.user || !req.user.username) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    // Find the user in the database
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const userResponse = {
      username: user.username,
      role: user.role,
    };
    
    res.json({ user: userResponse });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;