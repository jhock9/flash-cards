const express = require('express');
const app = express();
const port = process.env.PORT || 3003;
const path = require('path');

// Serve favicon
// app.get('/favicon-32x32.png', (req, res) => {
//   res.setHeader('Content-Type', 'image/x-icon');
//   res.sendFile(path.resolve(__dirname, '..', 'favicon.ico'));
// });

app.get('/favicon-32x32.png', (req, res) => {
  const faviconPath = path.resolve(__dirname, '..', 'favicon-32x32.png');
  console.log(`Serving favicon file at path: ${faviconPath}`);
  res.setHeader('Content-Type', 'image/x-icon');
  res.sendFile(faviconPath);
  });

  
// Serve index.html
// app.get('/', (req, res) => {
//   res.setHeader('Content-Type', 'text/html');
//   res.sendFile(path.join(__dirname, '../src', 'index.html'));
// });

app.get('/', (req, res) => {
  const indexPath = path.resolve(__dirname, '../dist', 'index.html');
  console.log(`Serving index file at path: ${indexPath}`);
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(indexPath);
});

// Serve main.css
// app.get('/main.css', (req, res) => {
//   res.setHeader('Content-Type', 'text/css');
//   res.sendFile(path.join(__dirname, '../src', 'main.css'));
// });

app.get('/main.css', (req, res) => {
  const cssPath = path.join(__dirname, '../src', 'main.css');
  console.log(`Serving index file at path: ${cssPath}`);
  res.setHeader('Content-Type', 'text/css');
  res.sendFile(cssPath);
  });

// Serve app.js
// app.get('/app.js', (req, res) => {
//   res.setHeader('Content-Type', 'application/javascript');
//   res.sendFile(path.join(__dirname, 'src', 'app.js'));
// });

app.get('/app.js', (req, res) => {
  const appPath = path.join(__dirname, '../src', 'app.js');
  console.log(`Serving index file at path: ${appPath}`);
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(appPath);
});

// Serve bundle.js
// app.get('/bundle.js', (req, res) => {
//   res.setHeader('Content-Type', 'application/javascript');
//   res.sendFile(path.join(__dirname, 'dist', 'bundle.js'));
// });

app.get('/bundle.js', (req, res) => {
  const bundlePath = path.resolve(__dirname, '../dist', 'bundle.js');
  console.log(`Serving index file at path: ${bundlePath}`);
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(bundlePath);
});

// Serve static files
// app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, 'dist')));
// app.use(express.static(path.join(__dirname, '../src')));

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