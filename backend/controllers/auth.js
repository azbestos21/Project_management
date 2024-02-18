const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mentorTableModule = require("../models/mentor");
const projectTableModule = require("../models/project");
const studentTableModule = require("../models/student");
const nodemailer = require("nodemailer");
require("dotenv").config();
const connection = require("../db/connect");
exports.mentorregister = async (req, res) => {
  console.log(req.body);
  mentorTableModule.createMentorTable();
  const { username, password, confirmpassword, Name, email, phone, designation } = req.body;
  connection.query(
    "Select Mentor_ID from mentor where Mentor_ID = ?",
    [username],
    async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (results.length > 0) {
        return res
          .status(400)
          .json({ message: "That username is already in use" });
      } else if (password !== confirmpassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      try {
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        connection.query(
          "INSERT INTO mentor SET ?",
          { Mentor_ID: username, Name: Name, Email: email, Phone: phone, Designation: designation, Password: hashedPassword },
          async (error, results) => {
            if (error) {
              console.log(error);
              return res.status(500).json({ error: "Internal Server Error" });
            } else {
              console.log(results);
              const token = jwt.sign({ username, password }, process.env.JWT_SECRET);
              const userData = {
                username: username,
                email: email,
                token: token,
              };
              return res.status(200).json({ message: "Mentor registered",userData});
            }
          }
        );
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  );
};


exports.mentorlogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const results = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM mentor WHERE Mentor_ID = ?",
        [username],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    if (results.length === 0) {
      return res
        .status(401)
        .json({ message: "Mentor ID or password is incorrect" });
    }

    const user = results[0];
    const isPasswordMatch = await bcrypt.compare(password, user.Password);

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Mentor ID or password is incorrect" });
    }

    const token = jwt.sign({ username, password }, process.env.JWT_SECRET);
    const userData = {
      username: username,
      token: token,
    };
    return res.status(200).json({ message: "Login successful", userData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.studentregister = async (req, res) => {
  console.log(req.body);
  mentorTableModule.createMentorTable();
  projectTableModule.createProjectTable();
  studentTableModule.createStudentTable();

  const { username, Name, password, confirmpassword, email, mid } = req.body;

  try {
    const existingUser = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT USN FROM student WHERE USN = ?",
        [username],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    if (existingUser.length === 1) {
      return res
        .status(400)
        .json({ message: "That username is already in use" });
    } else if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);

    await new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO student SET ?",
        {
          USN: username,
          Name: Name,
          Email: email,
          Password: hashedPassword,
          Phone_no: null,
          P_ID: null,
          M_ID: mid,
        },
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            console.log(results);
            resolve();
          }
        }
      );
    });

    await sendemail(email);
    const token = jwt.sign({ username,password }, process.env.JWT_SECRET);
    const userData = {
      username: username,
      email: email,
      token: token,
    };
    return res.status(200).json({ message: "Student registered", userData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.studentlogin = (req, res) => {
  const { username, password } = req.body;

  connection.query(
    "SELECT * FROM student WHERE USN = ?",
    [username],
    async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.length === 0) {
        return res
          .status(401)
          .json({ message: "Username or password is incorrect" });
      }

      const hashedPassword = results[0].Password;
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (!passwordMatch) {
        return res
          .status(401)
          .json({ message: "Username or password is incorrect" });
      }
      const token = jwt.sign({ username,password }, process.env.JWT_SECRET);

      const userData = {
        USN: results[0].USN,
        Name: results[0].Name,
        token: token,
      };
      res.status(200).json({ message: "Login successful", userData });
    }
  );
};
exports.projectregister = (req, res) => {
  const { projectTitle } = req.body;
  const USN = req.user;
  console.log(USN);

  connection.query(
    "SELECT Project_ID FROM project WHERE Project_Name = ?",
    [projectTitle],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.length > 0) {
        const projectId = results[0].Project_ID;
        console.log(projectId);
        connection.query(
          "UPDATE student SET P_ID = ? WHERE USN = ?",
          [projectId, USN],
          (error) => {
            if (error) {
              console.error(error);
              return res.status(500).json({ error: "Internal Server Error" });
            }
            return res.status(200).json({ message: "Project ID assigned successfully" });
          }
        );
      } else {
        connection.query(
          "INSERT INTO project (Project_Name) VALUES (?)",
          [projectTitle],
          (error, results) => {
            if (error) {
              console.error(error);
              return res.status(500).json({ error: "Internal Server Error" });
            }
            
            const projectId = results.insertId;
            connection.query(
              "UPDATE student SET P_ID = ? WHERE USN = ?",
              [projectId, USN],
              (error) => {
                if (error) {
                  console.error(error);
                  return res.status(500).json({ error: "Internal Server Error" });
                }
                return res.status(200).json({ message: "Project registered and ID assigned successfully" });
              }
            );
          }
        );
      }
    }
  );
};


exports.grouplist = (req, res) => {
  console.log("Inside grouplist function");
  const sql =
    "SELECT project.Project_Name, student.USN, student.Name FROM student JOIN project ON student.P_ID = project.Project_ID GROUP BY project.Project_Name, student.P_ID, student.USN, student.Name;";

  connection.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    console.log("Retrieved data from the database:", data);
    res.json({ title: "group-List", userData: data });
  });
};

exports.projectlist = (req, res) => {
  console.log("Inside projectlist function");
  const sql = "select * from project";
  connection.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    console.log("Retrieved data from the database:", data);
    res.json({ title: "projects-List", userData: data });
  });
};

exports.studentlist = (req, res) => {
  const searchUSN = req.query.usn;
  const searchName = req.query.name;

  if (searchUSN || searchName) {
    const sql =
      "SELECT student.USN, student.Name AS Student_Name, student.Email, student.Phone_No, project.Project_Name, mentor.Name FROM student JOIN project ON student.P_ID = project.Project_ID JOIN mentor ON student.M_ID = mentor.Mentor_ID WHERE (student.USN LIKE ? OR student.Name LIKE ?) ORDER BY student.USN ASC";

    connection.query(
      sql,
      [`%${searchUSN}%`, `%${searchName}%`],
      (err, data) => {
        if (err) {
          console.error("Error searching data:", err);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }
        console.log("Search results:", data);

        res.json({ title: "Student List", userData: data });
      }
    );
  } else {
    const fullListSql =
      "SELECT student.USN, student.Name AS Student_Name, student.Email, student.Phone_No, project.Project_Name, mentor.Name FROM student JOIN project ON student.P_ID = project.Project_ID JOIN mentor ON student.M_ID = mentor.Mentor_ID ORDER BY student.USN ASC";

    connection.query(fullListSql, (err, data) => {
      if (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      console.log("Retrieved data from the database:", data);

      res.json({ title: "Student List", userData: data });
    });
  }
};
const sendemail = async (email) => {
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
};
