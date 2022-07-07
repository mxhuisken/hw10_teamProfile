const inquirer = require("inquirer")
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern")
const Engineer = require("./lib/Engineer")
const { exit } = require("process");
const fs = require("fs");

function init(){
   createManager();
}

const employeeArr = [];
function createManager(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'managerName',
            message: "What is the team manager's name?",
        },
        {
            type: 'input',
            name: 'managerId',
            message: "What is the team manager's employee ID?"
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: "What is the team manager's email?"
        },
        {
            type: 'input',
            name: 'managerOfficeNumber',
            message: "What is the team manager's office number?"
        },
    ]).then((answers) => {
        const manager = new Manager(
            answers.managerName, 
            answers.managerId, 
            answers.managerEmail, 
            answers.managerOfficeNumber
        );
        employeeArr.push(manager)
        console.log('created manager')
        
        setTimeout(() => addEmployees(), 1000);
    })
}

function addEmployees(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'todo',
            message: 'Select the employees role that you would like to add...',
            choices: ["Engineer", "Intern", "Exit"]
        }
    ]).then((answer) => {
        switch(answer.todo){
            case "Engineer":
                addEngineer();
            break;
            case "Intern":
                addIntern();
            break;
            case "Exit":
                createHTML();
            break;
        }
    })
}

function addEngineer(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'engineerName',
            message: "What is the engineer's name?",
        },
        {
            type: 'input',
            name: 'engineerId',
            message: "What is the engineer's employee ID?",
        },
        {
            type: 'input',
            name: 'engineerEmail',
            message: "What is the engineer's email?",
        },
        {
            type: 'input',
            name: 'engineerGitHub',
            message: "What is the engineer's GitHub username?",
        },
    ]).then((answers) => {
        const engineer = new Engineer(
            answers.engineerName,
            answers.engineerId,
            answers.engineerEmail,
            answers.engineerGitHub,
        );

        employeeArr.push(engineer)
        console.log('created engineer')
        
        setTimeout(() => addEmployees(), 1000);
    });
}

function addIntern(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'internName',
            message: "What is the intern's name?",
        },
        {
            type: 'input',
            name: 'internId',
            message: "What is the intern's employee ID?",
        },
        {
            type: 'input',
            name: 'internEmail',
            message: "What is the intern's email?",
        },
        {
            type: 'input',
            name: 'internSchool',
            message: "Where does the interen go to school?",
        },
    ]).then((answers) => {
        const intern = new Intern(
            answers.internName,
            answers.internId,
            answers.internEmail,
            answers.internSchool,
        );

        employeeArr.push(intern)

        console.log('created intern')
        setTimeout(() => addEmployees(), 1000);
    });
}

function createCard(employee) {
    return `
        <div class="card">
            <h3> ${employee.name}</h3>
            <h4> ${employee.getRole()}</h4>

            <p>${employee.id}</p>
            <p>${employee.email}</p>
            <p>${employee.officeNumber || employee.github || employee.school}</p>
        </div>
    `
}

function createHTML(){
    const HTML = 
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Employee Directory</title>
    </head>
    <body>
        ${employeeArr.map(createCard).join('')}}  
    </body>
    </html>
    `;
fs.writeFileSync("./dist/index.html", HTML);
}

init();