const express = require('express');
const connection = require('./db/connect');
const path = require('path');
const app = express();
const port = 3000;
const upload=require("./controllers/auth.js")
const cors = require("cors");
// Update the path for extracting HTML and CSS
const publicDirectory = path.join(__dirname, '../frontend/public');
app.use(
  cors({
    origin: "https://main.d3od0hvcknqa8u.amplifyapp.com",
  })
);
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
  console.log(`Server is running at http://localhost:${port}`);
});
