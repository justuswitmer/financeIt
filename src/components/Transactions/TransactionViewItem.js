import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './Transactions.css';
import swal from '@sweetalert/with-react'
import mapStoreToProps from '../../redux/mapStoreToProps';

// Material-UI
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Divider,
  Typography,
  GridListTile,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
  Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Moment.js
const startOfMonth = moment().startOf('month').format('MM/DD/YYYY');
const endOfMonth = moment().endOf('month').format('MM/DD/YYYY');

class TransactionViewItem extends Component {
  state = {
    heading: 'Transactions',
    notInEditMode: true,
    newDate: {
      startDate: startOfMonth,
      endDate: endOfMonth,
    },
  };

  // stores new transaction to reduxState
  newTransactionChange = (property, event) => {
    console.log('in newTransactionChange', event.target.value);
    this.props.dispatch({
      type: 'EDIT_TRANSACTION_FOR_UPDATE',
      payload: {
        [property]: event.target.value
      },
    });
  }

  // sends new transaction to database and newDate
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

  // stores updated transation to database then triggers handleChange
  updateTransaction = () => {
    console.log('in updateTransaction', this.props.store.saveTransactionForUpdateReducer);
    this.props.dispatch({
      type: 'UPDATE_TRANSACTION',
      url: `/api/transaction/${this.props.transaction.id}`,
      payload: {
        transaction: this.props.store.saveTransactionForUpdateReducer,
        date: this.state.newDate,
        transactionId: this.props.transaction.id
      },
    });
    this.handleChange();
  }

  // sends transaction id to delete from database after confirmation message
  deleteTransaction = () => {
    console.log('in deleteTransaction');
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this transaction.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("The transaction has been deleted.", {
            icon: "success",
          });
          this.props.dispatch({
            type: 'DELETE_TRANSACTION',
            url: `/api/transaction/${this.props.transaction.id}`,
            payload: this.state.newDate
          });
        } else {
          swal("The transaction has not been deleted and is safe!");
        }
      });
  }

  // handles changing state for ternary in render, 
  // then sends dispatch with transaction details to fill in fields for editing
  handleChange = () => {
    console.log(this.state.notInEditMode);
    this.setState({
      notInEditMode: !this.state.notInEditMode
    })
    if (this.state.notInEditMode === true) {
      this.props.dispatch({
        type: 'EDIT_TRANSACTION_FOR_UPDATE',
        payload: this.props.transaction
      });
    }
  }

  render() {
    return (
      <GridListTile cols={2}>
        {/* beginning of ternary */}
        {this.state.notInEditMode ?
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon
                color='primary'
              />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant='body2'>
                <span id='description'>{this.props.transaction.description}</span>
                <span id='amount'> ${this.props.transaction.amount}</span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant='body2'>
                <span id='date'>{moment(this.props.transaction.date).format('MM/DD/YYYY')}</span>
                <span id='category'> {this.props.transaction.name}</span>
              </Typography>
            </AccordionDetails>
            <Divider />
            <AccordionActions>
              <span className='editBtn'>
                <Button
                  color='secondary'
                  size='small'
                  variant='contained'
                  onClick={this.handleChange}
                >Edit
                </Button>
              </span>
              <span className='deleteBtn'>
                <Button
                  color='secondary'
                  size='small'
                  variant='contained'
                  onClick={this.deleteTransaction}
                >Delete
                </Button>
              </span>
            </AccordionActions>
          </Accordion>
          // gives second option if state changes
          :
          <Grid container item xs={12}>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className='editTransaction'>
                  <Grid item xs={6}>
                    <TextField
                      variant='outlined'
                      label={this.props.store.saveTransactionForUpdateReducer.description}
                      value={this.props.store.saveTransactionForUpdateReducer.description}
                      onChange={(event) => this.newTransactionChange('description', event)}
                    />
                    <TextField
                      variant='outlined'
                      label={moment(this.props.store.saveTransactionForUpdateReducer.date).format('MM/DD/YYYY')}
                      value={moment(this.props.store.saveTransactionForUpdateReducer.date).format('MM/DD/YYYY')}
                      onChange={(event) => this.newTransactionChange('date', event)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant='outlined'
                      label={this.props.store.saveTransactionForUpdateReducer.amount}
                      value={this.props.store.saveTransactionForUpdateReducer.amount}
                      onChange={(event) => this.newTransactionChange('amount', event)}
                    />
                    <FormControl
                      variant='outlined'>
                      <InputLabel>{this.props.store.saveTransactionForUpdateReducer.name}</InputLabel>
                      <Select
                        onChange={(event) => this.newTransactionChange('categoryId', event)}
                        label={this.props.store.saveTransactionForUpdateReducer.name}
                      >
                        <MenuItem>
                          <em>
                            None
                          </em>
                        </MenuItem>
                        {this.props.store.category.map(category =>
                          <MenuItem
                            className='menuItem'
                            key={category.id}
                            value={category.id}
                          >{category.name}
                          </MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                </Typography>
              </AccordionDetails>
              <Divider />
              <AccordionActions id='buttonField'>
                <span className='saveBtn'>
                  <Button
                    color='secondary'
                    size='small'
                    variant='contained'
                    onClick={this.updateTransaction}
                  >Save</Button>
                </span>
                <span className='editBtn'>
                  <Button
                    color='secondary'
                    size='small'
                    variant='contained'
                    onClick={this.handleChange}
                  >Cancel</Button>
                </span>
                <span className='deleteBtn'>
                  <Button
                    color='secondary'
                    size='small'
                    variant='contained'
                    value='delete'
                    onClick={this.deleteTransaction}
                  >Delete</Button>
                </span>
              </AccordionActions>
            </Accordion>
          </Grid>
          // end ternary
        }
      </GridListTile>
    );
  }
}

export default connect(mapStoreToProps)(TransactionViewItem);
