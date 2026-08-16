CREATE DATABASE IF NOT EXISTS ecommerce;

USE ecommerce;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    price DECIMAL(10,2) NOT NULL
);

INSERT INTO products
(name, description, price)
VALUES
('Laptop', 'Business laptop', 55000),
('Keyboard', 'Mechanical keyboard', 2000),
('Mouse', 'Wireless mouse', 1000),
('Monitor', '24 inch monitor', 15000);
