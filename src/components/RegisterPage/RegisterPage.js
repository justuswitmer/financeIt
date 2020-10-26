import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import RegisterForm from '../RegisterForm/RegisterForm';

import { Button } from '@material-ui/core';

class RegisterPage extends Component {

  render() {
    return (
      <div>
        <RegisterForm />
        <center>
          <Button
            type="button"
            className="btn_asLink"
            onClick={() => {
              this.props.history.push('/home');
            }}
          >Login
          </Button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegisterPage);
