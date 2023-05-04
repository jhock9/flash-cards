require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3003;

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL;
const API_KEY = process.env.GOOGLE_API_KEY;
const NODE_ENV = process.env.NODE_ENV;

// Serve static files
app.use(express.static(path.join(__dirname, '../src/')));

app.get('/config', (req, res) => {
  res.json({
    NODE_ENV: NODE_ENV,
    GOOGLE_API_KEY: API_KEY,
    GOOGLE_CLIENT_ID: CLIENT_ID,
    GOOGLE_CLIENT_SECRET: CLIENT_SECRET,
    REDIRECT_URL: REDIRECT_URL,
  });
});

//* Obtaining OAuth 2.0 access tokens
app.get('/oauth2callback', async (req, res) => {
  // Extract the code from the URL
  const code = req.query.code;

  const getTokens = async() => {
    try {
      // Exchange the code for tokens
      const { tokens } = await oauth2Client.getToken(code);
      console.log('Received tokens:', tokens);
      
      // Set the credentials for the OAuth2 client
      oauth2Client.setCredentials(tokens);
      
      // Redirect the user to the main page of your app
      res.redirect('/');
    } catch (error) {
      console.error('Error exchanging authorization code:', error);
      res.status(500).send('Error exchanging the authorization code for tokens');
    }
  }

  getTokens();

});

// Import the Google Auth and Google APIs libraries
const { google } = require('googleapis');
// const { OAuth2Client } = require('google-auth-library');
// const photoslibrary = google.photoslibrary('v1');

// Set up your OAuth2 client for the API
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL,
);

// Generate a url that asks permissions for the scope
const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline', // (gets refresh_token)
  scope: 'https://www.googleapis.com/auth/photoslibrary.readonly',
  include_granted_scopes: true // Enable incremental authorization
});

// Redirect to Google's OAuth 2.0 server
app.get('/auth', (req, res) => {
  res.writeHead(301, { "Location": authorizationUrl });
  res.end();
});

// Exchange authorization code for refresh and access tokens
const url = require('url');

// // Receive the callback from Google's OAuth 2.0 server.
// if (req.url.startsWith('/oauth2callback')) {
//   // Handle the OAuth 2.0 server response
//   let q = url.parse(req.url, true).query;

//   // Get access and refresh tokens (if access_type is offline)
//   let { tokens } = await oauth2Client.getToken(q.code);
//   oauth2Client.setCredentials(tokens);
// }

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

//* Setting content-type headers for files
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
  console.log('Received code:', code);

  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log('Received tokens:', tokens);
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
