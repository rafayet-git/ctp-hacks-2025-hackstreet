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
    console.error('Connection failed:', err.message);
  } else {
    console.log('Connected to MySQL: clothing_calendar');
  }
});

module.exports = connection;