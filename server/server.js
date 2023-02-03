const express = require('express');
const app = express();
const port = process.env.PORT || 3003;

app.get('/', (req, res) => {
  const indexPath = path.resolve(__dirname, '..', 'index.html');
  console.log(`Serving index file at path: ${indexPath}`);
  res.sendFile(indexPath);
});

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '../index.html');
// });

app.use(express.static(__dirname + '../'));

app.listen(port, () => {
  console.log(`Server running at http://test.jonhocker.com:${port}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong!');
});