DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE bamazon (
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (id)
);