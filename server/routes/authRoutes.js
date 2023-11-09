const router = require('express').Router();
const passport = require('passport');
const User = require('../models/userModel');

// Register route
router.post('/register', async (req, res) => {
  console.log('Request:', req.body);
  const { username, password, confirmPassword } = req.body;
  
  // Username & Password validation
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match.' });
  } 
  
  // Password = 4 digit code
  if (!password.match(/^\d{4}$/)) {
    return res.status(400).json({ error: 'Password must be a 4 digit code.' });
  }
  
  // // Password = 4 characters, letters and numbers
  // if (!password.match(/^[A-Za-z0-9]{4,}$/)) {
  //   return res.status(400).json({ error: 'Password must be at least 4 characters and can contain only letters and numbers.' });
  // }
  
  // // Password = 6 characters; at least 1 uppercase, 1 lowercase, 1 number
  // if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/)) {
  //   return res.status(400).json({ error: 'Password must be at least 6 characters and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.' });
  // }
  
  console.log(req.body)
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.status(400).json({ error: 'Username already exists.' });
    } else { 
      res.status(400).json({ error: error.message });
    } 
  }
});

// Login route
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ success: true });

});// router.post('/login', passport.authenticate('local', {
//   successRedirect: '../../src/flashcards.html',
//   failureRedirect: '../../src/landing.html', 
// }));


// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy(() => {
    res.redirect('./../src/landing.html');
  });
});

module.exports = router;
