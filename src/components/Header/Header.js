import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
// MATERIAL-UI
import customTheme from '../Styling/Theme';
import {
  ThemeProvider,
} from '@material-ui/core/styles';

const Header = (props) => {

  return (
    <ThemeProvider theme={customTheme}>
      <div className="nav">
        <Link to="/home">
          <h2 className="nav-title">financeIt</h2>
        </Link>
      </div>
    </ThemeProvider>
  );
};

export default Header;
