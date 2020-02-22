/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const pool = require('../dbconnect/pool');

const router = express.Router();


router.route('/companysignup').post((req, res) => {
  console.log('signup company');
  const signupData = {
    name: req.body.name,
    mail: req.body.mail,
    password: req.body.password,
    location: req.body.location,
  };
  const insertstudent = 'insert into company (name,mail,password,location) VALUES (?, ?, ?,?)';
  pool.query(insertstudent, [signupData.name, signupData.mail,
    signupData.password, signupData.location],
  (err, result) => {
    if (err) {
      console.log(err);
      res.status(401).send({ responseMessage: 'Signup Failed' });
    } else {
      console.log('company added to database');
      res.status(200).send({ message: 'company SignUp successful' });
    }
  });
}, (err) => {
  console.log(err);
  res.status(401).send({ responseMessage: 'Error Occurred' });
});

router.route('/companysignin').post((req, res) => {
  console.log('login company');
  const loginData = {
    mail: req.body.mail,
    password: req.body.password,
  };
  const companyregistercheck = 'select password from company where mail=?';
  pool.query(companyregistercheck, [req.body.mail], (err, result) => {
    if (err) {
      console.log('Error occurred.');
    } else if (result.length > 0) {
      console.log(req.body.password);
      console.log(result);
      if (result[0].password === req.body.password) {
        console.log('company login successful');
        res.status(200).send({ message: 'company login successful' });
      } else {
        console.log('wrong password');
        res.status(401).send({ message: 'incorrect password' });
      }
    } else {
      console.log('wrong hi password');
      res.status(401).send({ message: 'incorrect password' });
    }
  });
}, (err) => {
  console.log(err);
  res.status(401).send({ responseMessage: 'Error Occurred' });
});

router.route('/addjobpost').post((req, res) => {
  console.log('inside add job post');
  const jobdata = {
    companyid: req.body.id,
    title: req.body.name,
    postingdate: req.body.mail,
    applicationdeadline: req.body.password,
    location: req.body.collegename,
    salary: req.body.salary,
    jobdescription: req.body.jobdescription,
    jobcategory: req.body.jobcategory,
  };
  const insertjob = 'insert into jobdetails (companyid,title,postingdate,applicationdeadline,location,salary,jobdescription,jobcategory) VALUES (?, ?, ?,?,?,?,?)';
  pool.query(insertstudent, [jobdata.companyid, jobdata.title, jobdata.postingdata,
    jobdata.applicationdeadline, jobdata.location,
    jobdata.salary, jobdata.jobdescription,
    jobdata.jobcategory],
  (err, result) => {
    if (err) {
      console.log('Error occurred.');
      res.status(401).send({ responseMessage: 'error occured' });
    } else {
      console.log('job added to database');
      res.status(200).send({ message: 'job added successful' });
    }
  });
});
router.route('/getalljobs').post((req, res) => {
  console.log('Inside get all jobs ');

  const getalljobs = 'select * From  jobdetails where  jobdetails.companyid=?';
  pool.query(getalljobs, [req.body.companyid], (err, result) => {
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
router.route('/getappliedjobstudents').post((req, res) => {
  console.log('Inside applied job students');

  const getalljobs = 'select student.name  from student INNERJOIN application on (student.studentid=application.studentid) where application.companyid=?';
  pool.query(getalljobs, [req.body.companyid], (err, result) => {
    if (err) {
      console.log('Error with database');
      res.status(400).json({ responseMessage: 'Error Occurred' });
    } else {
      res.status(200).send(result);
    }
  });
});

router.route('/updateapplicationstatus').post((req, res) => {
  console.log('in update application status details');
  const updatestudentdata = {
    applicationstatus: req.body.companyname,
    studentid: req.body.studentid,
  };
  const updateappplicationstatus = 'UPDATE application SET applicationstatus = ?, WHERE (studentid = ?)';
  pool.query(updateapplicationstatus, [updatestudentdata.applicationstatus,
    updatestudentdata.studentid], (err, result) => {
    if (err) {
      console.log('Error occurred.');
      res.status(400).json({ responseMessage: 'Error Occurred' });
    } else {
      console.log('application status  Updated');
      res.status(200).json({ responseMessage: 'application status  Updated' });
    }
  });
});

router.route('/updatecompanyprofile').post((req, res) => {
  console.log('in update company details');
  const updatecompanydata = {
    name: req.body.name,
    location: req.body.location,
    description: req.body.description,
    mail: req.body.mail,
    phonenumber: req.body.phonenumber,
    companyid: req.body.companyid,
  };

  const updatecompanydetails = 'UPDATE company SET name = ?, location = ?,description= ?,mail = ?, phonenumber= ?,  WHERE (company.companyid = ?)';
  pool.query(updatecompanydetails, [updatecompanydata.name,
    updatecompanydata.location, updatecompanydata.description,
    updatecompanydata.mail, updatecompanydata.phonenumber,
    updatecompanydata.companyid], (err, result) => {
    if (err) {
      console.log('Error occurred.');
      res.status(400).json({ responseMessage: 'Error Occurred' });
    } else {
      console.log('company details Updated');
      res.status(200).json({ responseMessage: 'company details Updated' });
    }
  });
});
router.route('/updatecompanycontactinfo').post((req, res) => {
  console.log('in update company contact info details');
  const updatecompanydata = {
    mail: req.body.mail,
    phonenumber: req.body.phonenumber,
    companyid: req.body.companyid,
  };

  const updatecompanydetails = 'UPDATE company SET mail = ?, phonenumber= ?,  WHERE (company.companyid = ?)';
  pool.query(updatecompanydetails, [updatecompanydata.mail, updatecompanydata.phonenumber,
    updatecompanydata.companyid], (err, result) => {
    if (err) {
      console.log('Error occurred.');
      res.status(400).json({ responseMessage: 'Error Occurred' });
    } else {
      console.log('company contact details Updated');
      res.status(200).json({ responseMessage: 'company contact  details Updated' });
    }
  });
});

module.exports = router;
