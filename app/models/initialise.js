const db = require("../models");
// Use this file to load any intial data your database requires.
// Copy and paste the function below, modify it to suit.
// Runs at base of server.js

// Import database parameters
const Role = db.Role;
const roles = db.ROLES;

const initialRole = () => {
  // Check the database is empty.
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      // Loop through each role provided in models/index.js
      roles.forEach(
        role => {
          // Add new role to database, save and exit.
          new Role({
            name: role.toLowerCase(),
          }).save(err => {
            if (err) {
              console.log("error: ", err);
            }
            console.log(`added ${role.toLowerCase()} to User Roles collection.`)
          })
        }
      )
    }
  })
}

module.exports = {
  initialRole,
};