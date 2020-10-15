import React, { Component } from 'react';
import { connect } from 'react-redux';

// Custom imports
import SummaryViewItem from './SummaryViewItem';

class SummaryView extends Component {
  state = {
    heading: 'Summary',
    newDate: {
      startDate: '',
      endDate: '',
    }
  };

  componentDidMount() {
    // this.getTransactions()
  }

  getTransactions = () => {
    this.props.dispatch({
      type: 'GET'
    })
  }

  handleChange = (property, event) => {
    console.log('in handleChange', event.target.value);
    this.setState({
      newDate: {
        ...this.state.newDate,
        [property]: event.target.value
      }
    })
  }

  handleClick = () => {
    console.log('in handleClick', this.state.newDate);
    this.props.dispatch({
      type: 'FETCH_DATES',
      payload: this.state.newDate
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
        <input
          type='text'
          placeholder='start date'
          onChange={(event) => this.handleChange('startDate', event)}
        />
        <input
          type='text'
          placeholder='end date'
          onChange={(event) => this.handleChange('endDate', event)}
        />
        <button
          onClick={this.handleClick}
        >Select</button>
        {this.props.transaction.map(transaction =>
          <SummaryViewItem
            key={transaction.category}
            transaction={transaction}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  transaction: reduxState.transaction,
  category: reduxState.category
});

export default connect(mapStateToProps)(SummaryView);
