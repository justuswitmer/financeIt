import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Material-UI
import {
  TableRow,
  TableCell,
} from '@material-ui/core';

class SummaryViewItem extends Component {
  state = {
    heading: 'Summary Items',
  };


  render() {
    return (
      <TableRow>
        <TableCell align="center">
          {this.props.summary.category}
        </TableCell>
        <TableCell align="center">
          {this.props.summary.categoryAmount}
        </TableCell>
        <TableCell align="center">
          {this.props.summary.budgetedAmount}
        </TableCell>
        <TableCell align="center">
          {Number(this.props.summary.categoryAmount) +
            Number(this.props.summary.budgetedAmount)}
        </TableCell>
      </TableRow>
    );
  }
}

export default connect(mapStoreToProps)(SummaryViewItem);