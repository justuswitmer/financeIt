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
          {this.props.transaction.category} |
          {this.props.transaction.categoryAmount} |
          {this.props.transaction.budgetedAmount}
        </li>
        <li>{Number(this.props.transaction.categoryAmount) + Number(this.props.transaction.budgetedAmount)} </li>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(SummaryViewItem);