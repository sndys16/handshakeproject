/* CREATE TABLE `handdb`.`educationdetails` (
  `educationdetailsid` INT NOT NULL AUTO_INCREMENT Primary key,
  `studentid` int,
  `collegename` VARCHAR(45) NOT NULL,
   `location` varchar(45) NOT NULL,
  `degree` varchar(45) NOT NULL,
  `major` varchar(45) NOT NULL,
  `yearofpassing` year,
   `currentcgpa` decimal(3,2),
    FOREIGN KEY (studentid) REFERENCES student(studentid)

  
  );



  CREATE TABLE `handdb`.`student` (
  `studentid` INT NOT NULL AUTO_INCREMENT Primary key,
  `name` varchar(45) NOT NULL,
  `mail` VARCHAR(45) NOT NULL Primary key,
   `password` varchar(45) NOT NULL,
  `collegename` varchar(45) NOT NULL,
  `dateofbirth` date,
  `city` varchar(45) ,
   `state` varchar(45) ,
   `country` varchar(45) ,
    `phonenumber` varchar(20) ,
     `profilepic` BLOB,
      `careerobjective` varchar(45),
      `resume` BLOB 
 

  );

  CREATE TABLE `handdb`.`experiencedetails` (
  `experiencedetailsid` INT NOT NULL AUTO_INCREMENT Primary key,
  `studentid` int,
  `companyname` VARCHAR(45) NOT NULL,
   `title` varchar(45) NOT NULL,
  `location` varchar(45) NOT NULL,
  `startdate` varchar(45) NOT NULL,
  `enddate` date ,
   `workdescription` varchar(55) not null,
    FOREIGN KEY (studentid) REFERENCES student(studentid)

  
  );

CREATE TABLE `handdb`.`skillset` (
  `skillsetid` INT NOT NULL AUTO_INCREMENT Primary key,
  `studentid` int,
  `skills` VARCHAR(45) NOT NULL,
FOREIGN KEY (studentid) REFERENCES student(studentid)

  
  );




CREATE TABLE `handdb`.`company` (
  `companyid` INT NOT NULL AUTO_INCREMENT Primary key,
  `name` varchar(45) NOT NULL,
  `mail` VARCHAR(45) NOT NULL,
   `password` varchar(45) NOT NULL,
  `location` varchar(45) NOT NULL,
  `description` date,
  
    `phonenumber` varchar(20) ,
     `profilepic` BLOB
      
 

  );

CREATE TABLE `handdb`.`jobdetails` (
  `jobid` INT NOT NULL AUTO_INCREMENT Primary key,
  `companyid` int,
  `title` VARCHAR(45) NOT NULL,
   `postingdate` varchar(45) NOT NULL,
  `applicationdeadline` varchar(45) NOT NULL,
  `location` varchar(45) NOT NULL,
  `salary` int not null,
   `jobdescription` varchar(55) not null,
    FOREIGN KEY (companyid) REFERENCES company(companyid)

  
  );

  ALTER TABLE `handdb`.`jobdetails` 
ADD COLUMN `jobcategory` VARCHAR(45) NOT NULL AFTER `jobdescription`;

  CREATE TABLE `handdb`.`jobcategory` (
  `jobcategoryid` INT NOT NULL AUTO_INCREMENT Primary key,
  `category` varchar(20) not null,
  `jobid` int,
   
    FOREIGN KEY (jobid) REFERENCES jobdetails(jobid)

  
  );

   CREATE TABLE `handdb`.`applicationstatus` (
  `statusid` INT NOT NULL AUTO_INCREMENT Primary key,
  `status` varchar(20) not null,
  `studentid` int,
  `jobid` int,
  
    FOREIGN KEY (jobid) REFERENCES jobdetails(jobid),
    FOREIGN KEY (studentid) REFERENCES student(studentid)

  
  );


  CREATE TABLE `handdb`.`event` (
  `eventid` INT NOT NULL AUTO_INCREMENT Primary key,
  `eventname` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
   `time`  time NOT NULL,
  `date` date NOT NULL,
  `location` varchar(45) NOT NULL,
  `eligibility` varchar(45) not null,
   `studentid` int,
    FOREIGN KEY (studentid) REFERENCES student(studentid)

  
  ); 
  CREATE TABLE `handdb`.`application` (
  `applicationid` INT NOT NULL AUTO_INCREMENT Primary key,
  `studentid` int,
  `companyid` int,
  `jobid` int,
  
    FOREIGN KEY (studentid) REFERENCES student(studentid),
     FOREIGN KEY (companyid) REFERENCES company(companyid),
	FOREIGN KEY (jobid) REFERENCES jobdetails(jobid)
    

  
  );*/