require('dotenv').config();
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3003;
const {google} = require('googleapis');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const NODE_ENV = process.env.NODE_ENV;
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

// 
const requireAccessToken = (req, res, next) => {
  if (!req.cookies.accessToken) {
    return res.status(401).json({ error: 'Access token missing' });
  }
  next();
};

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

// Exchange authorization code for refresh and access tokens
app.post('/oauth2callback', async (req, res) => {
  try {
    console.log('HANDLING OAuth 2.0 server response');
    const code = req.body.code;
    console.log('Received code:', code);

    const { tokens } = await oauth2Client.getToken(code);
    console.log('Received tokens:', tokens);
    oauth2Client.setCredentials(tokens);

    // Get the user's email address
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userinfoResponse = await oauth2.userinfo.get();
    const userEmail = userinfoResponse.data.email;

    res.cookie('access_token', tokens.access_token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
    });

    res.status(200).json({ success: true, user_email: userEmail, access_token: tokens.access_token });
  } catch (error) {
    console.error('ERROR exchanging authorization code:', error);
    res.status(500).json({ success: false, error: error.toString() });
  }
});

// Clear access token cookie
app.post('/logout', (req, res) => {
  res.clearCookie('accessToken');
  res.status(200).json({ success: true });
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
