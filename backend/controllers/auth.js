const mysql = require('mysql2')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const adminTableModule = require('../models/admin');
const connection = mysql.createConnection({
    host :'localhost',
    database : 'PMS',
    user :'root',
    password: 'rishi123vg'
});
exports.register= (req,res)=>{
    console.log(req.body);
    adminTableModule.createAdminTable();
    const {username,password,confirmpassword} = req.body;
    connection.query('Select Username from admin where Username = ?',[username],async(error,results)=>{
        if(error){
            console.log(error);
        }
        if(results.length>0){
            return res.render('register',{
                message:'That username is already in use'
            })
        }
        else if(password!=confirmpassword)
        {
            return res.render('register',{
                message:'Password do not match'
            })
        }

        let hashedPassword = await bcrypt.hash(password,8);
        console.log(hashedPassword)

        connection.query('INSERT INTO admin SET ?',{Username:username,Password:hashedPassword},async(error,results)=>{
            if(error){
                console.log(error);
            }
            else{
                await console.log(results);
                return res.render('register',{
                    message:'User registered'
                })
            }
        })
    })
}
exports.login = (req, res) => {
    const { username, password } = req.body;

    connection.query('SELECT * FROM admin WHERE Username = ?', [username], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length === 0) {
            return res.render('login', {
                message: 'Username or password is incorrect'
            });
        }

        const user = results[0];

        // Compare the provided password with the hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.Password);

        if (!isPasswordMatch) {
            return res.render('login', {
                message: 'Username or password is incorrect'
            });
        }

        // If the username and password are correct, you can proceed with the login logic
        // For example, you can create a session for the user or redirect them to a dashboard page.

        return res.render('login', {
            message: 'Login successful'
        });
    });
};
