import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material-UI
import {
  TableRow,
  TableCell,
} from '@material-ui/core';

class SummaryViewItem extends Component {

  // shows three grid summaries
  render() {
    return (
      <TableRow>
        <TableCell align="left">
          {this.props.summary.category}
        </TableCell>
        <TableCell align="center">
          ${this.props.summary.budgetedAmount}
        </TableCell>
        <TableCell align="center">
          ${this.props.summary.categoryAmount}
        </TableCell>
        <TableCell align="center">
          {/* takes categoryAmount and budgetAmount and adds them together */}
          ${Number(this.props.summary.categoryAmount) +
            Number(this.props.summary.budgetedAmount)}
        </TableCell>
      </TableRow>
    );
  }
}

export default connect()(SummaryViewItem);