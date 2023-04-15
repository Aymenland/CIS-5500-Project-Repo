import React, {useState} from 'react';
import './BookSearch.css';
import SearchBar from '../components/SearchBar';
import SearchFilters from '../components/SearchFilters';


function BookSearch() {

  const [filters, setFilters] = useState({
    book: 'default',
    rating: 'default',
    year: 'default',
  });

  return(
    <div>
      <div className='database-title'>Books Database</div>
      <SearchBar/>
      <SearchFilters filters={filters} setFilters={setFilters}/>
    </div>
  )
}

export default BookSearch;