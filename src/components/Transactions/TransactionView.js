import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

// Custom Imports 
import TransactionViewItem from './TransactionViewItem';

// Material-UI
import {
  Table,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';

const startOfMonth = moment().startOf('month').format('MM/DD/YYYY');
const endOfMonth = moment().endOf('month').format('MM/DD/YYYY');

class TransactionsView extends Component {
  state = {
    heading: 'Transactions',
    newTransaction: {
      description: '',
      amount: '',
      date: '',
      categoryId: '',
      account: '',
      userId: this.props.user.id
    },
    newDate: {
      startDate: moment().startOf('month').format('MM/DD/YYYY'),
      endDate: moment().endOf('month').format('MM/DD/YYYY'),
    }
  };

  componentDidMount = () => {
    this.handleClick();
    console.log('in componentDidMount Transactions', this.state.newDate);
    this.props.dispatch({
      type: 'FETCH_CATEGORY'
    })
  }

  newTransactionChange = (property, event) => {
    console.log('in newTransactionChange', event.target.value);
    this.setState({
      newTransaction: {
        ...this.state.newTransaction,
        [property]: event.target.value
      },
    })
  }

  addTransaction = () => {
    console.log('in addTransaction');
    this.props.dispatch({
      type: 'ADD_TRANSACTION',
      payload: this.state.newTransaction
    });
    this.setState({
      newTransaction: {
        description: '',
        amount: '',
        date: '',
        categoryId: '',
        account: '',
        userId: this.props.user.id
      }
    })
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
      <div>
        <h2>{this.state.heading}</h2>
        <TextField
          type='date'
          placeholder='start date'
          onChange={(event) => this.transactionDateChange('startDate', event)}
          variant='outlined'
        />
        <TextField
          type='date'
          placeholder='end date'
          onChange={(event) => this.transactionDateChange('endDate', event)}
          variant='outlined'
        />
        <Button
          onClick={this.handleClick}
          variant='contained'
        >Select Dates
        </Button>
        <h3>Add New Transaction</h3>
        <TextField
          type='text'
          placeholder='description'
          onChange={(event) => this.newTransactionChange('description', event)}
          value={this.state.newTransaction.transaction}
          variant='outlined'
        />
        <TextField
          type='text'
          placeholder='amount'
          onChange={(event) => this.newTransactionChange('amount', event)}
          value={this.state.newTransaction.budgetedAmount}
          variant='outlined'
        />
        <TextField
          type='date'
          placeholder='date'
          onChange={(event) => this.newTransactionChange('date', event)}
          value={this.state.newTransaction.budgetedAmount}
          variant='outlined'
        />
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
        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">account</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            onChange={(event) => this.newTransactionChange('account', event)}
            label="account"
            value={''}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.props.transaction.map(transaction =>
              <MenuItem
                key={transaction.id}
                value={transaction.account}
              >{transaction.account}
              </MenuItem>
            )}
          </Select>
        </FormControl>
        <Button
          onClick={this.addTransaction}
          variant='contained'
        >Add Transaction
        </Button>
        <Button
          onClick={() => { this.props.history.push('/transactionedit') }}
          variant='contained'
        >Edit Transactions
        </Button>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Account</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.transaction.map(transaction =>
                <TransactionViewItem
                  key={transaction.id}
                  transaction={transaction}
                />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  transaction: reduxState.transaction,
  user: reduxState.user,
  category: reduxState.category,
})

export default connect(mapStateToProps)(TransactionsView);
