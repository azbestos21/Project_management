const express = require('express');
const connection = require('./db/connect');
const dotenv = require('dotenv');
const path = require('path')
dotenv.config({path:'./.env'})
const app = express();
const port = 3000;
//for extracting html css
const publicDirectory = path.join(__dirname,'./public')
app.use(express.static(publicDirectory))

//for parsing into json 
app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.set('view engine','hbs');
// Define a route

app.get('/demo', (req, res) => {
  let sql = "Select * from Student,Project,Project_Files,Mentor";
  connection.query(sql,function(err,results){
    if (err) throw err;
    res.send(results);
  })
});
app.use('/',require('./routes/pages.js'))
app.use('/auth',require('./routes/auth'))
// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  connection.connect(function(err){
    if(err) throw err;
    console.log('Database Connected!');
  })
});