import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sum } from 'mathjs'

import muiStyles from '../Styling/Styling';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import './Summary.css';

class SummarySpent extends Component {
  render() {
    return (
      <>
        <Grid id='gridSummary1' item xs={4}>
          <Paper
            id="paper"
            elevation={3}>
            <h5>Total Amount Budgeted</h5>
            {this.props.summaryCat.map(total =>
              <p key={total.sum}>${Number(total.sum)}</p>
            )}
          </Paper>
        </Grid>
        <Grid id='gridSummary2' item xs={4}>
          <Paper
            id="paper"
            elevation={3}>
            <h5>Total Amount Spent</h5>
            {this.props.totalAmount.map(total =>
              <p
                key={total.sum}

              >${Number(total.sum)}</p>
            )}
          </Paper>
        </Grid>
        <Grid id='gridSummary3' item xs={4}>
          <Paper
            id="paper"
            elevation={3}>
            <h5>Total Amount Remaining</h5>
            <p>${Number(this.props.totalAmount.map(total =>
              total.sum
            ))
              +
              Number(this.props.summaryCat.map(total =>
                total.sum
              ))}</p>
          </Paper>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = reduxState => ({
  summary: reduxState.summary,
  totalAmount: reduxState.transactionTotalReducer,
  summaryCat: reduxState.summaryCatTotalReducer,
});

export default connect(mapStateToProps)
  (withStyles(muiStyles)
    (SummarySpent));