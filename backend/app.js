const express = require('express');
const connection = require('./db/connect');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const port = 3000;
const cors = require("cors");
// Update the path for extracting HTML and CSS
const publicDirectory = path.join(__dirname, '../frontend/public');
app.use(cors())
app.use(express.static(publicDirectory));

// For parsing into JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set the views directory to the correct absolute path
const viewsDirectory = path.join(__dirname, '../frontend/views');
app.set('view engine', 'hbs');
app.set('views', viewsDirectory);

// Connect to the database
connection.connect(function(err){
  if(err) throw err;
  console.log('Database Connected!');
});

// Define routes  
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
