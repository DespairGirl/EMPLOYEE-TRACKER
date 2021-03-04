const inquirer = require('inquirer');
const mysql = require('mysql');
const console_table = require('console.table');
const { listenerCount } = require('events');
const { allowedNodeEnvironmentFlags } = require('process');


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
                choices: ['Add Employee', 'Remove Employee', 'Update Employee', 'View All Employees', 'View Employee By Department', 'View Employee By Manager', 'Edit Employee Role', 'Edit Employee Manager', 'EXIT']


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

const pickManager = () => {
    const managerArray = [];
    connection.query('SELECT First_Name, Last_Name FROM employee WHERE Manager_ID is NULL', (err, res) => {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            managerArray.push(res[i].First_Name)

        }
    })

    return managerArray;
};

const addRole = () => {
    const roleArray = [];
    connection.query('SELECT *FROM roletype', (err, res) => {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            roleAarray.push(res[i].Title);

        }
    })

    return roleArray;
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
                type: 'list',
                name: 'managerName',
                message: 'Enter Empolyee Manager',
                choices: pickManager()

            },
            {
                type: 'list',
                name: 'roleName',
                message: 'Choose Employee Role',
                choices: addRole()
            }

        ])
        .then((ans) => {

            const roleID = addRole().indexOf(ans.roleName) + 1
            const managerID = pickManager().indexOf(ans.managerName) + 1

            connection.query('INSERT INTO employee SET ?', {
                First_Name: ans.firstName,
                Last_Name: ans.lastName,
                Role_ID: roleID,
                Manager_ID: managerID
            },
                (err, res) => {
                    if (err) throw err;
                    console.table(ans)
                    start();
                })


        })
};

/*const removeEmployee = () =>{
    //const query= connection.query('DELETE FROM employee WHERE Role_ID ?',
    {
        Role_ID: addRole().indexOf()
    }
    )
} */

const updateEmployee = () => {

    connection.query('SELECT employee.Last_Name, roletype.Title FROM employee roletype WHERE employee.ID3=roleytpe.ID2', (err, res) => {
        if (err) throw err;
        console.log(res)


        inquirer
            .prompt([

                {
                    type: 'rawlist',
                    name: 'newLastName',
                    message: 'What is the New Employee Last Name?',
                    choices: function () {
                        const lastNameArr = [];
                        for (let i = 0; i < res.length; i++) {
                            lastNameArr.push(res[i].Last_Name)

                        }

                        return lastNameArr;

                    }


                },
                {
                    type: 'rawlist',
                    name: 'newRole',
                    message: 'Enter New Role',
                    choices: addRole()
                }
            ])
            .then((ans) => {
                const roleIdUp = addRole().indexOf(ans.newRole) + 1
                connection.query('UPDATE employee WHERE ?',
                    {
                        Last_Name: ans.newLastName
                    },
                    {
                        Role_ID: roleIdUp
                    },
                    (err, res) => {
                        if (err) throw err
                        console.table(ans)
                        start()
                    })

                });
                
                
            })
        };







