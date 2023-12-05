const router = require('express').Router();
const logger = require('../config/winston');

// Check if user is authenticated with session
router.get('/authenticate', (req, res) => {
  logger.info('Received request for /authenticate...');
  console.log('At start of /authenticate, req.session:', req.session); 
  if (req.session && req.session.isAuthenticated) {
    res.status(200).json({ isAuthenticated: true, userRole: req.user.role, user: req.session.user });
  } else {
    res.status(200).json({ isAuthenticated: false });
  }
});

// Check if admin has authenticated with Google
router.get('/google-authenticate', (req, res) => {
  logger.info('Received request for /google-authenticate...');
  if (req.session && req.session.isGoogleAuthenticated) {
    res.status(200).json({ isGoogleAuthenticated: true });
  } else {
    res.status(200).json({ isGoogleAuthenticated: false });
  }
});

// Export to server.js
module.exports = router;
