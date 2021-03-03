DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(

    ID INT NOT NULL AUTO_INCREMENT,
    NAME VARCHAR(30),
    PRIMARY KEY (ID)
);

CREATE TABLE roletype(
    ID2 INT NOT NULL AUTO_INCREMENT,
    Title VARCHAR(30),
    Salary DECIMAL(5,5),
    Department_ID INT NOT NULL,
    PRIMARY KEY (ID2)
);

CREATE TABLE employee(
    ID3 INT NOT NULL AUTO_INCREMENT,
    First_Name VARCHAR(30),
    Last_Name VARCHAR(30),
    Role_ID INT NOT NULL,
    Manager_ID INT,
    PRIMARY KEY (ID3)
);