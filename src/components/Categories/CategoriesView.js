import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material-UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
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
      type: 'GET'
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
        <input
          type='text'
          placeholder='new category'
          onChange={(event) => this.newCategoryChange('category', event)}
          value={this.state.newCategory.category}
        />
        <input
          type='text'
          placeholder='new monthly amount'
          onChange={(event) => this.newCategoryChange('budgetedAmount', event)}
          value={this.state.newCategory.budgetedAmount}
        />
        <button
          onClick={this.addCategory}
        >Add Category
        </button>

        {this.props.category.map(category =>
          <li key={category.id}>
            {category.name} | {category.budgetedAmount}
          </li>
        )}
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