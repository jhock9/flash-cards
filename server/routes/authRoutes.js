const router = require('express').Router();
const passport = require('passport');
const logger = require('../config/winston');
const User = require('../models/userModel');

// Register route
router.post('/register', async (req, res) => {
  logger.info('Received request for /register...');
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
  logger.info('Username and password validated...');
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ success: true });
  } catch (error) {
    logger.error('ERROR saving user to database:', error)
    if (error.code === 11000) {
      res.status(400).json({ error: 'Username already exists.' });
    } else { 
      res.status(400).json({ error: error.message });
    } 
  }
});

// Login route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.session.user = {
        role: user.role,
      };
      req.session.isAuthenticated = true;
      return res.json({ success: true, role: user.role });
    });
  })(req, res, next);
});

// Logout route
router.get('/logout', (req, res) => {
  console.log('Logging out user, req.logOut:', req.logOut);
  req.logOut();
  req.session.destroy(() => {
    console.log('User logged out.');
    res.status(200).json({ message: 'Logged out' });
  });
});

// Export to server.js
module.exports = router;
