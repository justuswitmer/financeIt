import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
// import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';
import muiStyles from '../Styling/Styling';
import clsx from 'clsx';

// Material-UI
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  list: {
    width: 120
  },
  fullList: {
    width: '120',
  },
});

const Nav = (props) => {

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  ///////////// MATERIAL UI /////////////

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button>
          <Link className="nav-link" to="/summary">
            Summary
          </Link>
        </ListItem>
        <ListItem button>
          <Link className="nav-link" to="/categories">
            Categories
          </Link>
        </ListItem>
        <ListItem button>
          <Link className="nav-link" to="/transaction">
            Transactions
          </Link>
        </ListItem>
        <ListItem button>
          <Link className="nav-link" to="/account">
            Account
          </Link>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={props.classes.grid.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={props.classes.menuButton} color="inherit" aria-label="menu">
            <div>
              <React.Fragment>
                <MenuIcon onClick={toggleDrawer('top', true)} />
                <Drawer anchor={'top'} open={state['top']} onClose={toggleDrawer('top', false)}>
                  {list('top')}
                </Drawer>
              </React.Fragment>
            </div>
          </IconButton>
          <Typography variant="h6" className={props.classes.title}>
            <Link to="/home">
              <h2 className="nav-title">Financery</h2>
            </Link>
          </Typography>
          <Button color='inherit' className="nav-right">

            {/* Show the link to the info page and the logout button if the user is logged in */}
            {props.store.user.id && (
              <LogOutButton className="nav-link" />
            )}
          </Button>


        </Toolbar>
      </AppBar>
    </div>
  );
};

export default connect(mapStoreToProps)
  (withStyles(muiStyles)
    (Nav));
