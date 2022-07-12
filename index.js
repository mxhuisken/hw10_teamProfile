const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/Employee')
const Engineer = require('./lib/Engineer')
const Manager = require('./lib/Manager')
const Intern = require('./lib/intern')
const path = require('path');
const DIST_DIR = path.resolve(__dirname, 'dist');
const distPath = path.join(DIST_DIR, 'index.html');
const cardGen = require('./src/cardTemplates.js');

// Store Employees
const allEmployees = [];
const allIDs = [];


// Questions
const managerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: `Enter Manager's Name`,

        validate: (answer) => {
            if (answer !== '') {
                return true;
            }
            return 'Please enter at least one character...';
        },
    },
    {
        type: 'input',
        name: 'id',
        message: `Enter Manager's ID Number`,

        validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
                return true;
            }
            return 'Please enter a positive number greater than zero...';
        },
    },
    {
        type: 'input',
        name: 'email',
        message: `Enter the Manager's Email Address`,
    
        validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
                return true;
            }
            return 'Please enter a valid email address...';
        },
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: `Enter the Manager's Office Number`,
        
        validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
                return true;
            }
            return 'Please enter a positive number greater than zero...';
        },
    },
]


// Engineer Questions
const engineerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: `Enter Engineer's Name`,
    
        validate: (answer) => {
            if (answer !== '') {
                return true;
            }
            return 'Please enter at least one character...';
        },
    },
    {
        type: 'input',
        name: 'id',
        message: `Enter the Engineer's ID Number`,
        
        validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
                if (allIDs.includes(answer)) {
                    return 'This ID is already taken. Please enter a different number.';
                } else {
                    return true;
                }
            }
            return 'Please enter a positive number greater than zero...';
        },
    },
    {
        type: 'input',
        name: 'email',
        message: `Enter the Engineer's Email Address`,
        
        validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
                return true;
            }
            return 'Please enter a valid email address...';
        },
    },
    {
        type: 'input',
        name: 'github',
        message: `Enter Engineer's Github Username`,
        
        validate: (answer) => {
            if (answer !== '') {
                return true;
            }
            return 'Please enter at least one character...';
        },
    },
]

// Intern Questions
const internQuestions = [
    {
        type: 'input',
        name: 'name',
        message: `Enter Intern's Name`,
        // default: 'allec',
        validate: (answer) => {
            if (answer !== '') {
                return true;
            }
            return 'Please enter at least one character...';
        },
    },
    {
        type: 'input',
        name: 'id',
        message: `Enter the Intern's ID Number`,
        // default: '009',
        validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
                if (allIDs.includes(answer)) {
                    return 'This ID is already taken. Please enter a different number.';
                } else {
                    return true;
                }
            }
            return 'Please enter a positive number greater than zero...';
        },

    },
    {
        type: 'input',
        name: 'email',
        message: `Enter the Intern's Email Address`,
        // default: 'allec@secretemail.com',
        validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
                return true;
            }
            return 'Please enter a valid email address...';
        },

    },
    {
        type: 'input',
        name: 'school',
        message: `Enter Intern's School Name`,
        // default: 'UCI'
        validate: (answer) => {
            if (answer !== '') {
                return true;
            }
            return 'Please enter at least one character...';
        },
    },
]

// Finish Question
const choiceQuestion = [
    {
        type: 'list',
        message: 'What would you like to do next?',
        name: 'choice',
        choices: ['Add a new Engineer', 'Add a new Intern', 'Exit'],
    },
]


// Create Manager
function createManager() {
    inquirer
        .prompt(managerQuestions)
        .then((data) => {
            // Create a manager with the Class Manager
            const manager = new Manager(
                data.name.toUpperCase(),
                data.id,
                data.email,
                data.officeNumber
            )
            // Push Manager info to allEmployees
            allEmployees.push(manager)
            allIDs.push(data.id)
            choice()
        })
}

// Create Engineer
function createEngineer() {
    inquirer
        .prompt(engineerQuestions)
        .then((data) => {
            // Create a engineer with the Class Engineer
            const engineer = new Engineer(
                data.name.toUpperCase(),
                data.id,
                data.email,
                data.github
            )
            allEmployees.push(engineer)
            allIDs.push(data.id)
            choice()
        })
}

// Create Intern
function createIntern() {
    inquirer
        .prompt(internQuestions)
        .then((data) => {
            // Create a intern with the Class Intern
            const intern = new Intern(
                data.name.toUpperCase(),
                data.id,
                data.email,
                data.school
            )
            allEmployees.push(intern)
            allIDs.push(data.id)
            choice()
        })
}

function choice() {
    inquirer
        .prompt(choiceQuestion)
        .then((data) => {
            console.log(data)
            switch (data.choice) {
                case 'Add a new Engineer':
                    createEngineer()
                    break;
                case 'Add a new Intern':
                    createIntern()
                    break;
                default:
                    console.log(`All Employees Entered... Generating Web Page...`)
                    cards();
                    break;
            }
        })
}

// Start Application
function init() {
    createManager();
}

function cards() {
    // Create the output directory if the dist path doesn't exist
    if (!fs.existsSync(DIST_DIR)) {
        fs.mkdirSync(DIST_DIR);
    }
    fs.writeFileSync(distPath, cardGen(allEmployees));
}

// Start Application
init();