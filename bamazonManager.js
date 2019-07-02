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
    console.log("connected as id " + connection.threadId + "\n");
    // readData();
});

function displayMenu(){
    
    inquirer
  .prompt({
    /* Pass your questions in here */
    
    type: "list",
    name: "choice",
    message: "What would you like to do?\n",
    choices: ["Buy an item", "Add an item into inventory", "Exit"]
    
    })
  .then(function (answer) {
    switch (answer.choice){
        case "Buy an item":
            buyItem();
            break;
        case "Add an item into inventory":
            addItem();
            break;
        case "Exit":
            exitProgram();
    }
    });
};
displayInventory();
displayMenu();

function buyItem(){

};

function addItem(){
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
            choice: ["Electronics", "Games", "Furniture"]
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
                item: answer.item,
                department: answer.department,
                price: answer.price,
                quantity: answer.quantity
            },
            function(error, res){
                if (error) throw error;
                console.log(res.affectedRows + "Item inserted!\n");
            }
        )
    });
};

function exitProgram(){
    console.log("Closing Connection");
    connection.end();
    process.exit(0);
};

function displayInventory(){
    connection.query("SELECT * FROM bamazon")
    , function(err, res) {
        if (err) throw err;
        console.log(res);
    } 
};
