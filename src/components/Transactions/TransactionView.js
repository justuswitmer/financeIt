import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TransactionViewItem from './TransactionViewItem';

// Material-UI
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
  GridList,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
} from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Moment.js
const startOfMonth = moment().startOf('month').format('MM/DD/YYYY');
const endOfMonth = moment().endOf('month').format('MM/DD/YYYY');

class TransactionsView extends Component {
  state = {
    heading: 'Transactions',
    newDate: {
      startDate: moment().startOf('month').format('MM/DD/YYYY'),
      endDate: moment().endOf('month').format('MM/DD/YYYY'),
    }
  };

  // fetches transactions and categories on load
  componentDidMount = () => {
    this.handleClick();
    this.props.dispatch({
      type: 'FETCH_CATEGORY'
    });
  }

  // stores transaction changes to reduxState
  newTransactionChange = (property, event) => {
    console.log('in newTransactionChange', event.target.value);
    this.props.dispatch({
      type: 'EDIT_TRANSACTION_FOR_UPDATE',
      payload: {
        [property]: event.target.value
      },
    });
  }

  // sends a new transaction to the database
  addTransaction = () => {
    console.log('in addTransaction');
    this.props.dispatch({
      type: 'ADD_TRANSACTION',
      payload: {
        transaction: this.props.store.saveTransactionForUpdateReducer,
        user: this.props.store.user.id,
        date: this.state.newDate,
      },
    });
  }

  // stores date change to local state
  transactionDateChange = (property, event) => {
    console.log('in transactionDateChange', event.target.value);
    console.log(startOfMonth, endOfMonth);
    this.setState({
      newDate: {
        ...this.state.newDate,
        [property]: event.target.value
      }
    })
  }

  // fetches transaction date change to database
  handleClick = () => {
    console.log('in handleClick', this.state.newDate);
    this.props.dispatch({
      type: 'FETCH_TRANSACTION',
      payload: this.state.newDate
    });
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <h2 className='headingName'>{this.state.heading}</h2>
        </Grid>
        <Grid item xs={12}>
          <Accordion className='addCatAccordian'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="summaryDates"
            >
              <Typography>
                <h5>Add New Transaction</h5>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Grid item xs={6}>
                  <TextField
                    type='text'
                    placeholder='description'
                    onChange={(event) => this.newTransactionChange('description', event)}
                    variant='outlined'
                  />
                  <TextField
                    type='text'
                    placeholder='amount'
                    onChange={(event) => this.newTransactionChange('amount', event)}
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type='date'
                    onChange={(event) => this.newTransactionChange('date', event)}
                    variant='outlined'
                  />
                  <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">category</InputLabel>
                    <Select
                      onChange={(event) => this.newTransactionChange('categoryId', event)}
                      label="category"
                    >
                      {this.props.store.category.map(category =>
                        <MenuItem
                          key={category.id}
                          value={category.id}
                        >{category.name}
                        </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <CheckBoxIcon
                  onClick={this.addTransaction}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion className='addCatAccordian'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="summaryDates"
            >
              <Typography>
                <h5>Select Custom Dates</h5>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <input
                  type='date'
                  placeholder='start date'
                  onChange={(event) => this.transactionDateChange('startDate', event)}
                  variant='outlined'
                />
                <input
                  type='date'
                  placeholder='end date'
                  onChange={(event) => this.transactionDateChange('endDate', event)}
                  variant='outlined'
                />
                <CheckBoxIcon
                  onClick={this.handleClick}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Divider
            color='primary'
          />
          <h4 className='headingName'>Transaction Details</h4>
        </Grid>
        <div>
          <GridList
            cellHeight={'auto'}
            cols={2}
          >
            {/* maps transactions to child component */}
            {this.props.store.transaction.map(transaction =>
              <TransactionViewItem
                key={transaction.id}
                transaction={transaction}
              />
            )}
          </GridList>
        </div>
      </Grid>
    );
  }
}

export default connect(mapStoreToProps)(TransactionsView);
