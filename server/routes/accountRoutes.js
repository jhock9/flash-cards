const router = require('express').Router();
const User = require('../models/userModel');

router.get('/account-data', async (req, res) => {
  try {
    if (!req.session.user.username) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    const user = await User.findById(req.session.user.username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;