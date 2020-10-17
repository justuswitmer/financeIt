import React, { Component } from 'react';
import { connect } from 'react-redux';
// import moment from 'moment';

// Material-UI
import {
  TableRow,
  TableCell,
} from '@material-ui/core';

// const startOfMonth = moment().startOf('month').format('MM/DD/YYYY');
// const endOfMonth = moment().endOf('month').format('MM/DD/YYYY');

class TransactionViewItem extends Component {
  state = {
    heading: 'Transactions',
    newTransaction: {
      description: '',
      amount: '',
      date: '',
      name: '',
      account: '',
    },
    // newDate: {
    //   startDate: moment().startOf('month').format('MM/DD/YYYY'),
    //   endDate: moment().endOf('month').format('MM/DD/YYYY'),
    // }
  };

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
    })
    this.setState({
      newTransaction: {
        description: '',
        amount: '',
        date: '',
        name: '',
        account: '',
      }
    })
  }

  render() {
    return (
      <TableRow>
        <TableCell component="th" scope="row">
          {this.props.transaction.description}
        </TableCell>
        <TableCell align="right">{this.props.transaction.amount}</TableCell>
        <TableCell align="right">{this.props.transaction.date}</TableCell>
        <TableCell align="right">{this.props.transaction.name}</TableCell>
      </TableRow>
    );
  }
}

const mapStateToProps = reduxState => ({
  user: reduxState.user
})

export default connect(mapStateToProps)(TransactionViewItem);
