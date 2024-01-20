const mysql = require('mysql2')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const connection = mysql.createConnection({
    host :'localhost',
    database : 'PMS',
    user :'root',
    password: 'rishi123vg'
});
exports.register = (req,res)=>{
    console.log(req.body);
    const {username,password,confirmpassword} = req.body;
    connection.query('Select Username from admin where Username = ?',[username],async(error,results)=>{
        if(error){
            console.log(error);
        }
        if(results.length>0){
            return res.render('register',{
                message:'That email is already in use'
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