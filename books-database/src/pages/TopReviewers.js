import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import './TopReviewers.css';
const config = require('../config.json')

function TopReviewers() {

  //TODO: highest and lowest ratings given by the user is not ready yet

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;
  const [dbResult, setDbResult] = useState([]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentRows = dbResult.slice(indexOfFirstRow, indexOfLastRow);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/top_reviewers`)
      .then(res => res.json())
      .then(resJson => setDbResult(resJson.data));
  })

  const reviewElement = currentRows.map(review => {
    return(
      <tr key={review.User_ID}>
        <th scope="row">{review.User_ID}</th>
        <td>{review.Age}</td>
        <td>{review.Location}</td>
        <td>{review.Book_Count}</td>
        <td>{review.Average_Rating}</td>
        <td>{10}</td>
        <td>{0}</td>
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
      <Pagination numPage={[1,2,3,4,5,6,7]} currentPage={currentPage} setCurrentPage={setCurrentPage} dataLength={currentRows.length} indexOfLastRow={indexOfLastRow} />
    </div>
  )
}

export default TopReviewers;