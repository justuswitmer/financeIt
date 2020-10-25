import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from '@sweetalert/with-react'

// Material-UI
import {
  TableRow,
  TableCell,
  TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckBoxIcon from '@material-ui/icons/CheckBox';


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

  // updating local state with the changed values of a category
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

  // sending local state to the saga to get sent to the database
  updateCategory = () => {
    console.log('in updateCategory', this.state.updateCategory);
    this.props.dispatch({
      type: 'UPDATE_CATEGORY',
      url: `/api/category/${this.props.category.id}`,
      payload: this.state.updateCategory
    });
    // resetting local state
    this.setState({
      updateCategory: {
        category: null,
        budgetedAmount: null
      }
    });
  }

  // distpatch and confirmation to delete a category
  deleteCategory = () => {
    console.log('in deleteCategory');
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("The category has been deleted.", {
            icon: "success",
          });
          this.props.dispatch({
            type: 'DELETE_CATEGORY',
            url: `/api/category/${this.props.category.id}`,
          });
        } else {
          swal("The category has not been deleted and is safe!");
        }
      });
  }

  render() {
    return (
      <TableRow key={this.props.category.id}>
        <TableCell component="th" scope="row">
          <TextField
            placeholder={this.props.category.name}
            onChange={(event) => this.categoryChange('category', event)}
          />
        </TableCell>
        <TableCell align="right">
          <TextField
            placeholder={this.props.category.budgetedAmount}
            onChange={(event) => this.categoryChange('budgetedAmount', event)}
          />
        </TableCell>
        <TableCell align="right">
          <CheckBoxIcon
            color='primary'
            onClick={this.updateCategory}
          />
        </TableCell>
        <TableCell align="right">
          <DeleteIcon
            color='primary'
            onClick={this.deleteCategory}
          />
        </TableCell>
      </TableRow>
    );
  }
}

export default connect()(CategoriesEditItem);