import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import './TopReviewers.css';
const config = require('../config.json')

function TopReviewers() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;
  const [dbResult, setDbResult] = useState([]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  let currentRows;
  let reviewElement;

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/top_reviewers`)
      .then(res => res.json())
      .then(resJson => setDbResult(resJson.data));
  })
  if (dbResult) {
    currentRows = dbResult.slice(indexOfFirstRow, indexOfLastRow);
    reviewElement = currentRows.map(review => {
      return(
        <tr key={review.User_Id}>
          <th scope="row">{review.User_Id}</th>
          <td>{review.age}</td>
          <td>{review.location}</td>
          <td>{review.BooksReviewed}</td>
          <td>{review.AvgRating}</td>
          <td>{review.HighestRating}</td>
          <td>{review.LowestRating}</td>
        </tr>
      )
    })
  }
  return(
    <div className="container">
      <h1 className="review-header">
        Top Reviewers
      </h1>
      <table className="table table-striped">
      <thead>
        <tr>
        <th scope="col">ID</th>
          <th scope="col">Age</th>
          <th scope="col">Location</th>
          <th scope="col">Number of Books Rated</th>
          <th scope="col">Average Ratings</th>
          <th scope="col">Highest Rating Given</th>
          <th scope="col">Lowest Rating Given</th>
        </tr>
      </thead>
      <tbody>
        {reviewElement}
      </tbody>
      </table>
      {currentRows && <Pagination numPage={[1,2,3,4,5,6,7]} currentPage={currentPage} setCurrentPage={setCurrentPage} maxRowPerPage={15} indexOfLastRow={currentRows.length} />}
    </div>
  )
}

export default TopReviewers;