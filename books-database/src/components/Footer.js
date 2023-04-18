import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import './Footer.css'

function Footer() {
  const [page, setPage] = useState(0);
  return(
    <div className="footer">
      <div className="footer-items">
        <Link to="/search" onClick={() => setPage(1)} className={page === 1 ? "singleton_active" : "singleton"}>Book Search</Link>
        <Link to="/funfacts" onClick={() => setPage(2)} className={page === 2 ? "singleton_active" : "singleton"}>Fun Facts</Link>
        <Link to="/toppublishers" onClick={() => setPage(3)} className={page === 3 ? "singleton_active" : "singleton"}>Top Publishers</Link>
        <Link to="/topreviewers" onClick={() => setPage(4)} className={page === 4 ? "singleton_active" : "singleton"}>Top Reviewers</Link>
      </div>
    </div>
  )
}

export default Footer;