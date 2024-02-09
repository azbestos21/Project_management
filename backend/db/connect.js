const mysql = require('mysql2')
require('dotenv').config();
const connection = mysql.createConnection({
    host :'localhost',
    database : 'PMS',
    user :'root',
    password: process.env.DB_PASSWORD
});
module.exports = connection