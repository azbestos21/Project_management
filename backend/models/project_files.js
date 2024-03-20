const db = require("../db/connect");

exports.createProjectfilesTable = () => {
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS project_files (
    File_Path VARCHAR(30) NOT NULL PRIMARY KEY,
    P_ID int,
    FOREIGN KEY (P_ID) REFERENCES project (Project_ID)
);


    `;

  db.query(createTableQuery, (err, results) => {
    if (err) {
      console.error("Error creating projectfiles_table:", err);
    } else {
      console.log("projectfiles created successfully");
    }
  });
};
