require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const cron = require('node-cron');
const port = process.env.PORT || 3003;
const session = require('express-session');
const passport = require('passport');

const morganMiddleware = require('./config/morgan');
const logger = require('./config/winston');

const localPassport = require('./config/passport');
require('./config/passport')(passport);

const authRoutes = require('./routes/authRoutes');
const Token = require('./models/tokenModel'); 
const { getAllPhotos, getPhotoById, updatePhotoById } = require('./controllers/photoController');

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
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Could not connect to MongoDB Atlas', err));

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

// Serve landing.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/', 'landing.html'));
});

// Serve flashcards.html
app.get('/flashcards', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/', 'flashcards.html'));
});

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use user model for authentication
localPassport(passport);

// Routes
app.use('/auth', authRoutes);
app.use('/google', googleRoutes);

// CRUD routes
app.get('/photos', getAllPhotos);
app.get('/photos/:id', getPhotoById);
app.patch('/photos/:id', updatePhotoById);

Token.findOne({}, (err, tokenDoc) => {
  if (err) {
    logger.error('Error loading tokens from database:', err);
  } else if (tokenDoc) {
    oauth2Client.setCredentials({
      access_token: tokenDoc.accessToken,
      refresh_token: tokenDoc.refreshToken,
    });
    logger.info('Tokens loaded from database and set in OAuth2 client.');
  }
});

const fetchPhotoData = async () => {
Z  // Code to fetch photos from Google Photos API
  const photos = await googlePhotosApi.getPhotos();

  // Code to store photos in your database
  await PhotoModel.insertMany(photos);
};

// Fetch photos at 2:00 AM every day
cron.schedule('0 2 * * *', fetchPhotoData);

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
  console.log(`Server running at http://localhost:${port}`);
});
