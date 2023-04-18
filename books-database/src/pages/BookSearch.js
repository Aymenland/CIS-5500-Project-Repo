import React, {useState} from 'react';
import './BookSearch.css';
import SearchBar from '../components/SearchBar';
import SearchFilters from '../components/SearchFilters';
import BookComponent from '../components/BookComponent';
import Pagination from '../components/Pagination';
import Default from '../assets/Default.svg'


function BookSearch() {
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    book: 'default',
    rating: 'default',
    year: 'default',
  });
  const rowsPerPage = 4;
  
  const indexOfLastElement = currentPage * rowsPerPage * 4;
  const indexOfFirstElement = indexOfLastElement - rowsPerPage * 4;

  const bookResults = [
    {
      ISBN: "1839DSN30",
      Title: "Romeo and Juliet",
      Author: "William Shakespeare",
      Pulisher: "Oxford University Press",
      Average_Ratigs: 10,
      image: {Default},
    },
    {
      ISBN: "1839DSN31",
      Title: "Romeo and Juliet",
      Author: "William Shakespeare",
      Pulisher: "Oxford University Press",
      Average_Ratigs: 10,
      image: {Default},
    },
    {
      ISBN: "1839DSN32",
      Title: "Romeo and Juliet",
      Author: "William Shakespeare",
      Pulisher: "Oxford University Press",
      Average_Ratigs: 10,
      image: {Default},
    },
    {
      ISBN: "1839DSN33",
      Title: "Romeo and Juliet",
      Author: "William Shakespeare",
      Pulisher: "Oxford University Press",
      Average_Ratigs: 10,
      image: {Default},
    },
    {
      ISBN: "1839DSN34",
      Title: "Romeo and Juliet",
      Author: "William Shakespeare",
      Pulisher: "Oxford University Press",
      Average_Ratigs: 10,
      image: {Default},
    },
    {
      ISBN: "1839DSN51",
      Title: "Romeo and Juliet",
      Author: "William Shakespeare",
      Pulisher: "Oxford University Press",
      Average_Ratigs: 10,
      image: {Default},
    },
    {
      ISBN: "1839DSN36",
      Title: "Romeo and Juliet",
      Author: "William Shakespeare",
      Pulisher: "Oxford University Press",
      Average_Ratigs: 10,
      image: {Default},
    },
    {
      ISBN: "1839DSN37",
      Title: "Romeo and Juliet",
      Author: "William Shakespeare",
      Pulisher: "Oxford University Press",
      Average_Ratigs: 10,
      image: {Default},
    },
    {
      ISBN: "1839DSN38",
      Title: "Romeo and Juliet",
      Author: "William Shakespeare",
      Pulisher: "Oxford University Press",
      Average_Ratigs: 10,
      image: {Default},
    },
    {
      ISBN: "1839DSN39",
      Title: "Romeo and Juliet",
      Author: "William Shakespeare",
      Pulisher: "Oxford University Press",
      Average_Ratigs: 10,
      image: {Default},
    },
    {
      ISBN: "1839DSN40",
      Title: "Romeo and Juliet",
      Author: "William Shakespeare",
      Pulisher: "Oxford University Press",
      Average_Ratigs: 10,
      image: {Default},
    },
    {
      ISBN: "1839DSN41",
      Title: "Romeo and Juliet",
      Author: "William Shakespeare",
      Pulisher: "Oxford University Press",
      Average_Ratigs: 10,
      image: {Default},
    },
    {
      ISBN: "1839DSN42",
      Title: "Romeo and Juliet",
      Author: "William Shakespeare",
      Pulisher: "Oxford University Press",
      Average_Ratigs: 10,
      image: {Default},
    },
    {
      ISBN: "1839DSN43",
      Title: "Romeo and Juliet",
      Author: "William Shakespeare",
      Pulisher: "Oxford University Press",
      Average_Ratigs: 10,
      image: {Default},
    },
    {
      ISBN: "1839DSN44",
      Title: "Romeo and Juliet",
      Author: "William Shakespeare",
      Pulisher: "Oxford University Press",
      Average_Ratigs: 10,
      image: {Default},
    },
    {
      ISBN: "1839DSN45",
      Title: "Romeo and Juliet",
      Author: "William Shakespeare",
      Pulisher: "Oxford University Press",
      Average_Ratigs: 10,
      image: {Default},
    },
    {
      ISBN: "1839DSN46",
      Title: "Romeo and Juliet",
      Author: "William Shakespeare",
      Pulisher: "Oxford University Press",
      Average_Ratigs: 10,
      image: {Default},
    },
    {
      ISBN: "1839DSN47",
      Title: "Romeo and Juliet",
      Author: "William Shakespeare",
      Pulisher: "Oxford University Press",
      Average_Ratigs: 10,
      image: {Default},
    }
  ]

  const currentBooks = bookResults.slice(indexOfFirstElement, indexOfLastElement);

  return(
    <div>
      <div className='database-title'>Books Database</div>
      <SearchBar/>
      <SearchFilters filters={filters} setFilters={setFilters}/>
      <BookComponent result={currentBooks} />
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} dataLength={bookResults.length} indexOfLastRow={indexOfLastElement} />
    </div>
  )
}

export default BookSearch;