var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "Triumph2018!",
    database: "bamazon"
});
connection.connect(function (error) {
    if (error) throw error;
    console.log("\n\tconnected as id " + connection.threadId + "\n");
    mainMenu();
});

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
    unction displayInventory() {
        connection.query("SELECT * FROM bamazon"
            , function (err, res) {
                if (err) throw err;
                // var header = ['ID', 'Product', 'Department', 'Price', 'Quantity'];
                // var body = 
                console.log("\nID\tProduct     \tDepartment\t  Price\t     Quantity")
                console.log("===========================================================");
    
                for (var i = 0; i < res.length; i++) {
                    if (res[i].department_name === "Games") {
                        console.log(res[i].id + "\t" + res[i].product_name + "     \t" + res[i].department_name + "\t\t  " + res[i].price + "    \t" + res[i].stock_quantity)
                    }
                }
                for (var i = 0; i < res.length; i++) {
                    if (res[i].department_name === "Electronics") {
                        console.log(res[i].id + "\t" + res[i].product_name + "     \t" + res[i].department_name + "\t  " + res[i].price + "    \t" + res[i].stock_quantity)
                    }
                }
                for (var i = 0; i < res.length; i++) {
                    if (res[i].department_name === "Furniture") {
                        console.log(res[i].id + "\t" + res[i].product_name + "     \t" + res[i].department_name + "\t  " + res[i].price + "    \t" + res[i].stock_quantity)
                    }
                }
                // console.log(res);
                buyItem(res);
            })
    };
