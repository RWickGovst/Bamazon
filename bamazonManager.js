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
    displayInventory();
});

// display the menu
function displayMenu(){
    inquirer.prompt({
    /* Pass your questions in here */
    
    type: "list",
    name: "choice",
    message: "\n\tWhat would you like to do?\n",
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
// function to purchase an item
function buyItem(){
    displayInventory();
    console.log("\n\tWelcome to Bamazon\n");
    inquirer.prompt([
        {
            type: "input",
            name: "item",
            message: "Please choose the product by the ID number: "
        },
        {
            type: "list",
            name: "quantity",
            message: "How many?",
            choices: ['1','2','3','4','5']
        },
    ])
    .then(function(answer){
        var query = connection.query(
            "SELECT FROM bamazon",
            {
                
            },
            function(error, res){
                if (error) throw error;
                console.log(res.affectedRows + "\nItem Purchased!\n");
                // update data
                // qty = qty - number purchased
                displayInventory();
                displayMenu();
            }
        )
    })
};
// function to add an item to inventory
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
                console.log(res.affectedRows + "Item inserted!\n");
                displayInventory();
                displayMenu();
            }
        )
    });
};
// display inventory
function displayInventory(){
    connection.query("SELECT * FROM bamazon"
    , function(err, res) {
        if (err) throw err;
        // var header = ['ID', 'Product', 'Department', 'Price', 'Quantity'];
        // var body = 
        // console.log("\nID\tProduct\tDepartment\tPrice\tQuantity")
        console.log("==============================================");
        
        for(var i = 0; i < res.length; i++){
            if (res[i].department_name === "Games"){
            console.log(res[i].id + "\t" + res[i].product_name + "\t" + res[i].department_name + "\t\t" + res[i].price + "\t" + res[i].stock_quantity)
            }
        }
        for(var i = 0; i < res.length; i++){
            if (res[i].department_name === "Electronics"){
            console.log(res[i].id + "\t" + res[i].product_name + "\t" + res[i].department_name + "\t\t" + res[i].price + "\t" + res[i].stock_quantity)
            }
        }
        for(var i = 0; i < res.length; i++){
            if (res[i].department_name === "Furniture"){
            console.log(res[i].id + "\t" + res[i].product_name + "\t" + res[i].department_name + "\t\t" + res[i].price + "\t" + res[i].stock_quantity)
            }
        }
        // console.log(res);
        displayMenu();
    }) 
};
// exit program
function exitProgram(){
    console.log("\n\tClosing Connection");
    connection.end();
    process.exit(0);
};

// module.exports = bamazonManager;