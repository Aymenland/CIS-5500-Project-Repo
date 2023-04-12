import React from 'react';
import Pagination from '../components/Pagination';
import './TopReviewers.css';

function TopReviewers() {
  return(
    <div className="container">
      <h1 className="review-header">
        Top Reviewers
      </h1>
      <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Age</th>
          <th scope="col">Location</th>
          <th scope="col">Number of Books Rated</th>
          <th scope="col">Average Ratings</th>
          <th scope="col">Highest Rating Given</th>
          <th scope="col">Lowest Rating Given</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">34</th>
          <td>New York, United States</td>
          <td>3920</td>
          <td>7</td>
          <td>10</td>
          <td>0</td>
        </tr>
        <tr>
          <th scope="row">23</th>
          <td>California, United States</td>
          <td>3913</td>
          <td>7</td>
          <td>10</td>
          <td>0</td>
        </tr>
        <tr>
          <th scope="row">56</th>
          <td>New York, United States</td>
          <td>2940</td>
          <td>5</td>
          <td>10</td>
          <td>3</td>
        </tr>
      </tbody>
      </table>
      <Pagination/>
    </div>
  )
}

export default TopReviewers;