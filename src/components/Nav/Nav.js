import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

const Nav = (props) => {
  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <div className="nav-right">
        <Link className="nav-link" to="/summary">
          Summary
        </Link>
        <Link className="nav-link" to="/categories">
          Categories
        </Link>
        <Link className="nav-link" to="/transactions">
          Transactions
        </Link>
        <Link className="nav-link" to="/account">
          Account
        </Link>
      </div>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
