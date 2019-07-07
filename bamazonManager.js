var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "Triumph2018!",
    database: "bamazon"
});
connection.connect(function(error){
    if (error) throw error;
    console.log("\n\tconnected as id " + connection.threadId + "\n");
    displayMenu();
});

// display the menu
function displayMenu(){
    inquirer.prompt({
   
    type: "list",
    name: "choice",
    message: "\n\tWhat would you like to do?\n",
    choices: ["Add an item into inventory", "Exit"]
    
    })
  .then(function (answer) {
    switch (answer.choice){

        case "Add an item into inventory":
            addItem();
            break;
        case "Exit":
            exitProgram();
    }
    });
};
function displayInventory() {
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
        })
};

// function to add an item to inventory
function addItem(){
    console.log("\n\tWelcome to Bamazon\n");
    console.log("Please enter the product\n");
    inquirer.prompt([
        {
            type: "input",
            name: "item",
            message: "Please enter a product name: "
        },
        {
            type: "list",
            name: "department",
            message: "Select a department",
            choices: ["Electronics", "Games", "Furniture"]
        },
        {
            type: "input",
            name: "price",
            message: "Enter the price"
        },
        {
            type: "input",
            name: "quantity",
            message: "Enter the quantity"
        },
    ])
    .then(function (answer) {
        var query = connection.query(
            "INSERT INTO bamazon SET ?",
            {
                product_name: answer.item,
                department_name: answer.department,
                price: answer.price,
                stock_quantity: answer.quantity
            },
            function(error, res){
                if (error) throw error;
                console.log(res.affectedRows + " Item inserted!\n");
                displayInventory();
                displayMenu();
            }
        )
    });
};

// exit program
function exitProgram(){
    console.log("\n\tClosing Connection");
    connection.end();
    process.exit(0);
};

// module.exports = bamazonManager;