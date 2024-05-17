const db = require("../db/connect");

exports.createAdminTable = () => {
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS admin(
        username varchar(30) PRIMARY KEY,
        password varchar(200)
      )
    `;

  db.query(createTableQuery, (err, results) => {
    if (err) {
      console.error("Error creating admin_table:", err);
    } else {
      console.log("admin created successfully");
    }
  });
};