// sets summary after dates are fetched, which determines what
// is shown on the summary view
const summaryReducer = (state = [], action) => {
  console.log('in summaryReducer ', action);
  switch (action.type) {
    case 'SET_SUMMARY':
      return action.payload;
    default:
      return state;
  }
};

// sets after the total of transactions for a specific date is fetched
export const transactionTotalReducer = (state = [], action) => {
  console.log('in summaryReducer ', action);
  switch (action.type) {
    case 'SET_TRANSACTION_TOTAL':
      return action.payload;
    default:
      return state;
  }
};

// sets after the total for the categories is fetched
export const summaryCatTotalReducer = (state = [], action) => {
  console.log('in summaryReducer ', action);
  switch (action.type) {
    case 'SET_SUMMARY_CAT_TOTAL':
      return action.payload;
    default:
      return state;
  }
};

export default summaryReducer;

