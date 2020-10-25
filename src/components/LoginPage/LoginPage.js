import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './LoginPage.css';

// MATERIAL UI
import {
  Button,
  Paper,
  TextField
} from '@material-ui/core';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    heading: 'Login',
  };

  // logic to detect if username and password fields are filled
  // and then send dispatch if so
  login = (event) => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  // sending data to reduxState for login info
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <div className='headDiv'>
        <h2 className='headingName'>{this.state.heading}</h2>
        <Paper
          id="paperLogin"
          elevation={3}>
          <form className="formPanel" onSubmit={this.login}>
            {this.props.store.errors.loginMessage && (
              <h3 className="alert" role="alert">
                {this.props.store.errors.loginMessage}
              </h3>
            )}
            <div className='loginFields'>
              <label htmlFor="username">
                <TextField
                  name="username"
                  variant='outlined'
                  placeholder='username'
                  required
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                />
              </label>
            </div>
            <div className='loginFields'>
              <label htmlFor="password">
                <TextField
                  variant='outlined'
                  type="password"
                  name="password"
                  placeholder='password'
                  required
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                />
              </label>
            </div>
            <div className='login'>
              <Button
                color='primary'
                size='small'
                variant='contained'
                className="btn"
                type="submit"
                name="submit"
                value="Log In"
              >Login
              </Button>
              <center className='registerLogin'>
                <Button
                  size='small'
                  className="btn_asLink"
                  onClick={() => {
                    this.props.history.push('/registration');
                  }}
                >Register!
                </Button>
              </center>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);
