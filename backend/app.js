const express = require('express');
const connection = require('./db/connect');
const app = express();
const port = 3000;

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.get('/demo', (req, res) => {
  let sql = "Select * from Student,Project,Project_Files,Mentor";
  connection.query(sql,function(err,results){
    if (err) throw err;
    res.send(results);
  })
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  connection.connect(function(err){
    if(err) throw err;
    console.log('Database Connected!');
  })
});