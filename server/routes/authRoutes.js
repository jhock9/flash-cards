const router = require('express').Router();
const passport = require('passport');
const User = require('../models/userModel');

// Register route
router.post('/register', async (req, res) => {
  console.log('Request:', req.body);
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  console.log(req.body)
  try {
    const user = new User(req.body);
    console.log('User before save:', user);
    const result = await user.save();
    console.log('Save result:', result);
    res.status(201).redirect('../../src/landing.html');
  } catch (error) {
    console.log('Error during save:', error);
    res.status(400).send(error.message);
  }
});

// Login route
router.post('/login', passport.authenticate('local', {
  successRedirect: '../../src/flashcards.html',
  failureRedirect: '../../src/landing.html', 
}));

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy(() => {
    res.redirect('./../src/landing.html');
  });
});

module.exports = router;
