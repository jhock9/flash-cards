const router = require('express').Router();
const logger = require('../config/winston');

// Check if user is authenticated with session
router.get('/authenticate', (req, res) => {
  logger.info('Received request for /authenticate...');
  console.log('At start of /authenticate, req.session:', req.session); 
  if (req.session && req.session.isAuthenticated) {
    res.status(200).json({ isAuthenticated: true, user: req.session.user });
  } else {
    res.status(200).json({ isAuthenticated: false });
  }
});

// Check if admin has authenticated with database
router.get('/google-authenticate', async (req, res) => {
  logger.info('Received request for /google-authenticate...');
  try {
    const tokenDoc = await Token.findOne({});
    if (tokenDoc && tokenDoc.accessToken) {
      // Check if the access token is valid
      const isValid = await checkTokenValidity(tokenDoc.accessToken);
      if (isValid) {
        res.json({ isGoogleAuthenticated: true });
      } else {
        res.json({ isGoogleAuthenticated: false });
      }
    } else {
      res.json({ isGoogleAuthenticated: false });
    }
  } catch (error) {
    logger.error('Error checking Google authentication:', error);
    res.status(500).send(`Something went wrong! Error: ${error.message}`);
  }
});

// Export to server.js
module.exports = router;
