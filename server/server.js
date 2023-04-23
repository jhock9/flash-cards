require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3003;

// Import the Google Auth Library
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

// Serve static files
app.use(express.static(path.join(__dirname, '../src/')));

app.get('/config', (req, res) => {
  res.json({
    NODE_ENV: process.env.NODE_ENV,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  });
});

console.log('Environment variables:', {
  NODE_ENV: process.env.NODE_ENV,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
});

// Log serving file
app.use((req, res, next) => {
  console.log(`Serving file at path: ${req.path}`);
  next();
});

// Set referrer-policy header
app.use((req, res, next) => {
  if (req.headers.host === 'localhost' && req.protocol === 'http') {
    res.set('Referrer-Policy', 'no-referrer-when-downgrade');
  }
  next();
});

// Setting content-type headers for files
app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});

app.use((req, res, next) => {
  if (req.url.endsWith('.html')) {
    res.setHeader('Content-Type', 'text/html');
  }
  next();
});

app.use((req, res, next) => {
  if (req.url.endsWith('.css')) {
    res.setHeader('Content-Type', 'text/css');
  }
  next();
});

app.use((req, res, next) => {
  if (req.url.endsWith('.png')) {
    res.setHeader('Content-Type', 'image/png');
  }
  next();
});

app.use((req, res, next) => {
  if (req.url.endsWith('.ico')) {
    res.setHeader('Content-Type', 'image/x-icon');
  }
  next();
});

// Server-side endpoint for handling ID token validation and authorization
app.post('/api/authenticate', express.json(), async (req, res) => {
  const { id_token } = req.body;

  try {
    // Verify the ID token using the Google Auth Library
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userId = payload['sub'];

    // Returns a success response to the client-side application
    res.json({ status: 'success', message: 'Authentication and authorization successful' });
  } catch (error) {
    console.error('Error validating ID token:', error);
    res.status(401).json({ status: 'failure', message: 'Authentication failed' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong!');
});
