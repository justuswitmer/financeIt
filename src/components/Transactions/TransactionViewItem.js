import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import muiStyles from '../Styling/Styling';
import './Transactions.css';

// Material-UI
import {
  TableRow,
  TableCell,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
// const startOfMonth = moment().format('MM/DD/YYYY');
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
      <TableRow classname={this.props.classes.transaction.root}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={this.props.classes.transaction.heading}>
              <p className='transactionP'>{this.props.transaction.description}</p>
              <p>${this.props.transaction.amount}</p>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>{moment(this.props.transaction.date).format('MM/DD/YYYY')}</p>
              <p>{this.props.transaction.name}</p>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </TableRow>
    );
  }
}

const mapStateToProps = reduxState => ({
  user: reduxState.user
})

export default connect(mapStateToProps)
  (withStyles(muiStyles)
    (TransactionViewItem));
