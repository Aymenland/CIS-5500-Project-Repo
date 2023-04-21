const e = require('express');
const mysql = require('mysql')
const config = require('./config.json')

// Creates MySQL connection using database credential provided in config.json
// Do not edit. If the connection fails, make sure to check that config.json is filled out correctly
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db
});
connection.connect((err) => err && console.log(err));

// Route 1: GET /books
const books = async function(req, res) {
  connection.query(`
    SELECT *
    FROM BOOKS
    LIMIT 50
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json({data});
    }
  });
}


// Route 2: GET /random
const random = async function(req, res) {
  connection.query(`
    SELECT *
    FROM USERS
    LIMIT 4
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json({data});
    }
  });
}

// Route 8: GET /top_publishers
const top_publishers = async function(req, res) {
    
  connection.query(`    
  SELECT b.Publisher, count(b.ISBN) as NumOfBooks, avg(r.Book-Rating) as avgRating, count(u.User-ID) as NumOfReviewers
  FROM Books b JOIN Ratings r on b.ISBN = r.ISBN
  JOIN Users u on r.User-ID = u.User-ID
  GROUP BY b.Publisher
  ORDER BY count(b.ISBN) desc`, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json(data);
      }
  });
  
}

module.exports = {
  books,
  random,
  top_publishers,
}
