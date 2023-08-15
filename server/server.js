require('dotenv').config();
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3003;
const {google} = require('googleapis');
const url = require('url');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const NODE_ENV = process.env.NODE_ENV;
let ACCESS_TOKEN = process.env.GOOGLE_ACCESS_TOKEN;
let REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

console.log(`Redirect URL is: ${REDIRECT_URL}`);

// Enforce HTTPS redirection in production
if (NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}

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

// Add middleware 
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, '../src/')));

app.get('/config', (req, res) => {
  res.json({
    GOOGLE_CLIENT_ID: GOOGLE_CLIENT_ID,
  });
});

//* Obtaining OAuth 2.0 access tokens
// Import the Google Auth APIs libraries

// Set up your OAuth2 client for the API
console.log(`Creating OAuth2 client with Redirect URL: ${REDIRECT_URL}`);
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URL,
);

console.log('OAuth2 client CREATED: ', oauth2Client);

// Redirect to Google's OAuth 2.0 server
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline', // Gets refresh token
  scope: 'https://www.googleapis.com/auth/photoslibrary.readonly',
  include_granted_scopes: true,
  // response_type: 'code', // ? is this needed?
  // redirect_uri: REDIRECT_URL, // ? is this needed?
  // client_id: GOOGLE_CLIENT_ID, // ? is this needed?
});

app.get('/login', (req, res) => {
  res.redirect(authUrl);
});

// Exchange authorization code for access and refresh tokens
app.post('/sendAuthCode', async (req, res) => {
  // Extract the authorization code from the request body
  const authCode = req.body.authCode;

  try {
    // Get access and refresh tokens
    const { tokens } = await oauth2Client.getToken(authCode);

// app.get('/oauth2callback', async (req, res) => {
//   // Handle the OAuth 2.0 server response
//   try {
//     const q = url.parse(req.url, true).query;
//     if (q.error) {
//       console.error('Error:', q.error);
//       res.status(400).send('Authentication failed');
//       return;
//     }
//     // Get access and refresh tokens
//     const { tokens } = await oauth2Client.getToken(q.code);
    oauth2Client.setCredentials(tokens);
    console.log('Received tokens:', tokens);

    if (ACCESS_TOKEN === 'NOT_ASSIGNED_YET') {
      ACCESS_TOKEN = tokens.access_token;
      console.log('Updated access token:', ACCESS_TOKEN);
    }

    if (REFRESH_TOKEN === 'NOT_ASSIGNED_YET') {
      REFRESH_TOKEN = tokens.refresh_token;
      console.log('Updated refresh token:', REFRESH_TOKEN);
    }

    res.cookie('accessToken', ACCESS_TOKEN, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'None',
    });
    console.log('Cookie set with name "accessToken"');
    console.log('Response headers after setting cookie:', res.getHeaders());
    console.log('Response cookies after setting cookie:', res.cookies);

    // Redirect back to the main page
    res.redirect('/');
  } catch (error) {
    console.error('ERROR exchanging authorization code:', error);
    res.status(500).send('Something went wrong!');  
  }
});

// Get photos from Google Photos
app.get('/getPhotos', async (req, res) => {
  if (ACCESS_TOKEN === 'NOT_ASSIGNED_YET' || REFRESH_TOKEN === 'NOT_ASSIGNED_YET') {
    console.error('Tokens not assigned');
    return res.status(500).send('Tokens not assigned');
  }
  
  try {
    console.log('Received request for /getPhotos');

    // Use the stored tokens to authenticate
    oauth2Client.setCredentials({
      access_token: ACCESS_TOKEN,
      refresh_token: REFRESH_TOKEN
    });

    // Make the API request to Google Photos
    const getPhotos = await google.photos.mediaItems.search({
      version: 'v1',
      auth: oauth2Client,
      pageSize: 100,
    });

    console.log('Sending photos:', getPhotos.data);
    res.json(getPhotos.data);
  } catch (err) {
    console.error('ERROR getting photos:', err);
    res.status(500).send(`Something went wrong! Error: ${err.message}`);
  }
});

// Check if user is authenticated
app.get('/is-authenticated', (req, res) => {
  // Debugging lines:
  console.log('Cookies in /is-authenticated:', req.cookies);
  console.log('Cookie header in /is-authenticated:', req.headers.cookie);

  if (req.cookies.accessToken) {
    res.status(200).json({ isAuthenticated: true });
  } else {
    res.status(200).json({ isAuthenticated: false });
  }
});

// Clear access token cookie 
app.post('/logout', (req, res) => {
  res.clearCookie('accessToken');
  res.status(200).json({ success: true });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
