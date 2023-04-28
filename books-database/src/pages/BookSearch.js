import React, {useState, useEffect } from 'react';
import './BookSearch.css';
import SearchBar from '../components/SearchBar';
import SearchFilters from '../components/SearchFilters';
import BookComponent from '../components/BookComponent';
import Pagination from '../components/Pagination';
const config = require('../config.json')

//TO DO:
//2. Search Functions
//3. Filter

function BookSearch() {
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [keywords, setKeywords] = useState('');
  const [filters, setFilters] = useState({
    book: 'default',
    rating: 'default',
    year: 'default',
  });
  const rowsPerPage = 4;
  
  const indexOfLastElement = currentPage * rowsPerPage * 4;
  const indexOfFirstElement = indexOfLastElement - rowsPerPage * 4;
  let currentBooks;

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/books`)
      .then(res => res.json())
      .then(resJson => setBooks(resJson.data));
  },[])


  const handleSearch = () => {
    fetch(`http://${config.server_host}:${config.server_port}/search/${keywords}`)
      .then(res => res.json())
      .then(resJson => setBooks(resJson.data));
  }
  
  if (books) {
    currentBooks = books.slice(indexOfFirstElement, indexOfLastElement);
  }

  return(
    <div>
      <div className='database-title'>Books Database</div>
      <SearchBar keyword={keywords} setKeyword={setKeywords} handleSearch={handleSearch} />
      <SearchFilters filters={filters} setFilters={setFilters}/>
      <BookComponent result={currentBooks} />
      {currentBooks && <Pagination numPage={[1,2,3,4,5,6,7,8,9,10]} currentPage={currentPage} setCurrentPage={setCurrentPage} indexOfLastRow={currentBooks.length} maxRowPerPage={16} />}
    </div>
  )
}

export default BookSearch;