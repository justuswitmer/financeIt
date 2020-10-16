import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material-UI
import {
  TableRow,
  TableCell,
  TextField,
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
    updateCategory: {},
    table: {
      minWidth: 200,
    },
  };

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
        id: this.props.category.id
      }
    })
  }

  updateCategory = () => {
    console.log('in updateCategory', this.state.updateCategory);
    this.props.dispatch({
      type: 'UPDATE_CATEGORY',
      data: this.state.updateCategory
    });
    this.setState({
      updateCategory: {}
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
              onBlur={this.updateCategory}
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              label={this.props.category.budgetedAmount}
              onChange={(event) => this.categoryChange('budgetedAmount', event)}
              onBlur={this.updateCategory}
            />
          </TableCell>
        </TableRow>
      </div>
    );
  }
}

export default connect()(CategoriesEditItem);