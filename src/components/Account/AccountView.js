import React, { Component } from 'react';
import { connect } from 'react-redux';

// Custom Imports
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button } from '@material-ui/core';

class AboutView extends Component {
  state = {
    heading: 'Account',
  };

  // logs out user and redirects to the home page
  logOutUser = () => {
    this.props.dispatch({
      type: 'LOGOUT'
    });
    this.props.history.push('/home');
  }
  // stretch goal that would allow for uploading of file
  handelFileLoad = (data) => {
    console.log(data[3]);
    this.props.dispatch({
      type: 'ADD_TRANSACTION',
      payload: data
    });
  }

  render() {
    return (
      <div className='headDiv'>
        <h2 className='headingName'>{this.state.heading}</h2>
        {/* list out thanks, difficulties, and things to do */}
        <ul>
          <li>
            This is my gratitude page
        </li>
        </ul>

        <div className="nav-right">
          {/* Show the link to the info page and the logout button if the user is logged in */}
          {this.props.store.user.id && (
            <Button
              variant='contained'
              color='primary'
              onClick={this.logOutUser}
            >
              Log Out
            </Button>
          )}
        </div>


        {/* <CSVReader
          label='Upload csv file.'
          // onFileLoaded={(data, fileInfo) => console.dir(data, fileInfo)}
          onFileLoaded={this.handelFileLoad}
        /> */}

      </div>
    )
  }
}


export default connect(mapStoreToProps)(AboutView);
