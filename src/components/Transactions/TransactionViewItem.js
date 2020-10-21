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
  Typography,
  GridListTile,
  Switch,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
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
    this.setState({
      newTransaction: {
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
      <GridListTile cols={1}>
        {this.state.isChecked.checkedB ?
          <Accordion>

            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={this.props.classes.transaction.heading}>
                <span className='description'>
                  {this.props.transaction.description}
                </span>
                <span item xs={4} className='amount'>
                  $ {this.props.transaction.amount}
                </span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <span className='date'>{moment(this.props.transaction.date).format('MM/DD/YYYY')}</span>
                <span className='category'>{this.props.transaction.name}</span>
                <EditIcon
                  onClick={this.handleChange}
                />
                <DeleteIcon
                  value='delete'
                  onClick={this.deleteTransaction}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
          :
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <TextField
                className='description'
                label={this.props.transaction.description}
                onChange={(event) => this.newTransactionChange('description', event)}
              />
              <TextField
                className='amount'
                label={this.props.transaction.amount}
                onChange={(event) => this.newTransactionChange('amount', event)}
              />
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                className='date'
                type='date'
                label={moment(this.props.transaction.date).format('MM/DD/YYYY')}
                onChange={(event) => this.newTransactionChange('date', event)}
              />
              <FormControl
                className='category'
                variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">category</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={(event) => this.newTransactionChange('categoryId', event)}
                  label="category"
                  value={''}
                >
                  <MenuItem value="">None</MenuItem>
                  {this.props.category.map(category =>
                    <MenuItem
                      key={category.id}
                      value={category.id}
                    >{category.name}
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
              <CheckBoxIcon
                onClick={this.handleChange}
                onClick={this.updateTransaction}
              />
              <DeleteIcon
                value='delete'
                onClick={this.deleteTransaction}
              />
            </AccordionDetails>
          </Accordion>
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
