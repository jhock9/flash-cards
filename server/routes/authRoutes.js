const router = require('express').Router();
const passport = require('passport');
const User = require('../models/userModel');

// Register route
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(`Welcome ${user.username}!`);
  } catch (error) {
    res.status(400).send('Error registering new user please try again.');
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
