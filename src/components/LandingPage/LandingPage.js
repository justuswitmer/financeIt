import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../LoginForm/LoginForm';


import './LandingPage.css';

class LandingPage extends Component {
  state = {
    heading: 'Welcome to Financery!',
  };

  render() {
    return (
      <div className="container">
        <h2>{this.state.heading}</h2>

        <div className="grid">
          <div className="grid-col grid-col_12">
            <LoginForm />
            <center>
              <button
                type="button"
                className="btn btn_asLink"
                onClick={() => {
                  this.props.history.push('/registration');
                }}
              >
                Not a user? Register now!
              </button>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
