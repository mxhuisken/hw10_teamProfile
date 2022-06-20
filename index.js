const Manager = require("./lib/Manager");
const inquirer = require("inquirer");
const { exit } = require("process");

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
        addEmployees()
    });
}

function addEmployees(){
    inquirer.prompt([
        {
            type: 'List',
            name: 'todo',
            message: 'Select the employees role...',
            choices: ["Engineer", "Intern", "Exit"],
        }
    ]).then((answer) => {
        switch(answer.todo){
            case "Engineer":
                addEngineer();
            break;
            case "Intern":
                addIntern();
            break;
            default:
                exit();
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
            name: 'internemail',
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
            answers.internGitHub,
        );

        employeeArr.push(intern)
    });
}




init();