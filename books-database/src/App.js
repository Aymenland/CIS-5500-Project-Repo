import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';

import BookSearch from './pages/BookSearch';
import BookRecommendation from './pages/BookRecommendation';
import TopPublishers from './pages/TopPublishers';
import TopReviewers from './pages/TopReviewers';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<BookSearch/>}/>
          <Route path="/search" element={<BookSearch/>}/>
          <Route path="/recommendations" element={<BookRecommendation/>}/>
          <Route path="/toppublishers" element={<TopPublishers/>}/>
          <Route path="/topreviewers" element={<TopReviewers/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
