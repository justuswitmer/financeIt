import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoriesEditItem from './CategoriesEditItem';

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
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({
//   table: {
//     minWidth: 650,
//   },
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//   },
// }));


class CategoriesEdit extends Component {
  state = {
    heading: 'Edit Categories',
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

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
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

export default connect(mapStateToProps)(CategoriesEdit);