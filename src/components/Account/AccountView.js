import React, { Component } from 'react';
import { connect } from 'react-redux';

// Custom Imports
import mapStoreToProps from '../../redux/mapStoreToProps';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class AboutView extends Component {
  state = {
    heading: 'Account',
  };

  // logs out user and redirects to the home page
  logOutUser = () => {
    this.props.dispatch({
      type: 'LOGOUT'
    });
    this.props.history.push('/home');
  }
  // stretch goal that would allow for uploading of file
  handelFileLoad = (data) => {
    console.log(data[3]);
    this.props.dispatch({
      type: 'ADD_TRANSACTION',
      payload: data
    });
  }

  render() {
    return (
      <div className='headDiv'>
        <h2 className='headingName'>{this.state.heading}</h2>
        {/* list out thanks, difficulties, and things to do */}
        <Accordion className='summaryCustomDateAccordian'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="summaryDates"
          >
            <Typography >
              <h5>Technology Used</h5>
            </Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <Typography variant='body2'>
              <ul >
                <li>React/Redux</li>
                <li>Node.js</li>
                <li>PostGresQL Database</li>
                <li>Material-UI</li>
                <li>Moment.js</li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className='summaryCustomDateAccordian'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="summaryDates"
          >
            <Typography >
              <h5>Challenges Overcome & Next Steps</h5>
            </Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <Typography variant='body2'>
              <ul>
                <li className='liHeader'>Challenges</li>
                <li>Customizing Material-UI</li>
                <li>Incorporating dates into my queries</li>
                <li className='liHeader'>Next Steps</li>
                <li>Incorporate Plaid API</li>
                <li>Chart.js</li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className='summaryCustomDateAccordian'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="summaryDates"
          >
            <Typography >
              <h5>Thank You</h5>
            </Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <Typography variant='body2'>
              <ul>
                <li>My wife and daughter, Priscilla & Quinn!</li>
                <li>My instructor, Edan</li>
                <li>My classmates, Tarjan cohort</li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <div className="nav-right">
          {/* Show the link to the info page and the logout button if the user is logged in */}
          {this.props.store.user.id && (
            <Button
              variant='contained'
              color='secondary'
              onClick={this.logOutUser}
            >
              Log Out
            </Button>
          )}
        </div>


        {/* <CSVReader
          label='Upload csv file.'
          // onFileLoaded={(data, fileInfo) => console.dir(data, fileInfo)}
          onFileLoaded={this.handelFileLoad}
        /> */}

      </div>
    )
  }
}


export default connect(mapStoreToProps)(AboutView);
