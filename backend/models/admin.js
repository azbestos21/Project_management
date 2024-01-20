const db = require("../db/connect");

exports.createAdminTable = () => {
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS admin_table (
        Username varchar(20) PRIMARY KEY,
        Password varchar(200) not null  
      )
    `;

  db.query(createTableQuery, (err, results) => {
    if (err) {
      console.error("Error creating text_table:", err);
    } else {
      console.log("admin created successfully");
    }
  });
};