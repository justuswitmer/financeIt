import React, { Component } from 'react';
import { connect } from 'react-redux';
// import moment from 'moment';

// Material-UI
import {
  TableRow,
  TableCell,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';

// const startOfMonth = moment().startOf('month').format('MM/DD/YYYY');
// const endOfMonth = moment().endOf('month').format('MM/DD/YYYY');

class TransactionEditItem extends Component {
  state = {
    heading: 'Transactions',
    updateTransaction: {
      description: this.props.transaction.description,
      amount: this.props.transaction.amount,
      date: this.props.transaction.date,
      categoryId: this.props.transaction.categoryId,
      account: this.props.transaction.account,
      transactionId: this.props.transaction.id,
      user: this.props.user.id,
    },
  };

  componentDidMount = () => {
    this.props.dispatch({
      type: 'FETCH_TRANSACTION'
    })
  }

  transactionChange = (property, event) => {
    console.log('in  transactionChange', event.target.value);
    this.setState({
      updateTransaction: {
        ...this.state.updateTransaction,
        [property]: event.target.value,
      }
    });
  }

  updateTransaction = () => {
    console.log('in updateTransaction', this.state.updateTransaction);
    this.props.dispatch({
      type: 'UPDATE_TRANSACTION',
      url: `/api/transaction/${this.props.transaction.id}`,
      payload: this.state.updateTransaction
    });
    this.setState({
      updateTransaction: {
        description: '',
        amount: '',
        date: '',
        categoryId: '',
        account: '',
      }
    });
  }

  deleteTransaction = () => {
    console.log('in deleteTransaction');
    this.props.dispatch({
      type: 'DELETE_TRANSACTION',
      url: `/api/transaction/${this.props.transaction.id}`,
    });
  }

  render() {
    return (
      <TableRow>
        <TableCell
          component="th"
          scope="row">
          <TextField
            label={this.props.transaction.description}
            onChange={(event) => this.transactionChange('description', event)}
          />
        </TableCell>
        <TableCell
          align="right">
          <TextField
            label={this.props.transaction.amount}
            onChange={(event) => this.transactionChange('amount', event)}
          />

        </TableCell>
        <TableCell
          align="right">
          <TextField
            label={this.props.transaction.date}
            onChange={(event) => this.transactionChange('date', event)}
          />
        </TableCell>
        <TableCell
          align="right">
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">category</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={(event) => this.transactionChange('categoryId', event)}
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
        </TableCell>
        <TableCell
          align="right">
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">account</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={(event) => this.transactionChange('account', event)}
              label="account"
              value={''}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.props.transactions.map(transaction =>
                <MenuItem
                  key={transaction.id}
                  value={transaction.account}
                >{transaction.account}
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </TableCell>
        <TableCell align="right">
          <Button
            variant='contained'
            color='primary'
            onClick={this.updateTransaction}
          >
            Save
            </Button>
        </TableCell>
        <TableCell
          align="right">
          <Button
            variant='contained'
            color='primary'
            onClick={this.deleteTransaction}
          >Delete
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

const mapStateToProps = reduxState => ({
  user: reduxState.user,
  category: reduxState.category,
  transactions: reduxState.transaction,
})

export default connect(mapStateToProps)(TransactionEditItem);
