const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mentorTableModule = require("../models/mentor");
const projectTableModule = require("../models/project");
const studentTableModule = require("../models/student");
const multer = require("multer");
const fs = require("fs");
const path = require('path');

const nodemailer = require("nodemailer");
require("dotenv").config();
const connection = require("../db/connect");
const { log } = require("console");
const crypto = require("crypto");
const util = require('util');
const AWS = require('aws-sdk');
const multerS3 = require("multer-s3");
const { GetObjectCommand } = require('@aws-sdk/client-s3');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});



const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});


exports.adminlogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const results = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM admin WHERE username = ?",
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
      return res.status(401).json({ message: "Username or password is incorrect" });
    }

    const user = results[0];
    if (!user.password) {
      console.error("Password field is undefined for user:", username);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Username or password is incorrect" });
    }

    if (user.verified === 0) {
      return res.status(401).json({ message: "Account not verified. Please check your email for verification." });
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
exports.downloadFile = async (req, res) => {
  console.log("Inside downloadFile");

  let { filePath } = req.body; // Extract filePath from the request body
  console.log("File Path received:", filePath);

  if (!filePath) {
    return res.status(400).json({ msg: "File path is required." });
  }

  // Extract the key from the URL by removing the bucket domain
  const bucketUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`;
  
  // Ensure the filePath starts with the bucket URL, and extract the key
  if (filePath.startsWith(bucketUrl)) {
    filePath = filePath.replace(bucketUrl, ''); // Remove the URL part to get the key
  }

  // If filePath does not start with 'projects/', prepend it
  if (!filePath.startsWith("projects/")) {
    filePath = `projects/${filePath}`;
  }

  const bucketName = process.env.AWS_BUCKET_NAME; // S3 bucket name
  const fileName = path.basename(filePath); // Extract the file name from the path

  const downloadParams = {
    Bucket: bucketName,
    Key: filePath, // Use the corrected file path (key)
  };

  try {
    const { Body } = await s3.send(new GetObjectCommand(downloadParams));

    // Set headers to prompt file download
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Type", "application/octet-stream");

    // Pipe the file stream to the response
    Body.pipe(res);

    // Handle stream errors
    Body.on("error", (err) => {
      console.error("Error streaming file:", err);
      return res.status(500).json({ msg: "Error streaming the file", error: err });
    });
  } catch (err) {
    console.error("Error fetching file from S3:", err);
    return res.status(500).json({ msg: "Error downloading the file", error: err });
  }
};
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

  const { username, Name, password, confirmpassword, email} =
    req.body;

  try {

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


    await new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO student SET ?",
        {
          USN: username,
          Name: Name,
          Email: email,
          Password: hashedPassword,
          Team_ID: `${username}${Math.floor(Math.random() * 10)}`
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


      await new Promise((resolve,reject) =>{
        connection.query(
          "SELECT Team_ID from student WHERE USN=?",[capusn],(error, results) => {
            if (error) {
              console.error(error);
              reject(error);
            } else {
              console.log(results[0].Team_ID);
              
            connection.query(
              "INSERT INTO student SET ?",
              {
                USN: usn,
                Name: name,
                Email: email,
                Team_ID: results[0].Team_ID,
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
              resolve();
            }

            
        
          })
      })
      // Insert teammate record into the database
      

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
exports.newproject = (req, res) => {
  const { projectName, domain } = req.body;
  
  if (!projectName || !domain) {
    return res.status(400).json({ error: "Project name and domain are required" });
  }

  const query = `
    INSERT INTO project (Project_Name, Phase_Status, Project_Marks, File_Path, Project_Phase, domain) 
    VALUES (?, 'Pending', 0, NULL, 1, ?)
  `;

  connection.query(query, [projectName, domain], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(201).json({ message: "Project created successfully", projectId: results.insertId });
  });
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

  const query = `SELECT Team_ID FROM student WHERE USN = "${usn}"`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length > 0) {
      const teamId = results[0].Team_ID;
      console.log(teamId);
      const studentsQuery = `SELECT USN, Name FROM student WHERE Team_ID = "${teamId}"`;

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

    if (results.length > 0 && results[0].M_ID) {
      const mentorId = results[0].M_ID;
      console.log(mentorId);
      const studentsQuery = `SELECT Mentor_ID, Name, Designation, Phone, Email FROM mentor WHERE Mentor_ID = "${mentorId}"`;

      connection.query(studentsQuery, (error, studentResults) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(200).json({ students: studentResults });
      });
    } else {
      res.status(200).json({ message: "Project not assigned to mentor currently" });
    }
  });
};
exports.adminstudentlist = (req, res) => {
  const query = `
    SELECT USN, Name, Email, P_ID, Team_ID,M_ID
    FROM student 
    ORDER BY P_ID`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(200).json(results);
  });
};


exports.uploadphase = (req, res) => {
  const usn = req.user;
  console.log('Hello ');
  
  console.log("USN:", usn);

  const getPID = "SELECT P_ID from student S where S.USN=?";
  connection.query(getPID, [usn], (err, data) => {
    if (err || !data.length) {
      console.log("Error retrieving Project ID:", err);
      return res.status(500).json({ msg: "Internal server error" });
    }

    const PID = data[0].P_ID;

    // Set up multer S3 storage
    const upload = multer({
      storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME, // Bucket name
        metadata: (req, file, cb) => {
          cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
          const fileName = `projects/${file.originalname}`;
          cb(null, fileName); // File path within the bucket
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
    }).single("document");

    // Handle file upload
    upload(req, res, (err) => {
      if (err) {
        console.log("Error during upload:", err);
        return res.status(500).send("Invalid document");
      }

      const uploadedFile = req.file;
      console.log("Uploaded File:", uploadedFile);

      const filePath = uploadedFile.location; // S3 file URL
      console.log("S3 File Path:", filePath);

      const updateProjectFile = `
        UPDATE project 
        SET Phase_Status='uploaded', File_Path=? 
        WHERE Project_ID=?
      `;

      connection.query(updateProjectFile, [filePath, PID], (err) => {
        if (err) {
          console.log("Can't update file into project:", err);
          return res.status(500).json({ msg: "Internal server error", err });
        }

        console.log("Successful file upload and database update");
        return res.status(200).json({ msg: "Updated record in project" });
      });
    });
  });
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

exports.adminprojectlist = (req,res) =>{

  // SQL query to select projects associated with the mentor's ID
  const sql =
    "SELECT * FROM project";

  // Execute the SQL query
  connection.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    console.log("Retrieved data from the database:", data);
    res.json({ title: "projects-List", userData: data });
  });
}
exports.adminmentorlist = (req,res) =>{

  // SQL query to select projects associated with the mentor's ID
  const sql =
    "SELECT Mentor_ID,Name,Designation,Phone,Email,Phone FROM  mentor";

  // Execute the SQL query
  connection.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    console.log("Retrieved data from the database:", data);
    res.json({ title: "mentor-List", userData: data });
  });
}
exports.assign = (req, res) => {
  const { mid , pid, Team_ID} = req.body;
  console.log(req.body);
  const sql = `UPDATE student SET M_ID= "${mid}" , P_ID = ${pid} WHERE Team_ID="${Team_ID}" `;
  connection.query(sql, (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    res.status(200).json({ message: "Mentor and project assigned successfully" });
  });
};
exports.mentoroption = (req,res) => {
  const sql = "SELECT Mentor_ID, Name FROM mentor";

  // Execute the SQL query
  connection.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    console.log("Retrieved data from the database:", data);
    res.json({ title: "mentor-List", mentorData: data });
  });

}
exports.teamoption = (req, res) => {
  const sql = "SELECT DISTINCT Team_ID FROM student";

  // Execute the SQL query
  connection.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    console.log("Retrieved data from the database:", data);
    res.json({ title: "team-List", teamData: data });
  });
}

exports.projectoption = (req,res) =>{
  const sql = "SELECT Project_ID, Project_Name FROM project";

  // Execute the SQL query
  connection.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    console.log("Retrieved data from the database:", data);
    res.json({ title: "project-List", mentorData: data });
  });

}
exports.adminregister = async (req, res) => {
  const { username, password, confirmpassword } = req.body;

  if (password !== confirmpassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  const verificationToken = crypto.randomBytes(20).toString('hex');

  try {
    const existingUser = await util.promisify(connection.query).call(
      connection,
      'SELECT username FROM admin WHERE username = ?',
      [username]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'That username is already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    await util.promisify(connection.query).call(
      connection,
      'INSERT INTO admin SET ?',
      {
        username,
        password: hashedPassword,
        verificationtoken: verificationToken,
        verified: 0
      }
    );

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SECRET_EMAIL,
        pass: process.env.SECRET_PASS
      }
    });

    const mailOptions = {
      from: process.env.SECRET_EMAIL,
      to: username,
      subject: 'Admin Account Verification',
      html: `<p>Please verify your account by clicking the link below:</p>
             <a href="https://main.d3od0hvcknqa8u.amplifyapp.com/verify-admin?token=${verificationToken}">Verify Account</a>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to send verification email' });
      }
      res.status(200).json({ message: 'Admin registered, check your email for verification' });
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.verifyAdmin = async (req, res) => {
  console.log(req.query);
  const { token } = req.query;
  console.log(token);
  console.log("inside verify");
  try {
    const result = await util.promisify(connection.query).call(
      connection,
      'SELECT * FROM admin WHERE verificationtoken = ?',
      [token]
    );

    if (result.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    await util.promisify(connection.query).call(
      connection,
      'UPDATE admin SET verified = 1, verificationtoken = NULL WHERE verificationtoken = ?',
      [token]
    );

    res.status(200).json({ message: 'Account verified successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
