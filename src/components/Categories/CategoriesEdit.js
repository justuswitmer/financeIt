import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoriesEditItem from './CategoriesEditItem';
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
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

class CategoriesEdit extends Component {
  state = {
    heading: 'Edit Categories',
    updateCategory: {},
  };

  componentDidMount = () => {
    this.props.dispatch({
      type: 'FETCH_CATEGORY'
    })
  }

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
        <TableContainer component={Paper}>
          <Table
            className={this.props.classes.table}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Categories</TableCell>
                <TableCell >Monthly Amount</TableCell>
                <TableCell >Save</TableCell>
                <TableCell >Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.category.map(category =>
                <CategoriesEditItem
                  category={category}
                />
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

export default connect(mapStateToProps)
  (withStyles(muiStyles)
    (CategoriesEdit));