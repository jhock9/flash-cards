require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3003;
// const url = require('url');

// Import the Google Auth and Google APIs libraries
const { OAuth2Client } = require('google-auth-library');
// const { google } = require('googleapis');
// const photoslibrary = google.photoslibrary('v1');

// const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// const REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL;
// const client = new OAuth2Client(CLIENT_ID);

// Set up your OAuth2 client for the Google Photos API
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

// Serve static files
app.use(express.static(path.join(__dirname, '../src/')));

app.get('/config', (req, res) => {
  res.json({
    NODE_ENV: process.env.NODE_ENV,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    REDIRECT_URL: process.env.REDIRECT_URL
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

// Server-side endpoint for exchanging Google Authorization code
app.post('/api/exchange-code', express.urlencoded({ extended: false }), async (req, res) => {
  const { code } = req.body;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    // tokens object will contain access_token and refresh_token
    oauth2Client.setCredentials(tokens);
    res.json({ status: 'success', message: 'Token exchange successful', tokens });
  } catch (error) {
    console.error('Error exchanging authorization code:', error);
    res.status(500).json({ status: 'failure', message: 'Token exchange failed' });
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

// //*Exchanging authorization code for refresh and access tokens
// // Receive the callback from Google's OAuth 2.0 server.
// if (req.url.startsWith('/oauth2callback')) {
//   // Handle the OAuth 2.0 server response
//   let q = url.parse(req.url, true).query;

//   // Get access and refresh tokens (if access_type is offline)
//   let { tokens } = await oauth2Client.getToken(q.code);
//   oauth2Client.setCredentials(tokens);
// }

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong!');
});
