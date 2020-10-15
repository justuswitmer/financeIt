import React, { Component } from 'react';
import { connect } from 'react-redux';

// Custom imports
import SummaryViewItem from './SummaryViewItem';

class SummaryView extends Component {
  state = {
    heading: 'Summary',
  };

  componentDidMount() {
    this.getTransactions()
  }

  getTransactions = () => {
    this.props.dispatch({
      type: 'GET'
    })
  }

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
        <>
          {this.props.transaction.map(transaction =>
            <SummaryViewItem

              transaction={transaction}
            />
          )}
        </>
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  transaction: reduxState.transaction
});

export default connect(mapStateToProps)(SummaryView);
