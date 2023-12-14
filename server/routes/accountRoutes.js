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
      fullname: user.fullname,
      username: user.username,
      role: user.role,
    };
    
    res.json({ user: userResponse });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/update-password', async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  // Validation checks
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current password and new password are required' });
  }
  
  try {
    const user = await User.findOne({ username: req.user.username });
    
    // Check if the current password is correct
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }
    
    // Update the user's password
    user.password = newPassword;
    await user.save();
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
