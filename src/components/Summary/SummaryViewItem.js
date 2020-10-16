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
          {this.props.summary.category} |
          {this.props.summary.categoryAmount} |
          {this.props.summary.budgetedAmount}
        </li>
        <li>{Number(this.props.summary.categoryAmount) +
          Number(this.props.summary.budgetedAmount)} </li>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(SummaryViewItem);