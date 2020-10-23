// IMPORTS
import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';

// Component Imports
import './Appp.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

// CONSTANT COMPONENTS
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

// LOGIN AND REGISTRATION COMPONENTS
import UserPage from '../UserPage/UserPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

// ACTUAL CONTENT OF APP
import SummaryView from '../Summary/SummaryView';
import SummaryGraph from '../Summary/SummaryGraph';
import CategoriesEdit from '../Categories/CategoriesEdit';
import CategoriesView from '../Categories/CategoriesView';
import TransactionView from '../Transactions/TransactionView';
import AccountView from '../Account/AccountView';
import TransactionEdit from '../Transactions/TransactionEdit';

// MATERIAL-UI
import customTheme from '../Styling/Theme';
import {
  ThemeProvider,
} from '@material-ui/core/styles';

// PROTECTED ROUTE //
//logged in shows UserPage else shows LoginPage
/* For protected routes, the view could show one of several things on the same route.
Visiting localhost:3000/user will show the UserPage if the user is logged in.
If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
Even though it seems like they are different pages, the user is always on localhost:3000/user */

// AUTH REDIRECT //
/* When a value is supplied for the authRedirect prop the user will
be redirected to the path supplied when logged in, otherwise they will
be taken to the component and exact path supplied. */


class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <ThemeProvider theme={customTheme}>
        <Router>
          <div className='pageContainer'>
            <div className='background'>
              <div className='app'>
                <Header />
                <Switch>
                  {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
                  <Redirect exact from="/" to="/home" />
                  <ProtectedRoute
                    exact path="/user"
                    component={UserPage}
                  />
                  <ProtectedRoute
                    exact path="/login"
                    component={LoginPage}
                    authRedirect="/user"
                  />
                  <ProtectedRoute
                    exact path="/registration"
                    component={RegisterPage}
                    authRedirect="/summary"
                  />
                  <ProtectedRoute
                    exact path="/home"
                    component={LandingPage}
                    authRedirect="/user"
                  />
                  <ProtectedRoute
                    exact path="/summary"
                    component={SummaryView}
                  />
                  <ProtectedRoute
                    exact path="/summarygraph"
                    component={SummaryGraph}
                  />
                  <ProtectedRoute
                    exact path="/categoriesedit"
                    component={CategoriesEdit}
                  />
                  <ProtectedRoute
                    exact path="/categories"
                    component={CategoriesView}
                  />
                  <ProtectedRoute
                    exact path="/transaction"
                    component={TransactionView}
                  />
                  <ProtectedRoute
                    exact path="/transactionedit"
                    component={TransactionEdit}
                  />
                  <ProtectedRoute
                    exact path="/account"
                    component={AccountView}
                  />
                  {/* If none of the other routes matched, we will show a 404. */}
                  <Route render={() => <h1>404</h1>} />
                </Switch>
                <Footer />
              </div>
              <Nav />
            </div>

          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default connect()(App);
