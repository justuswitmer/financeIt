import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Material-UI
import {
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TableChartIcon from '@material-ui/icons/TableChart';
import FolderIcon from '@material-ui/icons/Folder';
import ListIcon from '@material-ui/icons/List';

// import { makeStyles } from '@material-ui/core/styles';
// const useStyles = makeStyles({
//   root: {
//     width: 375,
//     position: 'fixed',
//     bottom: 0,
//     marginTop: '20px',
//   }
// });

const Nav = (props) => {

  // const classes = useStyles();
  const [value, setValue] = React.useState('recents');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // show navigation on bottom of screen
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className='navBar'>
      <BottomNavigationAction
        label="Summary"
        value="recents"
        icon={<TableChartIcon />}
        onClick={() => props.history.push("/summary")}
      />
      <BottomNavigationAction
        id='navIcons'
        label="Categories"
        value="favorites"
        icon={<FolderIcon />}
        onClick={() => props.history.push("/categories")}
      />
      <BottomNavigationAction
        label="Transactions"
        value="nearby"
        icon={<ListIcon />}
        onClick={() => props.history.push("/transaction")}
      />
      <BottomNavigationAction
        label="Account"
        value="account"
        icon={<AccountCircleIcon />}
        onClick={() => props.history.push("/account")}
      />
    </BottomNavigation>
  );
};

export default connect(mapStoreToProps)(withRouter(Nav));
