import React, { useState } from 'react';

function TopPublishers() {

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;


  return(
    <div className="container">      
      <h1 className="publisher-header">
      Top Publishers
      </h1>
      <table className="table table-striped">
      <thead>
        <tr>
        <th scope="col">ID</th>
          <th scope="col">Publisher</th>
          <th scope="col">Number of Books Released</th>
          </tr>
      </thead>
      <tbody>
        <tr>
        <td>...</td>
        </tr>
      </tbody>
      </table>
      
    </div>
  )
}

export default TopPublishers;