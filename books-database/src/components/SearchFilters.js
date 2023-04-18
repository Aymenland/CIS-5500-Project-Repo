import React from 'react';
import propTypes from 'prop-types';
import './SearchFilters.css';

function SearchFilters ({filters, setFilters}) {

  const handleOnChange = (e) => {
    const { id, value } = e.target;
    const filter = id.split('-')[1];
    const newFilters = { ...filters };
    newFilters[filter] = value;
    setFilters(newFilters);
  }

  return(
    <div className='search-filters-container'>
      <div className="filters-wrapper">
        <select defaultValue="default" className="form-select filters-filter" aria-label="Default select example" id="filters-book" onChange={handleOnChange}>
          <option value="default">Sort by Book Name</option>
          <option value="ascending">A-Z</option>
          <option value="descending">Z-A</option>
        </select>
        <select defaultValue="default" className="form-select filters-filter" aria-label="Default select example" id="filters-rating" onChange={handleOnChange}>
          <option value="default">Sort by Ratings</option>
          <option value="ascending">Ratings: Low to High</option>
          <option value="descending">Ratings: High to Low</option>
        </select>
        <select defaultValue="default" className="form-select filters-filter" aria-label="Default select example" id="filters-year" onChange={handleOnChange}>
          <option value="default">Sort by Published Year</option>
          <option value="ascending">Oldest</option>
          <option value="descending">Newest</option>
        </select>
      </div>
    </div>
  )
}

SearchFilters.propTypes = {
  filters: propTypes.objectOf(propTypes.string).isRequired,
  setFilters: propTypes.func.isRequired,
};

export default SearchFilters;