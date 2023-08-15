require('dotenv').config();
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3003;
const {google} = require('googleapis');
const url = require('url');

// const {OAuth2Client} = require('google-auth-library');

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
app.use(cookieParser()); //? still needed?

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
// const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

console.log('OAuth2 client CREATED: ', oauth2Client);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline', // Gets refresh token
  scope: 'https://www.googleapis.com/auth/photoslibrary.readonly',
  include_granted_scopes: true,
  // response_type: 'code',
  // redirect_uri: REDIRECT_URL,
  // client_id: GOOGLE_CLIENT_ID,
});

let userCredential = null;

res.writeHead(301, { "Location": authUrl });

// Receive the callback from Google's OAuth 2.0 server.
if (req.url.startsWith('/oauth2callback')) {
  // Handle the OAuth 2.0 server response
  const q = url.parse(req.url, true).query;

  if (q.error) {
    console.error('Error:', q.error);
  } else { 
    // Get access and refresh tokens
    const { tokens } = await oauth2Client.getToken(q.code);
    oauth2Client.setCredentials(tokens);

    userCredential = tokens;

    const getPhotos = await google.photoslibrary.mediaItems.list({
      auth: oauth2Client,
      pageSize: 100,
    // });
    }, (err1, res1) => {
      if (err1) return console.log('The API returned an error: ' + err1);
      const mediaItems = res1.data.mediaItems;
      if (mediaItems.length) {
        console.log('mediaItems:');
        mediaItems.map((item) => {
          console.log(`${item.name} (${item.id})`);
        });
      } else {
        console.log('No files found.');
      }
    });
    console.log('Photos:', getPhotos);
  }
};

// //!! dont need this anymore I dont think
// // Exchange authorization code for refresh and access tokens
// app.get('/oauth2callback', async (req, res) => {
//   try {
//     console.log('HANDLING OAuth 2.0 server response');
//     const code = req.body.code;
//     console.log('Received code:', code);

//     const { tokens } = await oauth2Client.getToken(code);
//     console.log('Received tokens:', tokens);
//     oauth2Client.setCredentials(tokens);

//     console.log('Received access token:', tokens.access_token);

//     // Get the user's email address
//     //? still needed?
//     const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
//     const userinfoResponse = await oauth2.userinfo.get();
//     const userEmail = userinfoResponse.data.email;
    
//     //? still needed?
//     res.cookie('accessToken', tokens.access_token, { 
//       // httpOnly: true, 
//       // secure: process.env.NODE_ENV === 'production', 
//       SameSite: 'None',
//     });
//     console.log('Cookie set with name "accessToken"');

//     // Debugging lines:
//     //? still needed?
//     console.log('Response headers after setting cookie:', res.getHeaders());
//     console.log('Response cookies after setting cookie:', res.cookies);

//     res.status(200).json({ success: true, user_email: userEmail, access_token: tokens.access_token });
//   } catch (error) {
//     console.error('ERROR exchanging authorization code:', error);
//     res.status(500).json({ success: false, error: error.toString() });
//   }
// });

// // Check if user is authenticated
// //? still needed?
// app.get('/is-authenticated', (req, res) => {
//   // Debugging lines:
//   console.log('Cookies in /is-authenticated:', req.cookies);
//   console.log('Cookie header in /is-authenticated:', req.headers.cookie);

//   if (req.cookies.accessToken) {
//     res.status(200).json({ isAuthenticated: true });
//   } else {
//     res.status(200).json({ isAuthenticated: false });
//   }
// });

// // Clear access token cookie 
// //? still needed?
// app.post('/logout', (req, res) => {
//   res.clearCookie('accessToken');
//   res.status(200).json({ success: true });
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
