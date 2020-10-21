import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import muiStyles from '../Styling/Styling';

// Custom Imports 
import TransactionViewItem from './TransactionViewItem';

// Material-UI
import {
  TextField,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
  GridList,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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

  componentDidMount = () => {
    this.handleClick();
    this.props.dispatch({
      type: 'FETCH_CATEGORY'
    });
  }

  newTransactionChange = (property, event) => {
    console.log('in newTransactionChange', event.target.value);
    this.props.dispatch({
      type: 'EDIT_TRANSACTION_FOR_UPDATE',
      payload: {
        [property]: event.target.value
      },
    })
  }

  addTransaction = () => {
    console.log('in addTransaction');
    this.props.dispatch({
      type: 'ADD_TRANSACTION',
      payload: {
        transaction: this.props.updatedTransaction,
        user: this.props.user.id,
        date: this.state.newDate,
      },
    });
  }

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

  handleClick = () => {
    console.log('in handleClick', this.state.newDate);
    this.props.dispatch({
      type: 'FETCH_TRANSACTION',
      payload: this.state.newDate
    });
  }

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h2>{this.state.heading}</h2>
        </Grid>
        <Grid item xs={12}>
          <h3>Add New Transaction</h3>
        </Grid>
        <Grid item xs={6}>
          <TextField
            type='text'
            placeholder='description'
            onChange={(event) => this.newTransactionChange('description', event)}
            variant='outlined'
          />
        </Grid>
        <Grid item xs={6}>
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
            placeholder='date'
            onChange={(event) => this.newTransactionChange('date', event)}
            variant='outlined'
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">category</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={(event) => this.newTransactionChange('categoryId', event)}
              label="category"
              value={''}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.props.category.map(category =>
                <MenuItem
                  key={category.id}
                  value={category.id}
                >{category.name}
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={this.addTransaction}
            variant='contained'
            color='secondary'
          >Add Transaction
        </Button>
        </Grid>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={6}>
          <TextField
            type='date'
            placeholder='start date'
            onChange={(event) => this.transactionDateChange('startDate', event)}
            variant='outlined'
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type='date'
            placeholder='end date'
            onChange={(event) => this.transactionDateChange('endDate', event)}
            variant='outlined'
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={this.handleClick}
            variant='contained'
            color='secondary'
          >Select Dates
        </Button>
        </Grid>
        <div className={this.props.classes.transaction.root}>
          <GridList
            cellHeight={'auto'}
            className={this.props.classes.transaction.gridlist}
            cols={1}
          >
            {this.props.transaction.map(transaction =>
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

const mapStateToProps = reduxState => ({
  transaction: reduxState.transaction,
  user: reduxState.user,
  category: reduxState.category,
  updatedTransaction: reduxState.saveTransactionForUpdateReducer
})

export default connect(mapStateToProps)
  (withStyles(muiStyles)
    (TransactionsView));
