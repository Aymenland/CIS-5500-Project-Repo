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
  database: config.rds_db,
  charset: 'utf8mb4'
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

// Route: GET /funfacts
const fun_facts = async function(req, res) {
  // Define the SQL queries for the fun facts
  const query1 = `
    SELECT COUNT(*) AS NumBooks
    FROM (
      SELECT B.ISBN, AVG(R.Rating) AS AvgRating
      FROM BOOKS B
      LEFT JOIN RATINGS R ON B.ISBN = R.ISBN
      GROUP BY B.ISBN
      HAVING AvgRating >= 9
    ) AS T;
  `;

  const query2 = `
    SELECT COUNT(*) AS ZeroRatingReviewers
    FROM USERS u
    JOIN RATINGS r ON u.User_id = r.User_id
    WHERE r.rating = 0
    GROUP BY u.User_id
    HAVING AVG(r.Rating) = 0;
  `;

  const query3 = `
    SELECT b.Author, STDDEV(r.Rating) as Rating_Std_Dev
    FROM BOOKS b
    JOIN RATINGS r ON b.ISBN = r.ISBN
    GROUP BY b.Author
    ORDER BY Rating_Std_Dev DESC, b.Author DESC
    LIMIT 1;
  `;

  const query4 = `
    WITH book_avg_ratings AS (
      SELECT ISBN, AVG(Rating) AS Avg_Rating FROM RATINGS
      GROUP BY ISBN
    )
    SELECT b.Publisher, AVG(bar.Avg_Rating) AS Avg_Publisher_Rating
    FROM BOOKS b
    JOIN book_avg_ratings bar ON b.ISBN = bar.ISBN
    GROUP BY b.Publisher
    ORDER BY Avg_Publisher_Rating DESC
    LIMIT 1;
  `;

  const query5 = `
    WITH age_groups AS (
      SELECT 10 AS lower_limit, 20 AS upper_limit
      UNION ALL
      SELECT 20 AS lower_limit, 30 AS upper_limit
      UNION ALL
      SELECT 30 AS lower_limit, 40 AS upper_limit
      UNION ALL
      SELECT 40 AS lower_limit, 50 AS upper_limit
      UNION ALL
      SELECT 50 AS lower_limit, 60 AS upper_limit
      UNION ALL
      SELECT 60 AS lower_limit, 70 AS upper_limit
      UNION ALL
      SELECT 70 AS lower_limit, 80 AS upper_limit),
    
        age_groups_ratings AS (
        SELECT
          age_groups.lower_limit AS age_group_lower_limit,
          age_groups.upper_limit AS age_group_upper_limit,
          AVG(RATINGS.rating) AS average_rating
        FROM age_groups
        LEFT JOIN USERS ON USERS.Age >= age_groups.lower_limit AND USERS.Age < age_groups.upper_limit
        LEFT JOIN RATINGS ON RATINGS.User_id = USERS.User_id
        GROUP BY age_groups.lower_limit, age_groups.upper_limit)
    
    SELECT * FROM age_groups_ratings
    ORDER BY average_rating DESC
    LIMIT 1;`

    const query6 = `SELECT COUNT(*) AS count FROM BOOKS
    WHERE ISBN NOT IN (SELECT DISTINCT ISBN FROM RATINGS);`

    const query7 = `
    WITH book_location_counts AS (
      SELECT r.ISBN, COUNT(DISTINCT u.Location) AS Location_Count
      FROM RATINGS r
      JOIN USERS u ON r.User_ID = u.User_ID
      GROUP BY r.ISBN)
   
   SELECT blc.ISBN, Title, location_count FROM book_location_counts blc
   JOIN BOOKS b ON blc.ISBN = b.ISBN
   ORDER BY location_count DESC
   LIMIT 1;
    `

  // Execute the queries and format the results into fun facts
  Promise.all([
    new Promise((resolve, reject) => connection.query(query1, (err, data) => err ? reject(err) : resolve(data))),
    new Promise((resolve, reject) => connection.query(query2, (err, data) => err ? reject(err) : resolve(data))),
    new Promise((resolve, reject) => connection.query(query3, (err, data) => err ? reject(err) : resolve(data))),
    new Promise((resolve, reject) => connection.query(query4, (err, data) => err ? reject(err) : resolve(data))),
    new Promise((resolve, reject) => connection.query(query5, (err, data) => err ? reject(err) : resolve(data))),
    new Promise((resolve, reject) => connection.query(query6, (err, data) => err ? reject(err) : resolve(data))),
    new Promise((resolve, reject) => connection.query(query7, (err, data) => err ? reject(err) : resolve(data))),
  ]).then(([result1, result2, result3, result4, result5, result6, result7]) => {
    // Format the results into fun facts
    const funFacts = [
      `There are ${result1[0].NumBooks} books with an average rating of at least 9 out of 10. This constitutes about ${(result1[0].NumBooks / 217045 * 100).toFixed(2)}% of the books we know of!`,
      `Out of all of our reviewers, ${result2[0].ZeroRatingReviewers} of them have only given 0/10 reviews. Not bad!`,
      `The author ${result3[0].Author} has the most controversial ratings in our library. Highest variance in the ratings.`,
      `The publisher with the highest average rating, at ${(result4[0].Avg_Publisher_Rating).toFixed(2)}/10, is ${result4[0].Publisher}.`,
      `The age group with the highest average rating are ${result5[0].age_group_lower_limit} year olds to ${result5[0].age_group_upper_limit} year olds, with an average rating of ${result5[0].average_rating.toFixed(2)}.`,
      `There is a total of ${result6[0].count} books that haven't been rated by any users we know of!`,
      `The book that has been rated from the most places around the earth is titled "${result7[0].Title}". It was rated from ${result7[0].location_count} different locations!`,
    ];
    res.json(funFacts);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while fetching fun facts.' });
  });
}

// Add the new route to the


module.exports = {
  books,
  search,
  top_reviewers,
  top_publishers,
  fun_facts,
}
