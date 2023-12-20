require('dotenv').config({ path: __dirname + '/../.env' });
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3003;
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport');
const mongoose = require('mongoose');
const cron = require('node-cron');

const NODE_ENV = process.env.NODE_ENV;
const SESSION_SECRET = process.env.SESSION_SECRET;
const MONGO_URI = process.env.MONGO_URI;

// Config
const { GOOGLE_CLIENT_ID, initializeOauthClient } = require('./config/googleClient'); // Google client ID for /config route, initializeOauthClient() for cron job
const morganMiddleware = require('./config/morgan');
const logger = require('./config/winston');
const localPassport = require('./config/passport');
require('./config/passport')(passport);

// Routes
const authRoutes = require('./routes/authRoutes'); // Routes for local authentication
const googleAuthRoutes = require('./routes/googleAuthRoutes'); // Routes for Google authentication
const photoDBRoutes = require('./routes/photoDBRoutes'); // Routes for photo database and cron job
const accountRoutes = require('./routes/accountRoutes'); // Routes for account management
const userRoutes = require('./routes/userRoutes'); // Routes for user management
const clientRoutes = require('./routes/clientRoutes'); // Routes for client management

// Controllers
const updatePhotoData = require('./controllers/photoUpdateController'); // updatePhotoData(oauth2Client) for cron job

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
})
.catch(err => logger.error(`Could not connect to MongoDB Atlas: ${err}`));
mongoose.set('debug', NODE_ENV === 'development');

// Create a new MongoDB store
const store = new MongoDBStore({
  uri: MONGO_URI,
  collection: 'sessions'
});

// Add middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
}));

app.use(morganMiddleware);

// Serve static files
app.use(express.static(path.join(__dirname, '../src/')));

// Serve favicon
app.use('/favicon.ico', express.static(path.join(__dirname, '../src/assets/favicon.ico')));

// Serve login.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/', 'login.html'));
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

// Configure passport to use user model for authentication
localPassport(passport);

// Routes
app.use('/auth', authRoutes);
app.use('/google-auth', googleAuthRoutes);
app.use('/photos', photoDBRoutes);
app.use('/account', accountRoutes);
app.use('/users', userRoutes);
app.use('/clients', clientRoutes);

// Update photo data in database at 2:00 AM every day
initializeOauthClient().then((oauth2Client) => {
  logger.info ('Cron job initialized.')
  cron.schedule('0 2 * * *', () => updatePhotoData(oauth2Client));
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
