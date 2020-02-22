/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const pool = require('../dbconnect/pool');

const router = express.Router();
// var encrypt = require('../helpers/passwordEncryption');

router.route('/studentsignup').post((req, res) => {
  console.log('signup student');
  console.log(JSON.stringify(req.body));
  console.log(JSON.stringify(req.headers));
  // const signupData = {
  //  name: req.body.name,
  //  mail: req.body.mail,
  //  password: req.body.password,
  //   collegename: req.body.collegename,
  // };
  const insertstudent = 'insert into student (name,mail,password,collegename) VALUES (?, ?, ?,?)';
  pool.query(insertstudent, [req.body.name, req.body.mail,
    req.body.password, req.body.collegename],
  (err, result) => {
    if (err) {
      console.log(err);
      res.status(401).json({ responseMessage: 'student mailid  already exists' });
    } else {
      console.log('student added to database');
      res.status(200).json({ message: 'student SignUp successful' });
    }
  });
}, (err) => {
  console.log(err);
  res.status(401).send({ responseMessage: 'Error Occurred' });
});
router.route('/studentsignin').post((req, res) => {
  console.log('login student');
  const loginData = {
    mail: req.body.mail,
    password: req.body.password,
  };
  const studentregistercheck = 'select password from student where mail=?';
  pool.query(studentregistercheck, [loginData.mail], (err, result) => {
    if (err) {
      console.log('Error occurred.');
    } else if (result.length > 0) {
      if (result === loginData.password) {
        console.log('student login successful');
        res.status(200).send({ message: 'student login successful' });
      } else {
        console.log('wrong password');
        res.status(401).send({ message: 'incorrect password' });
      }
    } else {
      console.log('wrong password');
      res.status(401).send({ message: 'incorrect password' });
    }
  });
}, (err) => {
  console.log(err);
  res.status(401).send({ responseMessage: 'Error Occurred' });
});

router.route('/GetStudentProfile').post((req, res) => {
  console.log('Inside student profile details');

  var studentid = req.body.studentid;

  const studentprofile = 'select * From  ((student INNERJOIN educationdetails ON (student.studentid = educationdetails.studentid)) INNERJOIN experiencedetails ON student.studentid = experiencedetails.studentid) INNERJOIN skillset on student.studentid = skillset.studentid';

  pool.query(studentprofile, [username], (err, result) => {
    if (err) {
      console.log('Error with database');
      res.status(400).json({ responseMessage: 'Error Occurred' });
    } else if (result.length > 0) {
      res.status(200).send(result);
    } else {
      console.log('student does not exist');
      res.status(400).send('student does not exist');
    }
  });
});

router.route('/updateeducationdetails').post((req, res) => {
  console.log('in update education details');
  var updatestudentdata = {
    collegename: req.body.collegename,
    location: req.body.location,
    degree: req.body.degree,
    major: req.body.major,
    yearofpassing: req.body.yearofpassing,
    currentcgpa: req.body.currentcgpa,
    studentid: req.body.studentid,
  };

  var updateeducationdetails = 'UPDATE educationdetails SET collegename = ?, location = ?, degree = ?, major = ?,yearofpassing= ?,currentcgpa= ?  WHERE (studentid = ?)';
  pool.query(updateeducationdetails, [updatestudentdata.collegename, updatestudentdata.location, updatestudentdata.degree,
    updatestudentdata.major, updatestudentdata.yearofpassing, updatestudentdata.currentcgpa, updatestudentdata.studentid], (err, result) => {
    if (err) {
      console.log('Error occurred.');
      res.status(400).json({ responseMessage: 'Error Occurred' });
    } else {
      console.log('student education details Updated');
      res.status(200).json({ responseMessage: 'student education details Updated' });
    }
  });
});

router.route('/updateeducationdetails').post((req, res) => {
  console.log('in update education details');
  var updatestudentdata = {
    companyname: req.body.companyname,
    title: req.body.title,
    location: req.body.location,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    workdescription: req.body.workdescription,
    studentid: req.body.studentid,
  };

  var updateexperiencedetails = 'UPDATE experiencedetails SET companyname = ?, title = ?, location = ?,startdate = ?, enddate= ?, workdescription= ?  WHERE (studentid = ?)';
  pool.query(updateexperiencedetails, [updatestudentdata.companyname, updatestudentdata.title, updatestudentdata.location, updatestudentdata.startdate,
    updatestudentdata.enddate, updatestudentdata.workdescription, updatestudentdata.studentid], (err, result) => {
    if (err) {
      console.log('Error occurred.');
      res.status(400).json({ responseMessage: 'Error Occurred' });
    } else {
      console.log('student experience details Updated');
      res.status(200).json({ responseMessage: 'student experience details Updated' });
    }
  });
});


router.route('/updatebasicdetails').post((req, res) => {
  console.log('in update basic details');
  var updatestudentdata = {
    name: req.body.companyname,
    dateofbirth: req.body.title,
    city: req.body.location,
    state: req.body.startdate,
    country: req.body.enddate,
    studentid: req.body.studentid,
  };

  var updatebasicdetails = 'UPDATE student SET name = ?, dateofbirth = ?, city = ?, state = ?, country= ?  WHERE (studentid = ?)';
  pool.query(updatebasicdetails, [updatestudentdata.name, updatestudentdata.dateofbirth, updatestudentdata.city, updatestudentdata.state,
    updatestudentdata.country, updatestudentdata.studentid], (err, result) => {
    if (err) {
      console.log('Error occurred.');
      res.status(400).json({ responseMessage: 'Error Occurred' });
    } else {
      console.log('student basic details Updated');
      res.status(200).json({ responseMessage: 'student basic details Updated' });
    }
  });
});
router.route('/updatecareerobjective').post((req, res) => {
  console.log('in update career objective');
  var updatestudentdata = {
    careerobjective: req.body.careerobjective,
    studentid: req.body.studentid,
  };

  var updatebasicdetails = 'UPDATE student SET careerobjective = ?  WHERE (studentid = ?)';
  pool.query(updatebasicdetails, [updatestudentdata.careerobjective, updatestudentdata.studentid], (err, result) => {
    if (err) {
      console.log('Error occurred.');
      res.status(400).json({ responseMessage: 'Error Occurred' });
    } else {
      console.log('student career objective Updated');
      res.status(200).json({ responseMessage: 'student career objective Updated' });
    }
  });
});

router.route('/updatecontactinformation').post((req, res) => {
  console.log('in update contact information');
  var updatestudentdata = {
    mail: req.body.careerobjective,
    phonenumber: req.body.phonenumber,
    studentid: req.body.studentid,
  };

  var updatecontactinformation = 'UPDATE student SET mail = ? ,phonenumber= ?  WHERE (studentid = ?)';
  pool.query(updatecontactinformation, [updatestudentdata.mail, pdatestudentdata.phonenumber, updatestudentdata.studentid], (err, result) => {
    if (err) {
      console.log('Error occurred.');
      res.status(400).json({ responseMessage: 'Error Occurred' });
    } else {
      console.log('student career objective Updated');
      res.status(200).json({ responseMessage: 'student career objective Updated' });
    }
  });
});

router.route('/updateskillset').post((req, res) => {
  console.log('in update skillset');
  var updatestudentdata = {
    skills: req.body.skills,
    studentid: req.body.studentid,
  };

  var updateskillset = 'UPDATE student SET skills = ?  WHERE (studentid = ?)';
  pool.query(updateskillset, [updatestudentdata.skills, updatestudentdata.studentid], (err, result) => {
    if (err) {
      console.log('Error occurred.');
      res.status(400).json({ responseMessage: 'Error Occurred' });
    } else {
      console.log('student skillset Updated');
      res.status(200).json({ responseMessage: 'student skillset Updated' });
    }
  });
});
module.exports = router;
