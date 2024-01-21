const express = require('express');
const connection = require('./db/connect');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: './.env' });

const app = express();
const port = 3000;

// Update the path for extracting HTML and CSS
const publicDirectory = path.join(__dirname, '../frontend/public');
app.use(express.static(publicDirectory));

// For parsing into JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set the views directory to the correct absolute path
app.set('view engine', 'hbs');
app.set('views', 'C:/Users/vishn/OneDrive/Desktop/project_management/frontend/views');

// Define routes
app.use('/', require('./routes/pages.js'));
app.use('/auth', require('./routes/auth'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  
  connection.connect(function(err){
    if(err) throw err;
    console.log('Database Connected!');
  });
});
