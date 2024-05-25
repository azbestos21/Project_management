const db = require("../db/connect");

exports.createStudentTable = () => {
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS student (
    USN VARCHAR(10) NOT NULL PRIMARY KEY,
    Name VARCHAR(40) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Password VARCHAR(200) NOT NULL,
    P_ID VARCHAR(20),
    M_ID VARCHAR(10),
    Team_ID INT,
    FOREIGN KEY (P_ID) REFERENCES project (Project_ID),
    FOREIGN KEY (M_ID) REFERENCES mentor (Mentor_ID)
)
    `;

  db.query(createTableQuery, (err, results) => {
    if (err) {
      console.error("Error creating student_table:", err);
    } else {
      console.log("student created successfully");
    }
  });
};
