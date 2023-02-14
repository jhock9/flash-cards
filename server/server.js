const express = require('express');
const app = express();
const port = process.env.PORT || 3003;
const path = require('path');

// Serve favicon
app.get('/favicon-32x32.png', (req, res) => {
  res.setHeader('Content-Type', 'image/x-icon');
  res.sendFile(path.resolve(__dirname, '..', 'favicon.ico'));
});
  
// Serve index.html
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, '../src', 'index.html'));
});

// Serve main.css
app.get('/main.css', (req, res) => {
  res.setHeader('Content-Type', 'text/css');
  res.sendFile(path.join(__dirname, '../src', 'main.css'));
});

// Serve app.js
app.get('/app.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, '../src', 'app.js'));
});

// Serve bundle.js
app.get('/bundle.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, '../dist', 'bundle.js'));
});

// Serve static files
app.use(express.static(path.join(__dirname, '../src')));

// Log serving file
app.use((req, res, next) => {
  console.log(`Serving file at path: ${req.path}`);
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