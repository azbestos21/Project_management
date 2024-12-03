const express = require('express');
const connection = require('./db/connect');
const path = require('path');
const app = express();
const port = 3000;

const cors = require("cors");
// Update the path for extracting HTML and CSS
const publicDirectory = path.join(__dirname, '../frontend/public');
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}));
app.use(express.static(publicDirectory));

// For parsing into JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to the database
connection.connect(function(err){
  if(err) throw err;
  console.log('Database Connected!');
});

app.use('/auth', require('./routes/auth'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://ec2-13-203-61-198.ap-south-1.compute.amazonaws.com:${port}`);
});
