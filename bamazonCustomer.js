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
    whatNext();
});
// display inventory
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
            // console.log(res);
            buyItem(res);
        })
};
// function to purchase an item
function buyItem(completeInventory) {
    // displayInventory();
    // console.log("complete: " +JSON.stringify(completeInventory));
    console.log("\n\tWelcome to Bamazon\n");
    inquirer.prompt([
        {
            type: "input",
            name: "item",
            message: "Please choose the product by the ID number: "
        }
    ])
        .then(function (answer) {
            var choiceId = parseInt(answer.item);
            var productInfo = checkInventory(choiceId, completeInventory);
            // console.log(productInfo);
            if (productInfo) {
                promptForQuantity(productInfo);
            }
        })
};

function checkInventory(id, inventory) {
    for (var i = 0; i < inventory.length; i++) {
        if (inventory[i].id == id) {
            // console.log("inventory[i]: " +JSON.stringify(inventory[i]));
            return inventory[i];
        }
    }
}
function promptForQuantity(product) {
    // console.log(product);
    inquirer.prompt([
        {
            type: "input",
            name: "quantity",
            message: "Enter a quantity: "
        }
    ]).then(function (answer) {
        var quantity = parseInt(answer.quantity);
        var cost = (parseInt(product.price) * quantity);

        console.log("The total for your purchase is $" + cost);
        if (quantity <= product.stock_quantity) {
            makePurchase(product, quantity);
        } else {
            console.log("insufficient quantity");
            displayInventory();
        }
    })
}
function makePurchase(product, quantity) {
    // console.log("product info: " +JSON.stringify(product));
    var queryUrl = "UPDATE bamazon SET stock_quantity=stock_quantity-? WHERE id=?";
    connection.query(queryUrl, [quantity, product.id], function (err, res) {
        
        console.log("Successful purchase");
        // displayInventory();
        whatNext();
    })
}
function whatNext() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "\n\tWhat would you like to do?\n",
            choices: ["Buy an item", "Exit"]
        }
    ])
        .then(function (answer) {
            switch (answer.choice){
                case "Buy an item":
                 displayInventory();   
                // buyItem();
                    break;
                case "Exit":
                    exitProgram();
            }
        })
        }
        // exit program
function exitProgram(){
    console.log("\n\tClosing Connection");
    connection.end();
    process.exit(0);
};
