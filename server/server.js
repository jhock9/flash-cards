require('dotenv').config();
const path = require('path');
const express = require('express');
// const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3003;
const { google } = require('googleapis');
const Photos = require('googlephotos');
const url = require('url');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const NODE_ENV = process.env.NODE_ENV;
const SESSION_SECRET = process.env.SESSION_SECRET;

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
// app.use(cookieParser());
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

//* Obtaining OAuth 2.0 access tokens
// Set up your OAuth2 client for the API
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URL,
);

console.log('OAuth2 client CREATED: ', oauth2Client);

// Redirect to Google's OAuth 2.0 server
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline', // Gets refresh token
  // scope: 'https://www.googleapis.com/auth/photoslibrary.readonly',
  scope: Photos.Scopes.READ_ONLY,
  include_granted_scopes: true,
  response_type: 'code',
});

console.log('Authorize this app by visiting this URL:', authUrl);

// Redirect to Google's OAuth 2.0 server
app.get('/authorize', (req, res) => {
  console.log('Received request for /authorize');
  res.redirect(authUrl);
  console.log("Redirected to Google's OAuth 2.0 server");
  // This response will be sent back to the specified redirect URL 
  // with endpoint /oauth2callback
});

// Exchange authorization code for access and refresh tokens
app.get('/oauth2callback', async (req, res) => {
  try {
    console.log('Received request for /oauth2callback');
    const q = url.parse(req.url, true).query;
    console.log('Parsed query parameters:', q);
    if (q.error) {
      console.error('Error in query parameters:', q.error);
      res.status(400).send('Authentication failed');
      return;
    }
    // Get access and refresh tokens
    console.log('Attempting to get tokens with code:', q.code);
    const { tokens } = await oauth2Client.getToken(q.code);
    console.log('Received tokens:', tokens);
    // console.log('Received tokens:', tokens);

    oauth2Client.setCredentials(tokens);
    console.log('Credentials set in OAuth2 client:,', oauth2Client);

    // Check if the access token is expired and refresh it if necessary
    if (oauth2Client.isTokenExpiring()) {
      const refreshedTokens = await oauth2Client.getAccessToken();
      if (refreshedTokens) {
        console.log('Access token refreshed:', refreshedTokens.token);
        req.session.accessToken = refreshedTokens.token;
      } else {
        console.error('Error refreshing access token:', refreshedTokens);
      }
    }

    // Authentication middleware
    // Update session tokens (only if not already assigned)
    if (!req.session.accessToken) {
      req.session.accessToken = tokens.access_token;
      req.session.refreshToken = tokens.refresh_token;
    } else {
      // Send user back to client app
      res.json({
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token
      });
    }
    
    console.log('Tokens stored in session:', {
      accessToken: req.session.accessToken,
      refreshToken: req.session.refreshToken,
    });
  
    // res.cookie('accessToken', req.session.accessToken, { 
    //   httpOnly: true, 
    //   secure: process.env.NODE_ENV === 'production', 
    //   sameSite: 'None',
    // });
    // console.log('Cookie set with name "accessToken"');

    req.session.isAuthenticated = true;
    
    res.redirect('/flashcards');
  } catch (error) {
    console.error('ERROR in /oauth2callback:', error);
    res.status(500).send(`Something went wrong! Error: ${error.message}`);
  }
});

//* Fetch photos from Google Photos
app.get('/getPhotos', async (req, res) => {
  console.log('Received request for /getPhotos.');

  console.log('Retrieving access token from session...');
  const accessToken = req.session.accessToken;
  const refreshToken = req.session.refreshToken;
  console.log('Retrieved tokens from session:', { accessToken, refreshToken });
  console.log('Retrieved access token:', accessToken);

  // Initialize the Google Photos client
  console.log('Initializing Google Photos client...');
  const photos = new Photos({
    token: {
      access_token: accessToken,
      refresh_token: refreshToken,
    },
  });
  console.log('Google Photos client CREATED (photos):', photos);  
  console.log('Google Photos client mediaItems:', photos.mediaItems);
  console.log('Google Photos client CREATED (photos.token):', photos.token);

  try {
    console.log('Trying request for /getPhotos and fetching media items');
    const mediaItems = await photos.mediaItems.list({   //! Error in /getPhotos route: HTTPError: Unauthorized
      pageSize: 100
    });
    console.log('Media items fetched successfully:', mediaItems);
    res.json(mediaItems);
  } catch (error) {
    console.error('Error in /getPhotos route:', error);

    // Check if the error is due to an expired token
    if (error.response && error.response.status === 401) {
      console.log('Access token expired. Attempting to refresh.');

      // Use the refresh token to obtain a new access token
      try {
        const refreshedTokens = await oauth2Client.refreshToken(refreshToken);
        console.log('Received refreshed tokens:', refreshedTokens);
        if (refreshedTokens) {
          req.session.accessToken = refreshedTokens.access_token;
          console.log('Access token refreshed:', refreshedTokens.access_token);
          // Retry the request with the new access token
          const mediaItems = await photos.mediaItems.list({ //! Error in /getPhotos route: HTTPError: Unauthorized
            pageSize: 100
          });
          console.log('Media items fetched successfully after token refresh:', mediaItems); 
          res.json(mediaItems);
        } else {          
          console.error('Error refreshing access token (refreshedTokens):', refreshedTokens);
          res.status(500).send('Error refreshing access token');
        }
      } catch (refreshError) {
        console.error('Error refreshing access token (refreshError):', refreshError);
        res.status(500).send('Error refreshing access token');
      }
    } else {
      res.status(500).send(`Something went wrong! Error: ${error.message}`);
    }
  }
});

// app.get('/getPhotos', async (req, res) => {
//   console.log('Received request for /getPhotos.');

//   // Access token is available, proceed with the API request
//   const accessToken = req.session.accessToken;
//   const refreshToken = req.session.refreshToken;
//   console.log('Retrieved tokens from session:', { accessToken, refreshToken });
  
//   try {
//     console.log('Trying request for /getPhotos');

//     // Use the stored tokens to authenticate
//     oauth2Client.setCredentials({
//       access_token: accessToken,
//       refresh_token: refreshToken,
//     });

//     const response = await Photos.mediaItems.search({
//       version: 'v1',     
//       auth: oauth2Client,
//       resource:  {
//         pageSize: 100,
//       },
//     });

//     console.log('Received API response:', response.data);
//     res.json(response.data);

//     if (response.data && response.data.mediaItems) {
//       console.log('Received photos:', response.data.mediaItems);
//       res.json(response.data.mediaItems);
//     } else {
//       console.error('Error: Unexpected API response structure', response);
//       res.status(500).send('Unexpected API response structure');
//     }

//   } catch (err) {
//     console.error('ERROR getting photos:', err);
//     res.status(500).send(`Something went wrong! Error: ${err.message}`);
//   }
// });

// Check if user is authenticated
app.get('/is-authenticated', (req, res) => {
  // console.log('Cookies in /is-authenticated:', req.cookies);
  // console.log('Cookie header in /is-authenticated:', req.headers.cookie);
  // if (req.cookies.accessToken) {

  console.log('Session in /is-authenticated:', req.session);
  if (req.session && req.session.isAuthenticated) {
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
