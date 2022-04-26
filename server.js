const express = require("express");
// const mongoose = require("mongoose");
const routes = require("./app/routes");
const cors = require("cors");

const DEFAULT_PORT = 8080

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const PORT = process.env.PORT || DEFAULT_PORT;

const corsOptions = {
  origin: `http://localhost:${PORT}`
}

// Define middleware here
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to mongoDB
const db = require("./app/models");
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/${process.env.DB_DATABASE}?retryWrites=true&w=majority`

db.mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    // initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// TODO (check this) Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// routes
app.use(routes);

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});


// function initial() {
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       new Role({
//         name: "user"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }
//
//         console.log("added 'mod_user' to roles collection");
//       });
//
//       new Role({
//         name: "moderator"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }
//
//         console.log("added 'moderator' to roles collection");
//       });
//
//       new Role({
//         name: "admin"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }
//
//         console.log("added 'admin' to roles collection");
//       });
//     }
//   });
// }
