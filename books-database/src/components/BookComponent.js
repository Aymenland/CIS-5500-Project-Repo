import React from 'react';
import './BookComponent.css';


function BookComponent({ result }) {
  let books;
  if (result) {
    books = result.map( book => {
      return(
        <div key={book.ISBN} className='book-container'>
          <img src={book.Img_url} alt="book-img" className='book-img'/>
          <div className='information'>
            <div className="ISBN">
              ISBN: {book.ISBN}
            </div>
            <div className="book-title">
              Title: {book.Title}
            </div>
            <div>
              Author: {book.Author}
            </div>
            <div>
              Publisher: {book.Publisher}
            </div>
            <div>
              Publication Year: {book.Publication_year}
            </div>
            <div>
              Average Rating: {book.AvgRating}
            </div>
          </div>
        </div>
      )
    })
  }

  return(
    <div className="books">
      {books}
    </div>
  )
}

export default BookComponent;
