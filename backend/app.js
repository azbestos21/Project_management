const express = require('express');
const app = express();
const port = 3000;

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.get('/demo', (req, res) => {
  res.send('project!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});