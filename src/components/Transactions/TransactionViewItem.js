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
  Grid,
  GridList,
  GridListTile,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

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
      <GridListTile cols={1}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={this.props.classes.transaction.heading}>
              <p item xs={8} className='description'>
                {this.props.transaction.description}
              </p>
              <p item xs={4} className='amount'>
                $ {this.props.transaction.amount}
              </p>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p className='date'>{moment(this.props.transaction.date).format('MM/DD/YYYY')}</p>
              <p className='category'>{this.props.transaction.name}</p>
              <CheckBoxIcon />
              <DeleteIcon />
            </Typography>
          </AccordionDetails>
        </Accordion >
      </GridListTile>
    );
  }
}

const mapStateToProps = reduxState => ({
  user: reduxState.user
})

export default connect(mapStateToProps)
  (withStyles(muiStyles)
    (TransactionViewItem));
