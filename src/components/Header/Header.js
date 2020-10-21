import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = (props) => {

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Financery</h2>
      </Link>
    </div>
  );
};

export default Header;
