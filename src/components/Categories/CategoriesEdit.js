import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoriesEditItem from './CategoriesEditItem';
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
} from '@material-ui/core';

class CategoriesEdit extends Component {
  state = {
    heading: 'Edit Categories',
  };

  // dispatch for loading category summary
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
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Categories</TableCell>
                <TableCell >Monthly Amount</TableCell>
                <TableCell ></TableCell>
                <TableCell ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.store.category.map(category =>
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

export default connect(mapStoreToProps)(CategoriesEdit);