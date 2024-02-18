const db = require("../db/connect");

exports.createProjectTable = () => {
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS project (
    Project_ID INT AUTO_INCREMENT PRIMARY KEY,
    Project_Name VARCHAR(20) NOT NULL,
    Project_Phase VARCHAR(10) NOT NULL,
    Phase_Status VARCHAR(10) NOT NULL,
    Project_Marks INT
)

    `;

  db.query(createTableQuery, (err, results) => {
    if (err) {
      console.error("Error creating project_table:", err);
    } else {
      console.log("project created successfully");
    }
  });
};
