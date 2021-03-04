DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(

    ID INT NOT NULL AUTO_INCREMENT,
    DEPT_NAME VARCHAR(30),
    PRIMARY KEY (ID)
);

CREATE TABLE roletype(
    ID INT NOT NULL AUTO_INCREMENT,
    Title VARCHAR(30),
    Salary DECIMAL,
    Department_ID INT NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE employee(
    ID INT NOT NULL AUTO_INCREMENT,
    First_Name VARCHAR(30),
    Last_Name VARCHAR(30),
    Role_ID INT NOT NULL,
    Manager_ID INT,
    PRIMARY KEY (ID)
);

SET SQL_SAFE_UPDATES = 0;

/*Department Seeds*/
INSERT INTO department(DEPT_NAME)
VALUE('Finance');

INSERT INTO department(DEPT_NAME)
VALUE('Legal');

INSERT INTO department( DEPT_NAME)
VALUE('Engineering');

INSERT INTO department(DEPT_NAME)
VALUE('HR');

/*Role Seeds*/

INSERT INTO roletype (Title,Salary,Department_ID)
VALUES('Drafter',120000,1);

INSERT INTO roletype (Title,Salary,Department_ID)
VALUES('Lawyer',1200000,2);

INSERT INTO roletype (Title,Salary,Department_ID)
VALUES('HR Manager',30000,3);

INSERT INTO roletype (Title,Salary,Department_ID)
VALUES('Intern',10000,4);

INSERT INTO roletype (Title,Salary,Department_ID)
VALUES('Eng Manager',5000000,5);

/*Employee Seed*/
INSERT INTO employee (First_Name,Last_Name,Role_ID,Manager_ID)
VALUES('Charles', 'Suzuku',1,1);

INSERT INTO employee (First_Name,Last_Name,Role_ID,Manager_ID)
VALUES('Sidney', 'Jones',2 ,NULL);

INSERT INTO employee (First_Name,Last_Name,Role_ID,Manager_ID)
VALUES('Zero', 'Aki',3,NULL);

INSERT INTO employee (First_Name,Last_Name,Role_ID,Manager_ID)
VALUES('Charmaine', 'Miller',4,2);

INSERT INTO employee (First_Name,Last_Name,Role_ID,Manager_ID)
VALUES('Karl', 'Maxi',5,3);

/*SELECT employee.First_Name, employee.Last_Name, department.DEPT_NAME, roletype.Title 
FROM department, roletype, employee
INNER JOIN roletype u ON u.ID =employee.Role_ID
INNER JOIN department u2 on u2.ID = u.Department_ID
LEFT JOIN  employee u3 ON u3.ID=u3.Manager_ID;*/








SELECT * FROM department;
SELECT * FROM roletype;
SELECT * FROM employee;
