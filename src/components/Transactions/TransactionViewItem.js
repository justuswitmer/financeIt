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
  Button,
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
    root: {
      width: '100%',
    },
    heading: {
      fontSize: '18px',
    },
    secondaryHeading: {
      fontSize: '14px',
      color: 'blue',
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    details: {
      alignItems: 'center',
    },
    column: {
      flexBasis: '33.33%',
    },
    helper: {
      borderLeft: `2px solid #333333`,
      padding: '5px',
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
                  color='primary'
                  size='small'
                  variant='contained'
                  onClick={this.handleChange}
                >Edit
                </Button>
              </span>
              <span className='deleteBtn'>
                <Button
                  color='primary'
                  size='small'
                  variant='contained'
                  onClick={this.deleteTransaction}
                >Delete
                </Button>
              </span>
            </AccordionActions>
          </Accordion>
          :
          <Grid container item xs={12}>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={this.props.classes.transaction.heading}>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className='editTransaction'>
                  <Grid item xs={6}>
                    <TextField
                      variant='outlined'
                      label={this.props.transaction.description}
                      type='text'

                      value={this.props.transaction.description}
                      onChange={(event) => this.newTransactionChange('description', event)}
                    />
                    <TextField
                      variant='outlined'
                      label={this.props.transaction.amount}

                      value={this.props.transaction.amount}
                      onChange={(event) => this.newTransactionChange('amount', event)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant='outlined'
                      label={moment(this.props.transaction.date).format('MM/DD/YYYY')}

                      value={moment(this.props.transaction.date).format('MM/DD/YYYY')}
                      onChange={(event) => this.newTransactionChange('date', event)}
                    />
                    <FormControl
                      variant='outlined'

                    >
                      <InputLabel id="demo-simple-select-outlined-label">{this.props.transaction.name}</InputLabel>
                      <Select
                        onChange={(event) => this.newTransactionChange('categoryId', event)}
                        label="category"
                        value={this.props.transactions.id}
                      >
                        {this.props.category.map(category =>
                          <MenuItem
                            className='menuItem'
                            key={category.id}
                            value={category.name}
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
                    color='primary'
                    size='small'
                    variant='contained'
                    onClick={this.updateTransaction}
                  >Save</Button>
                </span>
                <span className='editBtn'>
                  <Button
                    color='primary'
                    size='small'
                    variant='contained'
                    onClick={this.handleChange}
                  >Cancel</Button>
                </span>
                <span className='deleteBtn'>
                  <Button
                    color='primary'
                    size='small'
                    variant='contained'
                    value='delete'
                    color='primary'
                    onClick={this.deleteTransaction}
                  >Delete</Button>
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
