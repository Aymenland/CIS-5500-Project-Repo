import React from 'react';
import './SearchBar.css';
import { ReactComponent as SearchIcon } from '../assets/SearchIcon.svg';

function SearchBar ({keyword, setKeyword, handleSearch}) {
  // const [keyword, setKeyword] = useState('');

  return(
    <div className='search-bar-container'>
      {keyword === '' && <SearchIcon width="25px" height="25px" color="#808080" className="search-icon" />}
      <input className='search-bar' placeholder='        Search for a book' onChange={(e) => {setKeyword(e.target.value)}}/>
      <button onClick={handleSearch} className={keyword === '' ? 'search-button-disabled' : 'search-button-active'}>
        Search
      </button>
    </div>
  )
}

export default SearchBar;