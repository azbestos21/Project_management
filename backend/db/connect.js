const mysql = require('mysql2')
require('dotenv').config();
const connection = mysql.createConnection({
    host: process.env.DATABASE_HOSTNAME,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});
/*const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'rishi123vg',
    database: 'PMS',
});*/
module.exports = connection