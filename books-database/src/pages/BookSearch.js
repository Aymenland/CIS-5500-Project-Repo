import React, {useState, useEffect} from 'react';
import './BookSearch.css';
import SearchBar from '../components/SearchBar';
import SearchFilters from '../components/SearchFilters';
import BookComponent from '../components/BookComponent';
import Pagination from '../components/Pagination';
const config = require('../config.json')

function BookSearch() {
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    book: 'default',
    rating: 'default',
    year: 'default',
  });
  const rowsPerPage = 4;
  
  const indexOfLastElement = currentPage * rowsPerPage * 4;
  const indexOfFirstElement = indexOfLastElement - rowsPerPage * 4;

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/books`)
      .then(res => res.json())
      .then(resJson => setBooks(resJson.data));
  })
  const currentBooks = books.slice(indexOfFirstElement, indexOfLastElement);
  
  return(
    <div>
      <div className='database-title'>Books Database</div>
      <SearchBar/>
      <SearchFilters filters={filters} setFilters={setFilters}/>
      <BookComponent result={currentBooks} />
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} indexOfLastRow={indexOfLastElement} />
    </div>
  )
}

export default BookSearch;