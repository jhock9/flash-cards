require('dotenv').config({ path: __dirname + '/../.env' });
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3003;
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport');
const cron = require('node-cron');
const morganMiddleware = require('./config/morgan');
const logger = require('./config/winston');
const localPassport = require('./config/passport');
require('./config/passport')(passport);
const NODE_ENV = process.env.NODE_ENV;
const SESSION_SECRET = process.env.SESSION_SECRET;
const MONGO_URI = process.env.MONGO_URI;

// Routes
const authRoutes = require('./routes/authRoutes'); // Routes for local authentication
const photoDBRoutes = require('./routes/photoDBRoutes'); // Routes for photo database and cron job
const accountRoutes = require('./routes/accountRoutes'); // Routes for account management
const userRoutes = require('./routes/userRoutes'); // Routes for user management
const clientRoutes = require('./routes/clientRoutes'); // Routes for client management
const appointmentRoutes = require('./routes/appointmentRoutes'); // Routes for appointment management
const dataFetchRoutes = require('./routes/dataFetchRoutes'); // Routes for admin dashboard

// Controllers
const updatePhotoData = require('./services/photoSyncService'); // For cron job

// Sets the timezone to CST
process.env.TZ = 'America/Chicago';

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
.then(() => {logger.info('MongoDB connected successfully');})
.catch(err => logger.error(`MongoDB connection error: ${err}`));

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

// Serve privacy-policy.html
app.get('/privacy-policy', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/', 'privacy-policy.html'));
});

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

// Configure passport to use user model for authentication
localPassport(passport);

// Routes
app.use('/auth', authRoutes);
app.use('/photos', photoDBRoutes);
app.use('/account', accountRoutes);
app.use('/users', userRoutes);
app.use('/clients', clientRoutes);
app.use('/appointment', appointmentRoutes);
app.use(dataFetchRoutes);

// Update photo data in database every hour from 7:00AM to 7:00PM, everyday
logger.info(`Cron job for fetching photos started at ${new Date().toLocaleString()}`);
cron.schedule('0 7-19 * *a *', async () => {
  await updatePhotoData()
  .then(() => logger.info(`Photos updated successfully at ${new Date().toLocaleString()}`))
  .catch(error => logger.error(`Failed to update photos at ${new Date().toLocaleString()}:`, error));
});

// Error handler
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send('Something went wrong!');
});

// Catch-all handler for any request that doesn't match the ones above
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '../src/', '404.html'));
});

// Start server
app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});
