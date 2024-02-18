const db = require("../db/connect");

exports.createMentorTable = () => {
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS mentor (
        Mentor_ID varchar(10) PRIMARY KEY,
        Name varchar(20) not null ,
        Email varchar(40) not null,
        Phone  varchar(20) not null,
        Designation varchar(20) not null,
        Password varchar(200) not null
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
