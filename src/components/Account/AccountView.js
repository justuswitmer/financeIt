import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSVReader from 'react-csv-reader'

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class AboutView extends Component {
  state = {
    heading: 'Account',
  };

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
        <CSVReader
          label='Upload csv file.'
          // onFileLoaded={(data, fileInfo) => console.dir(data, fileInfo)}
          onFileLoaded={this.handelFileLoad}
        />
      </div>
    )
  }
}

export default connect()(AboutView);
