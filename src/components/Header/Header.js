import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

// shows app title
const Header = (props) => {
  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title1">finance</h2>
        <h2 className='nav-title2'>it</h2>
      </Link>
    </div>
  );
};

export default Header;
