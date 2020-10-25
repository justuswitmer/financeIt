import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

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
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

class CategoriesView extends Component {

  state = {
    heading: 'Categories',
    newCategory: {
      category: '',
      budgetedAmount: '',
      user: this.props.store.user.id
    },
  };

  // dispatch to load the category list
  componentDidMount = () => {
    this.props.dispatch({
      type: 'FETCH_CATEGORY'
    })
  }

  // saving to local state when adding a new category change
  newCategoryChange = (property, event) => {
    console.log('in newCategoryChange', event.target.value);
    this.setState({
      newCategory: {
        ...this.state.newCategory,
        [property]: event.target.value
      }
    })
  }

  // dispatch to send new category to saga
  addCategory = () => {
    console.log('in addCategory');
    this.props.dispatch({
      type: 'ADD_CATEGORY',
      payload: this.state.newCategory
    })
    // resetting state
    this.setState({
      newCategory: {
        category: '',
        budgetedAmount: '',
      }
    })
  }

  // could clean up component by separating table body in a different component
  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <h2 className='headingName'>{this.state.heading}</h2>
        </Grid>
        <Grid item xs={12}>
          <Accordion className='addCatAccordian'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="summaryDates"
            >
              <Typography>
                <h5>Add New Category</h5>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Grid item xs={6}>
                  <TextField
                    type='text'
                    placeholder='category'
                    onChange={(event) => this.newCategoryChange('category', event)}
                    value={this.state.newCategory.category}
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type='text'
                    placeholder='monthly amount'
                    onChange={(event) => this.newCategoryChange('budgetedAmount', event)}
                    value={this.state.newCategory.budgetedAmount}
                    variant='outlined'
                  />
                </Grid>
                <CheckBoxIcon
                  onClick={this.addCategory}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left">Categories</TableCell>
                  <TableCell align="center">Monthly Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.store.category.map(category =>
                  <TableRow key={category.id}>
                    <TableCell component="th" scope="row" align="left">
                      {category.name}
                    </TableCell>
                    <TableCell align="center">{category.budgetedAmount}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid className='editCatBtn' item xs={6}>
          <Button
            onClick={() => { this.props.history.push('/categoriesedit') }}
            variant='contained'
            color='primary'
            size='small'
          >Edit Categories
        </Button>
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStoreToProps)(CategoriesView);