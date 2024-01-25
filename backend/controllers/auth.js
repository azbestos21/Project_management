const mysql = require('mysql2')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const adminTableModule = require('../models/admin');
const mentorTableModule = require('../models/mentor');
const projectTableModule = require('../models/project');
const studentTableModule = require('../models/student');
const nodemailer = require("nodemailer")
require("dotenv").config();
const connection = mysql.createConnection({
    host :'localhost',
    database : 'PMS',
    user :'root',
    password: 'Rockydon'
});
exports.adminregister= (req,res)=>{
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
exports.adminlogin = (req, res) => {
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


exports.studentregister = async (req, res) => {
    console.log(req.body);
    mentorTableModule.createMentorTable();
    projectTableModule.createProjectTable();
    studentTableModule.createStudentTable();

    const { username, password, confirmpassword, Name, email, phone, pid, mid } = req.body;

    try {
        // Check if the username is already in use
        const existingUser = await new Promise((resolve, reject) => {
            connection.query('SELECT USN FROM student WHERE USN = ?', [username], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        if (existingUser.length === 1) {
            return res.render('student_register', {
                message: 'That username is already in use'
            });
        } else if (password !== confirmpassword) {
            return res.render('student_register', {
                message: 'Passwords do not match'
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        // Insert the new student into the database
        await new Promise((resolve, reject) => {
            connection.query('INSERT INTO student SET ?', {
                USN: username,
                Name: Name, // Corrected to use the correct case 'Name'
                Email: email,
                Password: hashedPassword,
                Phone_No: phone,
                P_ID: pid,
                M_ID: mid
            }, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    console.log(results);
                    resolve();
                }
            });
        });
        await sendemail(email)
        return res.render('student_register', {
            message: 'Student registered'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};

exports.studentlogin = (req, res) => {
    const { username, password } = req.body;

    connection.query('SELECT * FROM student WHERE USN = ?', [username], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length === 0) {
            return res.render('student_login', {
                message: 'Username or password is incorrect'
            });
        }

        const user = results[0];

        // Compare the provided password with the hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.Password);

        if (!isPasswordMatch) {
            return res.render('student_login', {
                message: 'Username or password is incorrect'
            });
        }

        // If the username and password are correct, you can proceed with the login logic
        // For example, you can create a session for the user or redirect them to a dashboard page.

        return res.render('student_login', {
            message: 'Login successful'
        });
    });
};

const sendemail=async(email)=>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SECRET_EMAIL, // Your Gmail address
          pass: process.env.SECRET_PASS, // Your Gmail password or an app-specific password
        },
      });
    
      const mailSuperAdmin = {
        from: process.env.SECRET_EMAIL,
        to: email,
        subject: "Verification Code for Registration",
        html: `
        <p>Thankyou</p>
      `,
      };
    
      try {
        await transporter.sendMail(mailSuperAdmin);
        console.log("sent");
      } catch (error) {
        console.error("Email sending error:", error);
        throw new Error("Failed to send verification code to email.");
      }
}