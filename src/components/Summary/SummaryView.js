import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

// Custom imports
import SummaryViewItem from './SummaryViewItem';
import SummarySpent from './SummarySpent';
import mapStoreToProps from '../../redux/mapStoreToProps';

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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

// Date formats for determining dates for query
const startOfMonth = moment().startOf('month').format('MM/DD/YYYY');
const endOfMonth = moment().endOf('month').format('MM/DD/YYYY');

class SummaryView extends Component {
  state = {
    heading: 'Summary',
    newDate: {
      startDate: moment().startOf('month').format('MM/DD/YYYY'),
      endDate: moment().endOf('month').format('MM/DD/YYYY'),
    }
  };

  // triggers function to dispatch summary categories
  componentDidMount() {
    this.handleClick();
    console.log('in componentDidMount', this.state.newDate);
  }

  // stores custom date changes in local state
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

  // sends dispatch for summary dates
  // sends dispatch for transactionTotalReducer
  // sends dispatch for summaryCatTotalReducer
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
    this.props.dispatch({
      type: 'FETCH_SUMMARY_CAT_TOTAL'
    });
  }

  render() {
    return (
      <div >
        <Grid container>
          <Grid item xs={12}>
            <h2 className='headingName'>{this.state.heading}</h2>
          </Grid>
          {/* child component displaying first three summary grids */}
          <SummarySpent />
          <Grid item xs={12}>
            <Accordion className='summaryCustomDateAccordian'>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="summaryDates"
              >
                <Typography >
                  <h5>Select Custom Dates</h5>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
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
                  <CheckBoxIcon
                    onClick={this.handleClick}
                  />
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table
                aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Category</TableCell>
                    <TableCell align="center">Budgeted</TableCell>
                    <TableCell align="center">Spent</TableCell>
                    <TableCell align="center">Remainder</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* child component that displays the summary items */}
                  {this.props.store.summary.map(summary =>
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
      </div >
    );
  }
}

export default connect(mapStoreToProps)(SummaryView);
