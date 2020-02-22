/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const mysql = require('mysql');

const pool = mysql.createPool({
  // connectionLimit: 100,
  port: '3306',
  host: '127.0.0.1',
  user: 'root',
  password: '1234567890',
  database: 'handdb',
  // debug: false,
  //  multipleStatements: true
});
// var sql = "SELECT * FROM USERS";

// var pool = mysql.createConnection({
//     host: "grubhubdb.ciea7s8xmtar.us-west-1.rds.amazonaws.com",
//     user: "root",
//     password: "password",
//     database: 'grubhub'
//   });


module.exports = pool;
