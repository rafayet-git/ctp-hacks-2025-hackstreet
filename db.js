/*
Database Schema:

CREATE TABLE article(
  id INT AUTO_INCREMENT PRIMARY KEY,
  brand VARCHAR(50),
  category VARCHAR(50),
  color VARCHAR(50),
  pattern VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE outfits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  likes INT (50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE outfit_articles (
  outfit_id INT NOT NULL,
  article_id INT NOT NULL,
  PRIMARY KEY (outfit_id, article_id),
  FOREIGN KEY (outfit_id) REFERENCES outfits(id),
  FOREIGN KEY (article_id) REFERENCES article(id)
);
*/

require('dotenv').config();
const fs = require('fs');

// database
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'clothing_calendar',
  ssl: {
    ca: fs.readFileSync('./certs/ca.pem') // Make sure this file exists and is readable
  }
});

connection.connect(err => {
  if (err) {
    console.error(process.env.MYSQL_HOST, process.env.MYSQL_PORT);
    console.error('Connection failed:', err.message);
  } else {
    console.log('Connected to MySQL: clothing_calendar');
  }
});

module.exports = connection;