const mysql = require('mysql2')
const connection = mysql.createConnection({
    host :'localhost',
    database : 'PMS',
    user :'root',
    password: 'Rockydon'
});
module.exports = connection