import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import swal from '@sweetalert/with-react'

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
  };

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

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

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
            Username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              required
              onChange={this.handleInputChangeFor('username')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              required
              onChange={this.handleInputChangeFor('password')}
            />
          </label>
        </div>
        <div>
          <input
            className="btn"
            type="submit"
            name="submit"
            value="Register"
            onClick={this.welcome}
          />
          <input
            className="btn"
            type="button"
            name="click me"
            value="click me"
            onClick={this.welcome}
          />
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(RegisterForm);


