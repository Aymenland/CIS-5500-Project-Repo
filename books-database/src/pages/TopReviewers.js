import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import './TopReviewers.css';
import { reviews } from '../reviewersDb';
const config = require('../config.json')

function TopReviewers() {

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;
  const [dbResult, setDbResult] = useState([]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentRows = reviews.slice(indexOfFirstRow, indexOfLastRow);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/top_reviewers`)
      .then(res => res.json())
      .then(resJson => console.log(resJson.data));
  })

  const reviewElement = currentRows.map(review => {
    return(
      <tr key={review.id}>
        <th scope="row">{review.id}</th>
        <td>{review.age}</td>
        <td>{review.location}</td>
        <td>{review.number_book}</td>
        <td>{review.average_rating}</td>
        <td>{review.highest}</td>
        <td>{review.lowest}</td>
      </tr>
    )
  })

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
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} dataLength={currentRows.length} indexOfLastRow={indexOfLastRow} />
    </div>
  )
}

export default TopReviewers;