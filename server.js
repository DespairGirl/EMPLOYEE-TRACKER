const inquirer = require('inquirer');
const mysql = require('mysql');
const console_table= require('console.table');
const { listenerCount } = require('events');


//Add, Update, Remove employee
// View employee by dept, view by manager, view all
// update manager, update role
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
  
    user: 'root',
     password: 'mimi2131!!',
    database: 'employee_db',
  });


const start =() =>{

    inquirer

    .prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What Would You Like To Do???',
            choices: ['Add Employee', 'Remove Employee', 'Update Employee','View All Employees', 'View Employee By Department','View Employee By Manager','Edit Employee Role', 'Edit Employee Manager', 'EXIT']


        }
    ])

        .then((data)=>{
            switch (data.mainMenu) {
                case 'Add Employee':
                    addEmployee();
                    
                    break;
                
                case 'Remove Employee':
                    removeEmployee();

                    break;
               
                case 'Update Employee':
                     updateEmployee();

                     break;

                case 'View All Employees':
                    allEmployee();

                    break;

                case 'View Employee By Department':
                    byDepartment();

                    break;

                case 'View Employee by Manager':
                    byManager();

                    break;

                case 'Edit Employee Role':
                    employeeRole();

                    break;

                case 'Edit Employee Manager':
                    employeeManager();

                case 'EXIT':
                    console.log('Goodbye')

                
                default:
                    break;
            }

        })
    

};
start();

