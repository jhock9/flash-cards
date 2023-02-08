const express = require('express');
const app = express();
const port = process.env.PORT || 3003;
const path = require('path');

// Serve favicon
app.get('/favicon.ico', (req, res) => {
  res.setHeader('Content-Type', 'image/x-icon');
  res.sendFile(path.resolve(__dirname, '../', 'favicon.ico'));
});

// Serve index.html
app.get('/', (req, res) => {
  const indexPath = path.resolve(__dirname, '../dist', 'index.html');
  console.log(`Serving index file at path: ${indexPath}`);
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(indexPath);
});

// Serve main.css
app.get('/main.css', (req, res) => {
  res.set('Content-Type', 'text/css');
  res.sendFile(path.join(__dirname, 'dist', 'main.css'));
});

// Serve app.js
app.get('/app.js', (req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'dist', 'app.js'));
});

// Serve bundle.js
app.get('/bundle.js', (req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'dist', 'bundle.js'));
});

// Serve static files
app.use(express.static(path.join(__dirname, '../dist')));

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
