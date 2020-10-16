import React, { Component } from 'react';
import { connect } from 'react-redux';

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
} from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });

class CategoriesView extends Component {

  state = {
    heading: 'Categories',
    newCategory: {
      category: '',
      budgetedAmount: '',
      user: this.props.user.id
    },
    table: {
      minWidth: 200,
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
      <div>
        <h2>{this.state.heading}</h2>

        <h3>Add New Category</h3>
        <TextField
          type='text'
          placeholder='new category'
          onChange={(event) => this.newCategoryChange('category', event)}
          value={this.state.newCategory.category}
          variant='outlined'
        />
        <TextField
          type='text'
          placeholder='new monthly amount'
          onChange={(event) => this.newCategoryChange('budgetedAmount', event)}
          value={this.state.newCategory.budgetedAmount}
          variant='outlined'
        />
        <Button
          onClick={this.addCategory}
          variant='contained'
        >Add Category
        </Button>
        <Button
          onClick={() => { this.props.history.push('/categoriesedit') }}
          variant='contained'
        >Edit Categories
        </Button>
        <TableContainer component={Paper}>
          <Table className={this.state.table.minWidth} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Categories</TableCell>
                <TableCell align="right">Monthly Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.category.map(category =>
                <TableRow key={category.id}>
                  <TableCell component="th" scope="row">
                    {category.name}
                  </TableCell>
                  <TableCell align="right">{category.budgetedAmount}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  category: reduxState.category,
  user: reduxState.user
})

export default connect(mapStateToProps)(CategoriesView);