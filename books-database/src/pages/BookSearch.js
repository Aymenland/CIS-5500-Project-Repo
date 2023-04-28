import React, {useState, useEffect } from 'react';
import './BookSearch.css';
import SearchBar from '../components/SearchBar';
import SearchFilters from '../components/SearchFilters';
import BookComponent from '../components/BookComponent';
import Pagination from '../components/Pagination';
const config = require('../config.json')

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

  useEffect(() => {
    const handleSorting = (a, b) => {
      let bookComparison = 0;
      let ratingComparison = 0;
      let yearComparison = 0;
      if (filters.book === 'ascending') {
        bookComparison = a.Title.localeCompare(b.Title);
      } else if (filters.book === 'descending') {
        bookComparison = b.Title.localeCompare(a.Title);
      }
      if (filters.rating === 'ascending') {
        ratingComparison = a.AvgRating - b.AvgRating;
      } else if (filters.rating === 'descending') {
        ratingComparison = b.AvgRating - a.AvgRating;
      }
      if (filters.year === 'ascending') {
        yearComparison = a.Publication_year - b.Publication_year;
      } else if (filters.year === 'descending') {
        yearComparison = b.Publication_year - a.Publication_year;
      }
      return bookComparison || ratingComparison || yearComparison;
    };
    if (filters.book === 'default' && filters.rating === 'default' && filters.year === 'default') {
      setBooks(books);
    } else {
      setBooks((p) => [...p].sort((a, b) => handleSorting(a, b)));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.book, filters.rating, filters.year]);

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