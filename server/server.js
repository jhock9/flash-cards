require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const url = require('url');
const port = process.env.PORT || 3003;
const { google } = require('googleapis');
const session = require('express-session');
const axios = require('axios');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const NODE_ENV = process.env.NODE_ENV;
const SESSION_SECRET = process.env.SESSION_SECRET;

// // Enforce HTTPS redirection in production
// if (NODE_ENV === 'production') {
//   app.use((req, res, next) => {
//     if (req.header('x-forwarded-proto') !== 'https') {
//       res.redirect(`https://${req.header('host')}${req.url}`);
//     } else {
//       next();
//     }
//   });
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
app.use(cors());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Serve static files
app.use(express.static(path.join(__dirname, '../src/')));

// Serve landing.html
app.get('/landing', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/', 'landing.html'));
});

// Serve flashcards.html
app.get('/flashcards', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/', 'flashcards.html'));
});

app.get('/config', (req, res) => {
  res.json({
    GOOGLE_CLIENT_ID: GOOGLE_CLIENT_ID,
  });
});

//* OAUTH 2.0
// Set up your OAuth2 client for the API
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URL,
);
console.log('OAuth2 client CREATED...');

// Generate the URL that will be used for the consent dialog
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline', // Gets refresh token
  scope: 'https://www.googleapis.com/auth/photoslibrary.readonly',
  include_granted_scopes: true,
  response_type: 'code',
});
console.log('OAuth2 client AUTH URL generated...');

// Redirect to Google's OAuth 2.0 server
app.get('/authorize', (req, res) => {
  console.log('Received request for /authorize...');
  res.redirect(authUrl);
  console.log("Redirected to Google's OAuth 2.0 server...");
  // This response will be sent back to the specified redirect URL 
  // with endpoint /oauth2callback
});

//* HANDLING THE OAUTH 2.0 SERVER RESPONSE
// Exchange authorization code for access and refresh tokens
app.get('/oauth2callback', async (req, res) => {
  try {
    console.log('Received request for /oauth2callback...');
    const q = url.parse(req.url, true).query;
    console.log('Query parameters parsed...');
    
    if (q.error) {
      console.error('Error in query parameters:', q.error);
      res.status(400).send('Authentication failed');
      return;
    }
    // Get access and refresh tokens
    console.log('Attempting to get tokens with code...');

    const { tokens } = await oauth2Client.getToken(q.code);

    oauth2Client.setCredentials(tokens);
    console.log('Tokens set in OAuth2 client.');
    
    req.session.isAuthenticated = true;
    
    res.redirect('/flashcards');
  } catch (error) {
    console.error('ERROR in /oauth2callback:', error);
    res.status(500).send(`Something went wrong! Error: ${error.message}`);
  }
});

//* PHOTOS LIBRARY API
app.get('/getPhotos', async (req, res) => {
  console.log('Received request for /getPhotos...');

  try {
    console.log('Initializing Google Photos client...');
    
    const params = {
      pageSize: 100,
    };
  
    const response = await axios.post('https://photoslibrary.googleapis.com/v1/mediaItems:search', params, {
      headers: {
        'Authorization': `Bearer ${oauth2Client.credentials.access_token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('Received media items...');

    res.json(response.data.mediaItems);
  } catch (error) {
    console.error('Error in /getPhotos route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Check if user is authenticated
app.get('/is-authenticated', (req, res) => {
  console.log('Received request for /is-authenticated...');
  if (req.session && req.session.isAuthenticated) {
    res.status(200).json({ isAuthenticated: true });
  } else {
    res.status(200).json({ isAuthenticated: false });
  }
});

// Clear session on logout
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error: Failed to destroy session', isAuthenticated: true });
    } else {
      console.log('Session destroyed successfully. User logged out.');
      res.status(200).json({ message: 'Logout successful', isAuthenticated: false });
    }
  });
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
