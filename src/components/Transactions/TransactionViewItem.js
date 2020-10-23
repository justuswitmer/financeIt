import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import muiStyles from '../Styling/Styling';
import './Transactions.css';
import swal from '@sweetalert/with-react'

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
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import EditIcon from '@material-ui/icons/Edit';


const startOfMonth = moment().startOf('month').format('MM/DD/YYYY');
const endOfMonth = moment().endOf('month').format('MM/DD/YYYY');

class TransactionViewItem extends Component {
  state = {
    heading: 'Transactions',
    isChecked: {
      checkedA: false,
      checkedB: true,
    },
    newDate: {
      startDate: startOfMonth,
      endDate: endOfMonth,
    },
  };

  componentDidMount = () => {
    console.log('in componentDidMount');
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

  updateTransaction = () => {
    console.log('in updateTransaction', this.props.updatedTransaction);
    this.props.dispatch({
      type: 'UPDATE_TRANSACTION',
      url: `/api/transaction/${this.props.transaction.id}`,
      payload: {
        transaction: this.props.updatedTransaction,
        date: this.state.newDate,
        transactionId: this.props.transaction.id
      },
    });
    this.handleChange();
  }

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

  handleChange = (event) => {
    console.log(this.state.isChecked.checkedB);
    this.setState({
      isChecked: {
        checkedB: !this.state.isChecked.checkedB
      }
    })
  }

  render() {
    return (
      <GridListTile cols={2}>
        {this.state.isChecked.checkedB ?
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant='body2' className={this.props.classes.transaction.heading}>
                <span id='description'>
                  {this.props.transaction.description} ${this.props.transaction.amount}
                </span>
                <span className='deleteBtn'>
                  <DeleteIcon
                    value='delete'
                    color='primary'
                    onClick={this.deleteTransaction}
                  />
                </span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <span id='date'>{moment(this.props.transaction.date).format('MM/DD/YYYY')} {this.props.transaction.name}</span>
              </Typography>
            </AccordionDetails>
            <Divider />
            <AccordionActions>
              <span className='editBtn'>
                <EditIcon
                  onClick={this.handleChange}
                />
              </span>
            </AccordionActions>
          </Accordion>
          :
          <Grid container item xs={12}>
            <Accordion >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={this.props.classes.transaction.heading}>
                  <span className='updateDeleteBtn'>
                    <DeleteIcon
                      value='delete'
                      onClick={this.deleteTransaction}
                    />
                  </span>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className='editTransaction'>
                  <Grid item xs={6}>
                    <TextField
                      variant='outlined'
                      label={this.props.transaction.description}
                      type='text'
                      id='description'
                      placeholder={this.props.transaction.description}
                      onChange={(event) => this.newTransactionChange('description', event)}
                    />
                    <TextField
                      variant='outlined'
                      label={this.props.transaction.amount}
                      id='amount'
                      placeholder={this.props.transaction.amount}
                      onChange={(event) => this.newTransactionChange('amount', event)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant='outlined'
                      label={moment(this.props.transaction.date).format('MM/DD/YYYY')}
                      id='date'
                      placeholder={moment(this.props.transaction.date).format('MM/DD/YYYY')}
                      onChange={(event) => this.newTransactionChange('date', event)}
                    />
                    <FormControl
                      variant='outlined'
                      id='category'
                    >
                      <InputLabel id="demo-simple-select-outlined-label">category</InputLabel>
                      <Select
                        onChange={(event) => this.newTransactionChange('categoryId', event)}
                        label="category"
                        value={this.props.transactions.id}
                      >
                        {this.props.category.map(category =>
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
              <AccordionActions>
                <span className='updateSaveBtn'>
                  <CheckBoxIcon
                    onClick={this.updateTransaction}
                  />
                </span>
                <span className='editBtn'>
                  <EditIcon
                    onClick={this.handleChange}
                  />
                </span>
              </AccordionActions>
            </Accordion>
          </Grid>
        }
      </GridListTile>
    );
  }
}

const mapStateToProps = reduxState => ({
  user: reduxState.user,
  category: reduxState.category,
  transactions: reduxState.transaction,
  updatedTransaction: reduxState.saveTransactionForUpdateReducer
})

export default connect(mapStateToProps)
  (withStyles(muiStyles)
    (TransactionViewItem));
