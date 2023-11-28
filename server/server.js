require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3003;
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');

const morganMiddleware = require('./config/morgan');
const logger = require('./config/winston');

const localPassport = require('./config/passport');
require('./config/passport')(passport);

const authRoutes = require('./routes/authRoutes'); // Routes for local authentication
const { router: googleAuthRoutes } = require('./routes/googleAuthRoutes'); // Routes for Google authentication
const { router: photoDBRoutes, updatePhotoData } = require('./routes/photoDBRoutes'); // Routes for photo database and cron job
const { GOOGLE_CLIENT_ID } = require('./config/googleClient'); // Google client ID for /config route

const NODE_ENV = process.env.NODE_ENV;
const SESSION_SECRET = process.env.SESSION_SECRET;
const MONGO_URI = process.env.MONGO_URI;

// Enforce HTTPS redirection in production
if (NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`)
      logger.info('Redirecting to HTTPS.');
    } else {
      next();
    }
  });
}

// Log serving file
app.use((req, res, next) => {
  logger.info(`Serving file at path: ${req.path}`);
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

// MongoDB connection
mongoose.connect(MONGO_URI)
.then(() => {
  logger.info('Connected to MongoDB Atlas');
  // Update photo data from Google Photos API at server startup and 2:00 AM every day
  updatePhotoData();
  })
.catch(err => logger.error('Could not connect to MongoDB Atlas', err));

mongoose.set('debug', true);


// Add middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(morganMiddleware);

// Serve static files
app.use(express.static(path.join(__dirname, '../src/')));

// !! changing to dashboard.html for testing
// Serve login.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/', 'dashboard.html'));
});

// Serve flashcards.html 
app.get('/flashcards', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/', 'flashcards.html'));
});

// Serve dashboard.html
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/', 'dashboard.html'));
});

app.get('/config', (req, res) => {
  res.json({
    GOOGLE_CLIENT_ID: GOOGLE_CLIENT_ID,
  });
});

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use user model for authentication
localPassport(passport);

// Routes
app.use('/auth', authRoutes);
app.use('/photos', photoDBRoutes);
app.use('/google-auth', googleAuthRoutes);

//!! is this correct??
  // Clear session on logout
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      logger.error(err);
      res.status(500).json({ message: 'Server error: Failed to destroy session', isAuthenticated: true });
    } else {
      logger.info('Session destroyed successfully. User logged out.');
      res.status(200).json({ message: 'Logout successful', isAuthenticated: false });
    }
  });
});

// Error handler
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send('Something went wrong!');
});

// Start server
app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});
