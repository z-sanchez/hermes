const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser"); //parses body for api data sent
const cors = require("cors"); //fixes errors with axios api sending

app.use(cors()); //uses cors
app.use(express.json()); //uses express to interpret json data from api
app.use(bodyParser.urlencoded({ extended: true })); //body parser is used

const db = mysql.createConnection({
  //creates connection
  host: "localhost",
  user: "newUser",
  password: "password",
  database: "masterlist", //need to create database using XAMMP and
                          // allow settings access for host and user
});



app.listen(3301, () => {
  //puts server at specific port
  console.log("running on port 3301");
});

db.connect(function (err) {
  //verifies connection
  if (err) throw err;
  console.log("You are now connected...");
});


