import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import './TopPublishers.css';
const config = require('../config.json')

function TopPublishers() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [dbResult, setDbResult] = useState([]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  let currentRows;
  let publisherElement;

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/top_publishers`)
    .then(res => res.json())
    .then(resJson => setDbResult(resJson.data));
  })
  if (dbResult) {
    currentRows = dbResult.slice(indexOfFirstRow, indexOfLastRow);
    publisherElement = currentRows.map(publisher => {
      return(
        <tr key={publisher.Publisher}>
          <th  scope="row">{publisher.Publisher}</th>
          <td>{publisher.Avg_Publisher_Rating}</td>
          <td>{publisher.Number_Of_Reviewers}</td>
      </tr>
      )
    })
  }
  return(
    <div className="container">      
      <h1 className="publisher-header">
        Top Publishers
      </h1>
      <table className="table table-striped">
      <thead>
        <tr>
        <th scope="col">Publisher</th>
          <th scope="col">Avg_Publisher_Rating</th>
          <th scope="col">Number_Of_Reviewers</th>
          </tr>
      </thead>
      <tbody>
        {publisherElement}
      </tbody>
      </table>
      {currentRows && <Pagination numPage={[1,2,3,4,5,6,7,8,9,10]} currentPage={currentPage} setCurrentPage={setCurrentPage} maxRowPerPage={10} indexOfLastRow={currentRows.length} />}
    </div>
  )
}

export default TopPublishers;
