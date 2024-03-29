const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mentorTableModule = require("../models/mentor");
const projectTableModule = require("../models/project");
const studentTableModule = require("../models/student");
const multer = require("multer");
const fs = require("fs");
const nodemailer = require("nodemailer");
require("dotenv").config();
const connection = require("../db/connect");
const { log } = require("console");
exports.mentorregister = async (req, res) => {
  console.log(req.body);
  mentorTableModule.createMentorTable();
  const {
    username,
    password,
    confirmpassword,
    Name,
    email,
    phone,
    designation,
  } = req.body;
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
          {
            Mentor_ID: username,
            Name: Name,
            Email: email,
            Phone: phone,
            Designation: designation,
            Password: hashedPassword,
          },
          async (error, results) => {
            if (error) {
              console.log(error);
              return res.status(500).json({ error: "Internal Server Error" });
            } else {
              console.log(results);
              const token = jwt.sign(
                { username, password },
                process.env.JWT_SECRET
              );
              const userData = {
                username: username,
                email: email,
                token: token,
              };
              return res
                .status(200)
                .json({ message: "Mentor registered", userData });
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
//pending
exports.searchdomain = (req, res) => {
  const { domain } = req.body;

  try {
    connection.query(
      "SELECT Project_ID, Project_Name, Phase_Status, Project_Marks, File_Path, Project_Phase FROM project WHERE domain LIKE ?",
      [`%${domain}%`],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.status(200).json({ projects: results });
      }
    );
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

  const { username, Name, password, confirmpassword, email, mentorName } =
    req.body;

  try {
    const mentor = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT Mentor_ID FROM mentor WHERE Name = ?",
        [mentorName],
        (error, results) => {
          if (error) {
            reject(error);
            console.log(error);
          } else {
            resolve(results[0]);
          }
        }
      );
    });

    if (!mentor) {
      return res.status(400).json({ message: "Mentor not found" });
    }
    const M_ID = mentor.Mentor_ID;

    const existingUser = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT USN FROM student WHERE USN = ?",
        [username],
        (error, results) => {
          if (error) {
            console.log(error);
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
    console.log(M_ID);

    const totalProjects = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) AS totalProjects FROM project",
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0].totalProjects);
          }
        }
      );
    });
    console.log(totalProjects);
    const nextProjectID = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT MAX(P_ID) AS maxProjectID FROM student",
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            console.log(results[0].maxProjectID);
            resolve((results[0].maxProjectID % totalProjects) + 1);
          }
        }
      );
    });

    await new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO student SET ?",
        {
          USN: username,
          Name: Name,
          Email: email,
          Password: hashedPassword,
          P_ID: nextProjectID,
          M_ID: M_ID,
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

    const token = jwt.sign({ username, password }, process.env.JWT_SECRET);
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
exports.mentorlist = (req, res) => {
  try {
    connection.query("SELECT * FROM mentor", (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      const mentorNames = [];
      for (let i = 0; i < results.length; i++) {
        mentorNames.push(results[i].Name);
      }
      console.log(mentorNames);
      return res.status(200).json({ mentorNames });
    });
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
      const token = jwt.sign({ username, password }, process.env.JWT_SECRET);

      const userData = {
        USN: results[0].USN,
        Name: results[0].Name,
        token: token,
      };
      res.status(200).json({ message: "Login successful", userData });
    }
  );
};
//pending
exports.teamregister = async (req, res) => {
  const capusn = req.user;
  console.log(capusn);

  const { teammates } = req.body;

  try {
    // Retrieve captain's details from the database
    const captainDetails = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT P_ID, M_ID, Password FROM student WHERE USN = ?",
        [capusn],
        (error, results) => {
          if (error) {
            console.error(error);
            reject(error);
          } else {
            resolve(results[0]);
          }
        }
      );
    });

    if (!captainDetails) {
      return res.status(400).json({ message: "Captain not found" });
    }

    // Extract captain's project ID (P_ID), mentor ID (M_ID), and password
    const { P_ID, M_ID, Password } = captainDetails;

    // Insert teammate records into the database
    for (const teammate of teammates) {
      const { usn, name, email } = teammate;

      // Insert teammate record into the database
      await new Promise((resolve, reject) => {
        connection.query(
          "INSERT INTO student SET ?",
          {
            USN: usn,
            Name: name,
            Email: email,
            Password: Password, // Use captain's password for teammates
            P_ID: P_ID, // Use captain's project ID for teammates
            M_ID: M_ID, // Use captain's mentor ID for teammates
          },
          (error, results) => {
            if (error) {
              console.error(error);
              reject(error);
            } else {
              console.log(results);
              resolve();
            }
          }
        );
      });

      console.log(`Teammate ${name} registered successfully`);
    }

    return res
      .status(200)
      .json({ message: "Teammates registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.grouplist = (req, res) => {
  const ID = req.user;
  console.log("Inside grouplist function");
  const sql =
    "SELECT project.Project_Name, student.USN, student.Name FROM student JOIN project ON student.P_ID = project.Project_ID WHERE student.M_ID = ? GROUP BY project.Project_Name, student.P_ID, student.USN, student.Name;";

  connection.query(sql, [ID], (err, data) => {
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
  // Extract the mentor ID from req.user
  const mentorId = req.user;

  console.log("Inside projectlist function");

  // SQL query to select projects associated with the mentor's ID
  const sql =
    "SELECT * FROM project WHERE Project_ID IN (SELECT P_ID FROM student WHERE M_ID = ?)";

  // Execute the SQL query
  connection.query(sql, [mentorId], (err, data) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    console.log("Retrieved data from the database:", data);
    res.json({ title: "projects-List", userData: data });
  });
};

exports.studentproject = (req, res) => {
  const usn = req.user;
  console.log(usn);
  const sql =
    "SELECT p.Project_ID, p.Project_Name, p.Project_Phase, p.Phase_Status,p.File_Path, p.Project_Marks FROM project p, student s WHERE s.P_ID = p.Project_ID AND s.USN = ?";
  connection.query(sql, [usn], (err, data) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    console.log("Retrieved data from the database:", data);
    res.json({ title: "student-project", userData: data });
  });
};

exports.studentteam = (req, res) => {
  const usn = req.user;
  console.log(usn);

  const query = `SELECT P_ID FROM student WHERE USN = "${usn}"`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length > 0) {
      const projectId = results[0].P_ID;
      console.log(projectId);
      const studentsQuery = `SELECT USN,Name FROM student WHERE P_ID = ${projectId}`;

      connection.query(studentsQuery, (error, studentResults) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(200).json({ students: studentResults });
      });
    }
  });
};
//pending
exports.mentormentor = (req, res) => {
  const mid = req.user;
  console.log(mid);
  const mentorQuery = `SELECT Mentor_ID,NAME,Email,Phone,Designation FROM mentor WHERE Mentor_ID = '${mid}'`;

  connection.query(mentorQuery, (error, Results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(200).json({ mentor: Results });
  });
};
//pending
exports.studentmentor = (req, res) => {
  const usn = req.user;
  console.log(usn);

  const query = `SELECT M_ID FROM student WHERE USN = "${usn}"`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length > 0) {
      const mentorId = results[0].M_ID;
      console.log(mentorId);
      const studentsQuery = `SELECT Mentor_ID,Name,Designation,Phone,Email FROM mentor WHERE Mentor_ID ="${mentorId}"`;

      connection.query(studentsQuery, (error, studentResults) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(200).json({ students: studentResults });
      });
    }
  });
};

exports.uploadphase = (req, res) => {
  const usn = req.user;

  console.log(usn);

  const getPID = "SELECT P_ID from student S where S.USN=?";
  connection.query(getPID, [usn], (err, data) => {
    if (data) {
      const PID = data[0].P_ID;
      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          const uploadDir = "C:/uploadsRishi/";

          // Check if the directory exists
          if (!fs.existsSync(uploadDir)) {
            // If not, create the directory
            fs.mkdirSync(uploadDir);
          }

          cb(null, uploadDir);
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname); // Specify how the uploaded files will be named
        },
      });

      const upload = multer({ storage: storage });

      upload.single("document")(req, res, async function (err) {
        if (err) {
          return res.status(500).send("invalid document");
        }

        const uploadedFile = await req.file;
        console.log(uploadedFile);

        const path = uploadedFile.destination + uploadedFile.filename;
        console.log(path);
        const updateProjectFile = `UPDATE project SET Phase_Status='uploaded', File_Path='${path}' WHERE project.Project_ID=${PID}`;

        connection.query(updateProjectFile, (err, data) => {
          if (err) {
            console.log("Cant update file into project");

            return res.status(500).json({ msg: "Internal server error", err });
          } else {
            console.log("successful updation of file into project");
            return res.status(200).json({ msg: "updated record in project" });
          }
        });
      });
    } else {
      console.log("Internal server error");
      return res.status(500).json({ msg: "Internal server error" });
    }
  });
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
    subject: "Registration Confirmation",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Registration Confirmation</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: auto;
                  padding: 20px;
                  border: 1px solid #ccc;
                  border-radius: 5px;
              }
              h2 {
                  color: #333;
              }
              p {
                  color: #666;
                  line-height: 1.6;
              }
              .footer {
                  margin-top: 20px;
                  text-align: center;
                  color: #999;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h2>Registration Confirmation</h2>
              <p>Dear Student,</p>
              <p>Thank you for registering with us. We appreciate your interest and look forward to having you as a part of our community.</p>
              <div class="footer">
                  <p>Best regards,<br>RNSIT</p>
              </div>
          </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailSuperAdmin);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Failed to send registration confirmation email.");
  }
};

exports.acceptProject = (req, res) => {
  const { pid } = req.body;
  console.log(pid);
  const acceptedQuery = `
  UPDATE project 
  SET 
    Project_Phase = CASE 
                      WHEN Project_Phase < 4 THEN Project_Phase + 1 
                      ELSE Project_Phase 
                    END,
    Phase_Status = CASE 
                      WHEN Project_Phase < 4 THEN 'Pending'
                      WHEN Project_Phase = 4 THEN 'Completed'
                      ELSE Phase_Status  
                    END,
    File_Path = CASE 
                  WHEN Project_Phase < 4 THEN NULL 
                  ELSE File_Path 
                END,
    Project_Marks = CASE 
                      WHEN Project_Marks<100 THEN Project_Marks + 25 
                      ELSE Project_Marks 
                    END
  WHERE Project_ID = ${pid}
  `;

  try {
    connection.query(acceptedQuery, (err, data) => {
      if (err) {
        console.log("Cant update into project");
        res.status(500).json({ msg: "Internal server error" });
      } else {
        console.log("Updated project");
        res.status(400).json({ msg: "Project updation Done" });
      }
    });
  } catch (error) {
    console.log("Internal error");
    res.status(500).json({ msg: "Internal server error" });
  }
};
exports.rejectProject = (req, res) => {
  const { pid } = req.body;
  console.log(pid);
  const rejectedQuery = `UPDATE project SET Phase_Status = 'Rejected re-upload' WHERE Project_ID = ${pid}`;

  try {
    connection.query(rejectedQuery, (err, data) => {
      if (err) {
        console.log("Can't update project");
        console.log(err);
        res.status(500).json({ msg: "Internal server error" });
      } else {
        console.log("Project rejected");
        res.status(400).json({ msg: "Project rejection done" });
      }
    });
  } catch (error) {
    console.log("Internal error");
    res.status(500).json({ msg: "Internal server error" });
  }
};
