import React, { Component } from 'react';
import { connect } from 'react-redux';

// Custom Imports
import CSVReader from 'react-csv-reader'
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class AboutView extends Component {
  state = {
    heading: 'Account',
  };



  componentDidMount = () => {
    let loginLinkData = {
      path: '/login',
      text: 'Login / Register',
    };
    if (this.props.store.user.id != null) {
      loginLinkData.path = '/user';
      loginLinkData.text = 'Home';
    }
  }

  handelFileLoad = (data) => {
    console.log(data[3]);
    this.props.dispatch({
      type: 'ADD_TRANSACTION',
      payload: data
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>

        <div className="nav-right">

          {/* Show the link to the info page and the logout button if the user is logged in */}
          {this.props.store.user.id && (
            <LogOutButton className="nav-link" />
          )}
        </div>


        <CSVReader
          label='Upload csv file.'
          // onFileLoaded={(data, fileInfo) => console.dir(data, fileInfo)}
          onFileLoaded={this.handelFileLoad}
        />

      </div>
    )
  }
}


export default connect(mapStoreToProps)(AboutView);
