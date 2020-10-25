import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './Summary.css';

// MATERIAL UI 
import {
  Grid,
  Paper
} from '@material-ui/core';


class SummarySpent extends Component {
  render() {
    return (
      <>
        <Grid id='gridSummary1' item xs={4}>
          <Paper
            id="paper"
            elevation={3}>
            <h5>Total Amount Budgeted</h5>
            {/* maps through summaryCatTotalReducer */}
            {this.props.store.summaryCatTotalReducer.map(total =>
              <p key={total.sum}>${Number(total.sum)}</p>
            )}
          </Paper>
        </Grid>
        <Grid id='gridSummary2' item xs={4}>
          <Paper
            id="paper"
            elevation={3}>
            <h5>Total Amount Spent</h5>
            {/* maps through transactionTotalReducer */}
            {this.props.store.transactionTotalReducer.map(total =>
              <p key={total.sum}
              >${Number(total.sum)}
              </p>
            )}
          </Paper>
        </Grid>
        <Grid id='gridSummary3' item xs={4}>
          <Paper
            id="paper"
            elevation={3}>
            <h5>Total Amount Remaining</h5>
            {/* maps through transactionTotalReducer and 
            summaryCatTotalReducer and subtracts one from the other*/}
            <p>${Number(this.props.store.transactionTotalReducer.map(total =>
              total.sum
            ))
              +
              Number(this.props.store.summaryCatTotalReducer.map(total =>
                total.sum
              ))}</p>
          </Paper>
        </Grid>
      </>
    );
  }
}

export default connect(mapStoreToProps)(SummarySpent);