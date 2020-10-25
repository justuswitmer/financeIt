import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import swal from '@sweetalert/with-react'
import { Button } from '@material-ui/core';

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
  };

  // dispatch to send new user info to database
  registerUser = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        username: this.state.username,
        password: this.state.password,
      },
    });
  }; // end registerUser

  // saving new user info to reduxState
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  // welcome blip for new user
  welcome = () => {
    swal({
      title: "Welcome!",
      text: `Thanks for registering! You are on the summary page, which will show all your categories when you create them. 
            Click on "Categories" to begin!`,
      icon: "success",
      button: "Start Budgeting!",
    });
  }

  render() {
    return (
      <form className="formPanel" onSubmit={this.registerUser}>
        <h2>Create a new User</h2>
        {this.props.store.errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.registrationMessage}
          </h3>
        )}
        <div>
          <label htmlFor="username">
            <input
              type="text"
              name="username"
              placeholder="username"
              value={this.state.username}
              required
              onChange={this.handleInputChangeFor('username')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              required
              onChange={this.handleInputChangeFor('password')}
            />
          </label>
        </div>
        <div>
          <Button
            type="submit"
            name="submit"
            value="Register"
            onClick={this.welcome}
          >Register
          </Button>
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(RegisterForm);


