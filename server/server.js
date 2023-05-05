require('dotenv').config();
const path = require('path');
const express = require('express');
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

// // Generate a url that asks permissions for the scope
// const authorizationUrl = oauth2Client.generateAuthUrl({
//   access_type: 'offline', // (gets refresh_token)
//   scope: 'https://www.googleapis.com/auth/photoslibrary.readonly',
//   include_granted_scopes: true // Enable incremental authorization
// });

// //!! this is where it falls apart
// // Redirect to Google's OAuth 2.0 server
// app.get('/auth', (req, res) => {
//   console.log(`Redirecting to Google's OAuth 2.0 server:`, authorizationUrl);
//   // res.writeHead(301, { "Location": authorizationUrl });
//   // res.end();
//   res.redirect(301, authorizationUrl); // swapped this for the two lines above
// });

// // Exchange authorization code for refresh and access tokens
// const url = require('url');

// // Receive the callback from Google's OAuth 2.0 server.
// app.get('/oauth2callback', async (req, res) => {
//   console.log('Handling the OAuth 2.0 server response');
//   // Handle the OAuth 2.0 server response
//   let q = url.parse(req.url, true).query;
//   console.log('Received query:', q);

//   // Get access and refresh tokens (if access_type is offline)
//   (async () => {
//     try {
//       let { tokens } = await oauth2Client.getToken(q.code);
//       console.log('Received tokens:', tokens);
//       oauth2Client.setCredentials(tokens);
//       console.log('Credentials set for the OAuth2 client');
//       res.redirect('/'); // Redirect user to the home page after successful token exchange
//     } catch (error) {
//       console.error('Error exchanging authorization code:', error);
//       res.status(500).send('Token exchange failed');
//     }
//   })();
// });

// // Redirect to Google's OAuth 2.0 server
  // console.log(`Redirecting to Google's OAuth 2.0 server:`, authorizationUrl);
  // res.writeHead(301, { "Location": authorizationUrl });

// Exchange authorization code for refresh and access tokens
// const url = require('url');

// console.log('HANDLING OAuth 2.0 server response');
// if (req.url.startsWith('/oauth2callback')) {
//   // Handle the OAuth 2.0 server response
//   let q = url.parse(req.url, true).query;
//   console.log('Received query:', q);

//   // Get access and refresh tokens (if access_type is offline)
//   let { tokens } = await oauth2Client.getToken(q.code);
//   console.log('Tokens RECEIVED.', tokens);
//   oauth2Client.setCredentials(tokens);
//   console.log('OAuth2 client credentials SET.');
// }
// //!! this is where it falls apart

app.post('/oauth2callback', express.json(), async (req, res) => {
  console.log('HANDLING OAuth 2.0 server response');
  try {
    const code = req.body.code;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.status(200).send('Tokens obtained.');
    console.log('Tokens RECEIVED.', tokens);
  } catch (error) {
    res.status(500).send('ERROR exchanging authorization code.');
    console.error('ERROR exchanging authorization code:', error);
  }
});

// Server-side endpoint for fetching albums from Google Photos API
const photoslibrary = google.photos({version: 'v1', auth: oauth2Client});

app.get('/api/list-albums', async (req, res) => {
  try {
    const response = await photoslibrary.albums.list({
      auth: oauth2Client,
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error calling Google Photos API:', error);

    if (error.code === 401) {
      res.status(401).send('Unauthorized: Access token expired or revoked.');
    } else {
      res.status(500).send('Error calling Google Photos API.');
    }
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

// app.use((req, res, next) => {
//   if (req.url.endsWith('.js')) {
//     res.setHeader('Content-Type', 'application/javascript');
//   }
//   next();
// });

// app.use((req, res, next) => {
//   if (req.url.endsWith('.html')) {
//     res.setHeader('Content-Type', 'text/html');
//   }
//   next();
// });

// app.use((req, res, next) => {
//   if (req.url.endsWith('.css')) {
//     res.setHeader('Content-Type', 'text/css');
//   }
//   next();
// });

// app.use((req, res, next) => {
//   if (req.url.endsWith('.png')) {
//     res.setHeader('Content-Type', 'image/png');
//   }
//   next();
// });

// app.use((req, res, next) => {
//   if (req.url.endsWith('.ico')) {
//     res.setHeader('Content-Type', 'image/x-icon');
//   }
//   next();
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
