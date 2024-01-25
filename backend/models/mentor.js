const db = require("../db/connect");

exports.createMentorTable = () => {
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS mentor (
        M_ID varchar(10) PRIMARY KEY,
        Name varchar(10) not null ,
        Email varchar(10) not null,
        Phone  varchar(10) not null,
        Designation varchar(10) not null
      )
    `;

  db.query(createTableQuery, (err, results) => {
    if (err) {
      console.error("Error creating mentor_table:", err);
    } else {
      console.log("mentor created successfully");
    }
  });
};
