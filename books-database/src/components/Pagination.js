import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

function Pagination({numPage, currentPage,setCurrentPage, indexOfLastRow}) {
  

  return(
    <nav className="pagination-container" aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={ currentPage === 1 ? "page-item disabled" : "page-item"}>
          <button className="page-link" aria-label="Previous" onClick={() => setCurrentPage(currentPage - 1)}>
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {numPage.map(page => {
          return(
            <li key={page} className={currentPage === page ? "page-item active" : "page-item"}><button disabled={currentPage === page} className="page-link" onClick={() => setCurrentPage(page)}>{page}</button></li>
          )
        })}
        <li className={ indexOfLastRow > 16 ? "page-item disabled" : "page-item"}>
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
  numPage: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  indexOfLastRow: PropTypes.number.isRequired,
};