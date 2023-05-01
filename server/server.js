require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3003;

// // Import the Google Auth and Google APIs libraries
// const { OAuth2Client } = require('google-auth-library');
// const { google } = require('googleapis');
// const photoslibrary = google.photoslibrary('v1');

// const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// const REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL;
// const client = new OAuth2Client(CLIENT_ID);

// // Set up your OAuth2 client for the Google Photos API
// const oauth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URL
// );

// Serve static files
app.use(express.static(path.join(__dirname, '../src/')));

app.get('/config', (req, res) => {
  res.json({
    NODE_ENV: process.env.NODE_ENV,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    REDIRECT_URL: process.env.GOOGLE_REDIRECT_URL
  });
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
    // const accessToken = payload['at_hash']; // Use the provided access token

    // // Set the access token for the OAuth2 client
    // oauth2Client.setCredentials({
    //   access_token: accessToken,
    // });

    // Returns a success response to the client-side application
    res.json({ status: 'success', message: 'Authentication and authorization successful' });
  } catch (error) {
    console.error('Error validating access token:', error);
    res.status(401).json({ status: 'failure', message: 'Authentication failed' });
  }
});

// // Server-side endpoint for fetching albums from Google Photos API
// app.get('/api/albums', async (req, res) => {
//   try {
//     const response = await photoslibrary.albums.list({
//       auth: oauth2Client
//     });
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error fetching albums:', error);
//     res.status(500).json({ status: 'failure', message: 'Failed to fetch albums' });
//   }
// });

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong!');
});
