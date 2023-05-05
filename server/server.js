require('dotenv').config();
const path = require('path');
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3003;

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;

// Serve static files
app.use(express.static(path.join(__dirname, '../src/')));

app.get('/config', (req, res) => {
  res.json({
    GOOGLE_CLIENT_ID: CLIENT_ID,
  });
});

//* Obtaining OAuth 2.0 access tokens
// Import the Google Auth APIs libraries
const { google } = require('googleapis');

// Set up your OAuth2 client for the API
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL,
);
console.log('OAuth2 client CREATED.');

// Exchange authorization code for refresh and access tokens
app.post('/oauth2callback', express.json(), async (req, res) => {
  console.log('HANDLING OAuth 2.0 server response');
  try {
    let q = url.parse(req.url, true).query;
    const { tokens } = await oauth2Client.getToken(q.code);
    oauth2Client.setCredentials(tokens);
    res.status(200).send('Tokens obtained.');
    console.log('Tokens RECEIVED.', tokens);
  } catch (error) {
    res.status(500).send('ERROR exchanging authorization code.');
    console.error('ERROR exchanging authorization code:', error);
  }
});

// Fetch albums from Google Photos API
app.get('/api/list-albums', async (req, res) => {
  try {
    const url = 'https://photoslibrary.googleapis.com/v1/albums';
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${oauth2Client.credentials.access_token}`,
        'Content-Type': 'application/json',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching albums');
  }
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
  const contentTypeMap = {
    '.js': 'application/javascript',
    '.html': 'text/html',
    '.css': 'text/css',
    '.png': 'image/png',
    '.ico': 'image/x-icon',
  };

  const ext = path.extname(req.url);
  if (contentTypeMap[ext]) {
    res.setHeader('Content-Type', contentTypeMap[ext]);
  }

  next();
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
