import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material-UI
import {
  TableRow,
  TableCell,
  TextField,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


class CategoriesEditItem extends Component {
  state = {
    updateCategory: {
      category: this.props.category.name,
      budgetedAmount: this.props.category.budgetedAmount
    },
    table: {
      minWidth: 200,
    },
  }

  componentDidMount = () => {
    this.props.dispatch({
      type: 'GET'
    })
  }

  categoryChange = (property, event) => {
    console.log('in  categoryChange', event.target.value);
    this.setState({
      updateCategory: {
        ...this.state.updateCategory,
        [property]: event.target.value,
        categoryId: this.props.category.id,
      }
    });
  }

  updateCategory = () => {
    console.log('in updateCategory', this.state.updateCategory);
    this.props.dispatch({
      type: 'UPDATE_CATEGORY',
      url: `/api/category/${this.props.category.id}`,
      payload: this.state.updateCategory
    });
    this.setState({
      updateCategory: {
        category: '',
        budgetedAmount: ''
      }
    });
  }

  deleteCategory = () => {
    console.log('in deleteCategory');
    this.props.dispatch({
      type: 'DELETE_CATEGORY',
      url: `/api/category/${this.props.category.id}`,
    });
  }

  render() {
    return (
      <div>
        <TableRow key={this.props.category.id}>
          <TableCell component="th" scope="row">
            <TextField
              label={this.props.category.name}
              onChange={(event) => this.categoryChange('category', event)}
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              label={this.props.category.budgetedAmount}
              onChange={(event) => this.categoryChange('budgetedAmount', event)}
            />
          </TableCell>
          <TableCell align="right">
            <Button
              variant='contained'
              color='primary'
              onClick={this.updateCategory}
            >
              Save
            </Button>
          </TableCell>
          <TableCell align="right">
            <Button
              variant='contained'
              color='primary'
              onClick={this.deleteCategory}
            >
              Delete
            </Button>
          </TableCell>
        </TableRow>
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  user: reduxState.user
})

export default connect(mapStateToProps)(CategoriesEditItem);