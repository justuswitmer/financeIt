import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import summary, { transactionTotalReducer } from './summary.reducer';
import category from './category.reducer';
import transaction, { saveTransactionForUpdateReducer } from './transaction.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  summary, // pulls in category amounts from transactions if user is logged in
  transactionTotalReducer, // pulls in total amount for date specified
  category, // pulls in categories if user is logged in
  transaction, // pulls in transaction if user is logged in
  saveTransactionForUpdateReducer // saving transaction for update
});

export default rootReducer;
