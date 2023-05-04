require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3003;

const NODE_ENV = process.env.NODE_ENV;
const API_KEY = process.env.GOOGLE_API_KEY;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
console.log('REDIRECT_URL:', REDIRECT_URL);

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
// Import the Google Auth and Google APIs libraries
const { google } = require('googleapis');
// const photoslibrary = google.photoslibrary('v1');

// Set up your OAuth2 client for the API
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL,
);
console.log('OAuth2 client created with redirect URL:', oauth2Client.redirectUri);

// Generate a url that asks permissions for the scope
const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline', // (gets refresh_token)
  scope: 'https://www.googleapis.com/auth/photoslibrary.readonly',
  include_granted_scopes: true // Enable incremental authorization
});

// Redirect to Google's OAuth 2.0 server
app.get('/auth', (req, res) => {
  console.log(`Redirecting to Google's OAuth 2.0 server:`, authorizationUrl);
  // res.writeHead(301, { "Location": authorizationUrl });
  // res.end();
  res.redirect(301, authorizationUrl); // swapped this for the two lines above
});

// Exchange authorization code for refresh and access tokens
const url = require('url');

// Receive the callback from Google's OAuth 2.0 server.
app.get('/oauth2callback', async (req, res) => {
  console.log('Handling the OAuth 2.0 server response');
  // Handle the OAuth 2.0 server response
  let q = url.parse(req.url, true).query;
  console.log('Received query:', q);

  // Get access and refresh tokens (if access_type is offline)
  (async () => {
    try {
      let { tokens } = await oauth2Client.getToken(q.code);
      console.log('Received tokens:', tokens);
      oauth2Client.setCredentials(tokens);
      console.log('Credentials set for the OAuth2 client');
      res.redirect('/'); // Redirect user to the home page after successful token exchange
    } catch (error) {
      console.error('Error exchanging authorization code:', error);
      res.status(500).send('Token exchange failed');
    }
  })();
});

// if (req.url.startsWith('/oauth2callback')) {
//   // Handle the OAuth 2.0 server response
//   let q = url.parse(req.url, true).query;

//   // Get access and refresh tokens (if access_type is offline)
//   let { tokens } = await oauth2Client.getToken(q.code);
//   oauth2Client.setCredentials(tokens);
// }

// // Server-side endpoint for exchanging Google Authorization code
// app.post('/api/exchange-code', express.urlencoded({ extended: false }), async (req, res) => {
//   const { code } = req.body;
//   console.log('Received code:', code);

//   (async () => {
//     try {
//       console.log('Using redirect_uri:', oauth2Client.redirectUri);
//       const { tokens } = await oauth2Client.getToken(code, { redirect_uri: 'https://vb-mapp-flash-cards.herokuapp.com/oauth2callback' });
//       console.log('Received tokens:', tokens);
//       // tokens object will contain access_token and refresh_token
//       oauth2Client.setCredentials(tokens);
//       console.log('Credentials set for the OAuth2 client');
//       res.json({ status: 'success', message: 'Token exchange successful', tokens });
//     } catch (error) {
//       console.error('Error exchanging authorization code:', error);
//       res.status(500).json({ status: 'failure', message: 'Token exchange failed' });
//     }
//   })();
// });

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

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Using redirect URL:', REDIRECT_URL);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong!');
});
