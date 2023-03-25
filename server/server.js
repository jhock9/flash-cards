const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3003;
require('dotenv').config();

// Serve static files
app.use(express.static(path.join(__dirname, '../src')));

app.get('/config', (req, res) => {
  res.json({
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  });
});

// Log serving file
app.use((req, res, next) => {
  console.log(`Serving file at path: ${req.path}`);
  next();
});

// SETTING CONTENT-TYPE HEADERS FOR FILES
app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});

app.use((req, res, next) => {
  if (req.url.endsWith('.html')) {
    res.setHeader('Content-Type', 'text/html');
  }
  next();
});

app.use((req, res, next) => {
  if (req.url.endsWith('.css')) {
    res.setHeader('Content-Type', 'text/css');
  }
  next();
});

app.use((req, res, next) => {
  if (req.url.endsWith('.png')) {
    res.setHeader('Content-Type', 'image/png');
  }
  next();
});

app.use((req, res, next) => {
  if (req.url.endsWith('.ico')) {
    res.setHeader('Content-Type', 'image/x-icon');
  }
  next();
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
