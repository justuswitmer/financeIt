import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class SummaryViewItem extends Component {
  state = {
    heading: 'Summary Items',
  };

  render() {
    return (
      <div>

        <li>
          {this.props.transaction.category}
          {this.props.transaction.categoryAmount}
        </li>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(SummaryViewItem);