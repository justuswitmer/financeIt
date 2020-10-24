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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
          <h2 className='headingName'>{this.state.heading}</h2>
        </Grid>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="summaryDates"
            >
              <Typography className={this.props.classes.transaction.heading}>
                <h5>Add New Transaction</h5>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Grid item xs={6}>
                  <TextField
                    type='text'
                    placeholder='description'
                    onChange={(event) => this.newTransactionChange('description', event)}
                    variant='outlined'
                  />
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
                  <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">category</InputLabel>
                    <Select
                      onChange={(event) => this.newTransactionChange('categoryId', event)}
                      label="category"
                    >
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
                <CheckBoxIcon
                  onClick={this.addTransaction}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="summaryDates"
            >
              <Typography className={this.props.classes.transaction.heading}>
                <h5>Select Custom Dates</h5>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <input
                  type='date'
                  placeholder='start date'
                  onChange={(event) => this.transactionDateChange('startDate', event)}
                  variant='outlined'
                />
                <input
                  type='date'
                  placeholder='end date'
                  onChange={(event) => this.transactionDateChange('endDate', event)}
                  variant='outlined'
                />
                <CheckBoxIcon
                  onClick={this.handleClick}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <h4 className='headingName'>Transaction Details</h4>
        </Grid>
        <div className={this.props.classes.transaction.root}>
          <GridList
            cellHeight={'auto'}
            className={this.props.classes.transaction.gridlist}
            cols={2}
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
