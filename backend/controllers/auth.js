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
    password: 'rishi123vg'//PUT your password
});
exports.adminregister = async (req, res) => {
    console.log(req.body);
    adminTableModule.createAdminTable();
    const { username, password, confirmpassword } = req.body;
    connection.query('Select Username from admin where Username = ?', [username], async (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.length > 0) {
            return res.status(400).json({ message: 'That username is already in use' });
        } else if (password !== confirmpassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        try {
            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);

            connection.query('INSERT INTO admin SET ?', { Username: username, Password: hashedPassword }, async (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    console.log(results);
                    return res.status(200).json({ message: 'User registered' });
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};

exports.adminlogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const results = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM admin WHERE Username = ?', [username], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        if (results.length === 0) {
            return res.status(401).json({ message: 'Username or password is incorrect' });
        }

        const user = results[0];
        const isPasswordMatch = await bcrypt.compare(password, user.Password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Username or password is incorrect' });
        }

        return res.status(200).json({ message: 'Login successful', username: user.Username });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.studentregister = async (req, res) => {
    console.log(req.body);
    mentorTableModule.createMentorTable();
    projectTableModule.createProjectTable();
    studentTableModule.createStudentTable();

    const { username, password, confirmpassword, Name, email, phone, pid, mid } = req.body;

    try {
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
            return res.status(400).json({ message: 'That username is already in use' });
        } else if (password !== confirmpassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        await new Promise((resolve, reject) => {
            connection.query('INSERT INTO student SET ?', {
                USN: username,
                Name: Name,
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

        await sendemail(email);
        return res.status(200).json({ message: 'Student registered' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.studentlogin = (req, res) => {
    const { username, password } = req.body;

    connection.query('SELECT * FROM student WHERE USN = ?', [username], async (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Username or password is incorrect' });
        }

        // Assuming you want to send some user data back in the response
        const userData = {
            USN: results[0].USN,
            Name: results[0].Name,
            // Add more fields as needed
        };

        res.status(200).json({ message: 'Login successful', userData });
    });
};
exports.grouplist = (req, res) => {
    console.log('Inside grouplist function');
    const sql = 'SELECT project.Project_Name, student.USN, student.Name FROM student JOIN project ON student.P_ID = project.Project_ID GROUP BY project.Project_Name, student.P_ID, student.USN, student.Name;';
    
    connection.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        
        console.log('Retrieved data from the database:', data);
        res.json({ title: 'group-List', userData: data });
    });
};

exports.projectlist = (req, res) => {
    console.log('Inside projectlist function');
    const sql = 'select * from project';
    connection.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log('Retrieved data from the database:', data);
        res.json({ title: 'projects-List', userData: data });
    });
};

exports.studentlist = (req, res) => {
    const searchUSN = req.query.usn;
    const searchName = req.query.name;

    if (searchUSN || searchName) {
        const sql = 'SELECT student.USN, student.Name AS Student_Name, student.Email, student.Phone_No, project.Project_Name, mentor.Name FROM student JOIN project ON student.P_ID = project.Project_ID JOIN mentor ON student.M_ID = mentor.Mentor_ID WHERE (student.USN LIKE ? OR student.Name LIKE ?) ORDER BY student.USN ASC';

        connection.query(sql, [`%${searchUSN}%`, `%${searchName}%`], (err, data) => {
            if (err) {
                console.error('Error searching data:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            console.log('Search results:', data);

            res.json({ title: 'Student List', userData: data });
        });
        
    } else {
        const fullListSql = 'SELECT student.USN, student.Name AS Student_Name, student.Email, student.Phone_No, project.Project_Name, mentor.Name FROM student JOIN project ON student.P_ID = project.Project_ID JOIN mentor ON student.M_ID = mentor.Mentor_ID ORDER BY student.USN ASC';

        connection.query(fullListSql, (err, data) => {
            if (err) {
                console.error('Error fetching data:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            console.log('Retrieved data from the database:', data);

            res.json({ title: 'Student List', userData: data });
        });
    }
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
        <p>Thank you</p>
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
