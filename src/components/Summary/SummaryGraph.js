import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Stretch goal to add a graph view of summary
class SummaryGraph extends Component {
  state = {
    heading: 'Summary Graphs',
  };

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(SummaryGraph);
