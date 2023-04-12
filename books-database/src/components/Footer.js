import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css'

function Header() {
  return(
    <div className="footer">
      <div className="footer-items">
        <Link to="/search" className="singleton">Book Search</Link>
        <Link to="/recommendations" className="singleton">Book Recommendations</Link>
        <Link to="/toppublishers" className="singleton">Top Publishers</Link>
        <Link to="/topreviewers" className="singleton">Top Reviewers</Link>
      </div>
    </div>
  )
}

export default Header;