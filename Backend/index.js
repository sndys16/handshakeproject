/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
// import the require dependencies
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
const pool = require('./source/dbconnect/pool');

app.set('view engine', 'ejs');


// use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));

// use express session to maintain session data
app.use(session({
  secret: 'cmpe273_kafka_passport_mongo',
  resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration: 5 * 60 * 1000,
}));

// app.use(bodyParser.urlencoded({
//     extended: true
// }));


// Allow Access Control
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

const port = process.env.PORT || 3000;
// const rooturl = "http://ec2-54-183-51-217.us-west-1.compute.amazonaws.com:3000";
// const multer = require('multer');


// const cookieParser = require('cookie-parser');

// const sql = 'SELECT * FROM students';
// pool.query('select * from student', (err, output) => {
//   if (err) {
//     throw err;
//   } else {
//     console.log(output);
//     console.log('Database connection established');
//   }
// });


// Routes
const student = require('./source/routes/student');
const company = require('./source/routes/company');


app.use(express.static('public'));
const basePath = '/';
const studentPath = '/student';
const companyPath = '/company';
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(studentPath, student);
app.use(companyPath, company);
app.use('/uploads', express.static(path.join(__dirname, '/uploads/')));


app.listen(port);
console.log(`Server Listening on port ${port}`);
