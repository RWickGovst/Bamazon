// var bamazonManager = "./bamazonManager";
var inquirer = require("inquirer");

function mainMenu(){
    inquirer.prompt({
        type: "list",
    name: "choice",
    message: "\n\tEnter the site as a customer or a manager\n",
    choices: ["Customer", "Manager", "Exit"]
    })
    .then(function (answer) {
        switch (answer.choice){
            case "Customer":
                buyItem();
                break;
            case "Manager":
                addItem();
                break;
            case "Exit":
                exitProgram();
        }
        });
    };
