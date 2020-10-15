import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

// Custom imports
import SummaryViewItem from './SummaryViewItem';

// Date formats
const startOfMonth = moment().startOf('month').format('MM/DD/YYYY');
const endOfMonth = moment().endOf('month').format('MM/DD/YYYY');

class SummaryView extends Component {
  state = {
    heading: 'Summary',
    newDate: {
      startDate: moment().startOf('month').format('MM/DD/YYYY'),
      endDate: moment().endOf('month').format('MM/DD/YYYY'),
    }
  };

  componentDidMount() {
    this.handleClick();
    console.log('in componentDidMount', this.state.newDate);
  }

  handleChange = (property, event) => {
    console.log('in handleChange', event.target.value);
    console.log(startOfMonth, endOfMonth);

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

  // handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

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
