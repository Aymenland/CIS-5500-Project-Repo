import React from 'react';
import './BookComponent.css';


function BookComponent({ result }) {

  const books = result.map( book => {
    return(
      <div key={book.ISBN} className='book-container'>
        <img src={book.image.Default} alt="book-img" className='book-img'/>
        <div className='information'>
          <div>
            ISBN: {book.ISBN}
          </div>
          <div>
            Title: {book.Title}
          </div>
          <div>
            Author: {book.Author}
          </div>
          <div>
            Publisher: {book.Publisher}
          </div>
          <div>
            Average Rating: {book.Average_Rating}
          </div>
        </div>
      </div>
    )
  })

  return(
    <div className="books">
      {books}
    </div>
  )
}

export default BookComponent;
