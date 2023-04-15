import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';

import BookSearch from './pages/BookSearch';
import FunFacts from './pages/FunFacts';
import TopPublishers from './pages/TopPublishers';
import TopReviewers from './pages/TopReviewers';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<BookSearch/>}/>
          <Route path="/search" element={<BookSearch/>}/>
          <Route path="/funfacts" element={<FunFacts/>}/>
          <Route path="/toppublishers" element={<TopPublishers/>}/>
          <Route path="/topreviewers" element={<TopReviewers/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
