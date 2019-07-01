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
    readData();
});
