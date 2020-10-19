import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
// import './Header.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

const Header = (props) => {
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
      <Link to="/home">
        <h2 className="nav-title">Financery</h2>
      </Link>
      <div className="nav-right">

        {/* Show the link to the info page and the logout button if the user is logged in */}
        {props.store.user.id && (
          <LogOutButton className="nav-link" />
        )}
      </div>
    </div>
  );
};

export default connect(mapStoreToProps)(Header);
