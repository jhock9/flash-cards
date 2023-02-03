const express = require('express');
const app = express();
const port = process.env.PORT || 3003;
const path = require('path');

app.get('/', (req, res) => {
  const indexPath = path.resolve(__dirname, '..', 'index.html');
  console.log(`Serving index file at path: ${indexPath}`);
  res.sendFile(indexPath);
});

app.use(express.static(path.join(__dirname, '..')));

app.use((req, res, next) => {
  console.log(`Serving file at path: ${req.path}`);
  next();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong!');
});
