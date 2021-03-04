const inquirer = require('inquirer');
const mysql = require('mysql');
const console_table = require('console.table');
const db = require(".");



//Add, Update, Remove employee
// View employee by dept, view by manager, view all
// update manager, update role
// add role, department 
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    user: 'root',
    password: 'mimi2131!!',
    database: 'employee_db',
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start();
});


const start = () => {

    inquirer

        .prompt([
            {
                type: 'list',
                name: 'mainMenu',
                message: 'What Would You Like To Do???',
                choices: ['Add Employee', 'Remove Employee', 'Update Employee', 'Add Department', 'Add Role', 'View All Employees', 'View Employee By Department', 'View Employee By Manager', 'EXIT']


            }
        ])

        .then((data) => {
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

                case 'Add Department':
                    addDepartment();

                    break;

                case 'Add Role':
                    addRole();

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

                

                case 'EXIT':
                    console.log('Goodbye')
                    


                default:
                    break;
            }

        })


};



const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter Empolyee First Name'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter Empolyee Last Name'
            },
            {
                type: 'input',
                name: 'eManager',
                message: 'Enter Empolyee Manager ID',


            },
            {
                type: 'input',
                name: 'eRole',
                message: 'Enter Employee Role ID',

            }

        ])
        .then((ans) => {



            connection.query('INSERT INTO employee SET ?', {
                First_Name: ans.firstName,
                Last_Name: ans.lastName,
                Role_ID: ans.eRole,
                Manager_ID: ans.eManager
            },
                (err, res) => {
                    if (err) throw err;
                    console.table(res)
                    start();
                })


        })
};

const removeEmployee = () =>{
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'removeFirst',
            message: 'Input The FIRST Name of Employee You Would Like to Remove'
        },
        {
            type: 'input',
            name: 'removeSecond',
            message: 'Enter the LAST Name of the Employee You Would Like to Remove'
        }

    ])
    .then((ans)=>{
        connection.query('DELETE FROM employee WHERE  First_Name =(?) AND Last_Name= (?)',[ans.removeFirst,ans.removeSecond],

           
             
         (err,res)=>{
            if (err) throw err
            console.table(res)
            start();
        })
    })
};
    

const updateEmployee = () => {

    inquirer
        .prompt([

            {
                type: 'input',
                name: 'newLastName',
                message: 'What is the New Employee Last Name?'
             },
            {
                type: 'input',
                name: 'newRole',
                message: 'Enter New Role'
                
            }
        ])
        .then((ans) => {
            connection.query('UPDATE employee SET Role_ID= ? WHERE First_Name= ?',[ans.newLastName,ans.newRole],
                
               
                (err, res) => {
                    if (err) throw err
                    console.table(res)
                    start();
                })

        });

    };

const addDepartment =() =>{
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'What Department Would You Like to Add?'

        }
    ])
    .then((ans)=>{
        connection.query('INSERT INTO department(DEPT_NAME) VALUE (?) ',[ans.DEPT_NAME],
        (err,res)=>{
            if(err) throw err;
            console.table(res)
            start();
        }
        )
    })
};

const addRole = () =>{
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'newRoleName',
            message: 'Enter a Role You Would Like to Add'
        },
        {
            type: 'input',
            name: 'salaryAmt',
            message: 'Enter the Salary For This Role'
        },
        {
            
            type: 'input',
            name: 'deptId',
            message: 'Enter the Department ID For This Role'
        },
       
    ])
    .then((ans)=>{
        connection.query('INSERT INTO roletype (Title, Salary, Department_ID) VALUES (?,?,?)',[ans.newRoleName,ans.salaryAmt,ans.deptId],
       (err,res) =>{
           if(err) throw err;
           console.table(res);
           start();
       } )
    })
}

const allEmployee = () => {
    connection.query('SELECT employee.First_Name, employee.Last_Name, department.DEPT_NAME, roletype.Title FROM department, roletype, employee INNER JOIN roletype u ON u.ID =employee.Role_ID INNER JOIN department u2 on u2.ID = u.Department_ID LEFT JOIN  employee u3 ON u3.ID=u3.Manager_ID;', (err, res) => {
        if (err) throw err
        console.log(res)
        console.table(res)
        start();
    })
};

const byDepartment =() =>{
    connection.query('SELECT * FROM department', 
    (err,res)=>{
        if (err) throw err;
        console.table(res);
        start();
        
    })
}

const byManager = () =>{
    inquirer
    .prompt ([
        {
            type: 'input',
            name: 'mngID',
            message: 'Enter The Manager ID You Want To Sort By'
        }
    ])
    .then ((ans)=>{
    connection.query('SELECT FROM employee WHERE Manager_ID= (?)',
    [ans.mngID],
    (err,res)=>{
        if(err) throw err;
        console.table(res)
        start();
    })
})
};



