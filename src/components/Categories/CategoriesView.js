import React, { Component } from 'react';
import { connect } from 'react-redux';
import muiStyles from '../Styling/Styling';

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

import { withStyles } from '@material-ui/core/styles';

class CategoriesView extends Component {

  state = {
    heading: 'Categories',
    newCategory: {
      category: '',
      budgetedAmount: '',
      user: this.props.user.id
    },
  };

  componentDidMount = () => {
    this.props.dispatch({
      type: 'FETCH_CATEGORY'
    })
  }

  newCategoryChange = (property, event) => {
    console.log('in newCategoryChange', event.target.value);
    this.setState({
      newCategory: {
        ...this.state.newCategory,
        [property]: event.target.value
      }
    })
  }

  addCategory = () => {
    console.log('in addCategory');
    this.props.dispatch({
      type: 'ADD_CATEGORY',
      payload: this.state.newCategory
    })
    this.setState({
      newCategory: {
        category: '',
        budgetedAmount: '',
      }
    })
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
              className={this.props.classes.table}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">Categories</TableCell>
                  <TableCell align="center">Monthly Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.category.map(category =>
                  <TableRow key={category.id}>
                    <TableCell component="th" scope="row" align="center">
                      {category.name}
                    </TableCell>
                    <TableCell align="center">{category.budgetedAmount}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={() => { this.props.history.push('/categoriesedit') }}
            variant='contained'
            color='secondary'
          >Edit Categories
        </Button>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = reduxState => ({
  category: reduxState.category,
  user: reduxState.user
})

export default connect(mapStateToProps)
  (withStyles(muiStyles)
    (CategoriesView));