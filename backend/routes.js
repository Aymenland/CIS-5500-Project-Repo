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
    SELECT B.*, AVG(R.Rating) AS AvgRating
    FROM BOOKS B
    LEFT JOIN RATINGS R ON B.ISBN = R.ISBN
    GROUP BY B.ISBN
    ORDER BY RAND()
    LIMIT 100;
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json({data});
    }
  });
}


// Route 2: GET /topreviewers
const top_reviewers = async function(req, res) {
  connection.query(`
    SELECT U.User_Id, U.age, U.location, COUNT(R.ISBN) AS BooksReviewed, AVG(R.Rating) AS AvgRating, MAX(R.Rating) AS HighestRating, MIN(R.Rating) AS LowestRating
    FROM USERS U
    INNER JOIN RATINGS R ON U.User_Id = R.User_Id
    GROUP BY U.User_Id
    ORDER BY BooksReviewed DESC
    LIMIT 100;
  `, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.json({});
    } else {
      res.json({data});
    }
  });
}

// Route 3: GET /search/:keywords
const search = async function(req, res) {
  connection.query(`
    SELECT B.*, AVG(R.Rating) AS AvgRating
    FROM BOOKS B
    LEFT JOIN RATINGS R ON B.ISBN = R.ISBN
    WHERE B.Title LIKE '%${req.params.keywords}%'
      OR B.Author LIKE '%${req.params.keywords}%'
    GROUP BY B.ISBN
    LIMIT 100
  `, (err,data) => {
    if(err || data.length === 0){
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
  FROM BOOKS b JOIN RATINGS r on b.ISBN = r.ISBN
  JOIN USERS u on r.User-ID = u.User-ID
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
  search,
  top_reviewers,
  top_publishers,
}
