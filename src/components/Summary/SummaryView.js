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

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
        <input
          type='date'
          placeholder='start date'
          onChange={(event) => this.handleChange('startDate', event)}
        />
        <input
          type='date'
          placeholder='end date'
          onChange={(event) => this.handleChange('endDate', event)}
        />
        <button
          onClick={this.handleClick}
        >Select</button>

        {this.props.summary.map(summary =>
          <SummaryViewItem
            key={summary.category}
            summary={summary}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  summary: reduxState.summary,
  category: reduxState.category
});

export default connect(mapStateToProps)(SummaryView);
