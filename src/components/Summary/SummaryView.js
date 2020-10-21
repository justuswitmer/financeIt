import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';


// Custom imports
import SummaryViewItem from './SummaryViewItem';
import muiStyles from '../Styling/Styling';

// Material-UI
import {
  Paper,
  Grid,
  Table,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// Date formats
const startOfMonth = moment().startOf('month').format('MM/DD/YYYY');
const endOfMonth = moment().endOf('month').format('MM/DD/YYYY');

let total;
class SummaryView extends Component {
  state = {
    heading: 'Summary',
    newDate: {
      startDate: moment().startOf('month').format('MM/DD/YYYY'),
      endDate: moment().endOf('month').format('MM/DD/YYYY'),
    }
  };

  componentDidMount() {
    this.handleClick();
    console.log('in componentDidMount', this.state.newDate);
  }

  handleChange = (property, event) => {
    console.log('in handleChange', event.target.value);
    console.log(startOfMonth, endOfMonth);

    this.setState({
      newDate: {
        ...this.state.newDate,
        [property]: event.target.value
      }
    })
  }

  handleClick = () => {
    console.log('in handleClick', this.state.newDate);
    this.props.dispatch({
      type: 'FETCH_SUMMARY_DATES',
      payload: this.state.newDate
    });
    this.props.dispatch({
      type: 'FETCH_TRANSACTION_TOTAL',
      payload: this.state.newDate
    });
  }



  render() {
    return (
      <div className={this.props.classes.grid.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h2>{this.state.heading}</h2>
          </Grid>
          <Grid item xs={12}>
            {this.props.totalAmount.map(total =>
              <p key={total.sum}>${Number(total.sum)}</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <input
              type='date'
              placeholder='start date'
              onChange={(event) => this.handleChange('startDate', event)}
            />
            <input
              type='date'
              placeholder='end date'
              onChange={(event) => this.handleChange('endDate', event)}
            />
          </Grid>
          <Grid item xs={12}>
            <button
              onClick={this.handleClick}
            >Select Dates</button>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Category</TableCell>
                    <TableCell align="center">Spent</TableCell>
                    <TableCell align="center">Not Spent</TableCell>
                    <TableCell align="center">Amount Over/Under</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.summary.map(summary =>
                    <SummaryViewItem
                      key={summary.category}
                      summary={summary}
                    />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

        </Grid>
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  summary: reduxState.summary,
  totalAmount: reduxState.transactionTotalReducer,
  category: reduxState.category,
});

export default connect(mapStateToProps)
  (withStyles(muiStyles)
    (SummaryView));
