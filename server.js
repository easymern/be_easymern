const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const routes = require("./app/routes")

const DEFAULT_PORT = 8080

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || DEFAULT_PORT;

// Define middleware here
const urlencodedParser =bodyParser.urlencoded({extended: false}); // was true?
app.use(bodyParser.json(), urlencodedParser);

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

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my stack" });
});

// routes
app.use(routes);
// require("./app/routes/auth.routes")


app.post("/home", (req, res) => {
  console.log(req.body)
})

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
  console.log("coolio");
});