import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

function Pagination({currentPage,setCurrentPage, dataLength, indexOfLastRow}) {

  return(
    <nav className="pagination-container" aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={ currentPage === 1 ? "page-item disabled" : "page-item"}>
          <button className="page-link" aria-label="Previous" onClick={() => setCurrentPage(currentPage - 1)}>
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        <li className={currentPage === 1 ? "page-item active" : "page-item"}><button disabled={currentPage === 1} className="page-link" onClick={() => setCurrentPage(1)}>1</button></li>
        <li className={currentPage === 2 ? "page-item active" : "page-item"}><button disabled={currentPage === 2} className="page-link" onClick={() => setCurrentPage(2)}>2</button></li>
        <li className={currentPage === 3 ? "page-item active" : "page-item"}><button disabled={currentPage === 3 || indexOfLastRow > dataLength } className="page-link" onClick={() => setCurrentPage(3)}>3</button></li>
        <li className={ indexOfLastRow > dataLength ? "page-item disabled" : "page-item"}>
          <button onClick={() => setCurrentPage(currentPage + 1)} className="page-link" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination;

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  dataLength: PropTypes.number.isRequired,
  indexOfLastRow: PropTypes.number.isRequired,
};