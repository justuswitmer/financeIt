import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Header from '../Header/Header';

import './App.css';
import SummaryView from '../Summary/SummaryView';
import SummaryNew from '../Summary/SummaryNew';
import SummaryGraph from '../Summary/SummaryGraph';
import CategoriesEdit from '../Categories/CategoriesEdit';
import CategoriesView from '../Categories/CategoriesView';
import TransactionView from '../Transactions/TransactionView';
import AccountView from '../Account/AccountView';
import TransactionEdit from '../Transactions/TransactionEdit';


class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
              component={AboutPage}
            />

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
              component={UserPage}
            />

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
              component={InfoPage}
            />

            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              component={LoginPage}
              authRedirect="/user"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              component={RegisterPage}
              authRedirect="/summarynew"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LandingPage at "/home"
              exact
              path="/home"
              component={LandingPage}
              authRedirect="/user"
            />

            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/summary"
              component={SummaryView}
            />

            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/summarynew"
              component={SummaryNew}
            />

            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/summarygraph"
              component={SummaryGraph}
            />

            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/categoriesedit"
              component={CategoriesEdit}
            />

            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/categories"
              component={CategoriesView}
            />

            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/transaction"
              component={TransactionView}
            />
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/transactionedit"
              component={TransactionEdit}
            />

            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/account"
              component={AccountView}
            />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
