const summaryReducer = (state = [], action) => {
  console.log('in summaryReducer ', action);
  switch (action.type) {
    case 'SET_SUMMARY':
      return action.payload;
    default:
      return state;
  }
};

export const transactionTotalReducer = (state = [], action) => {
  console.log('in summaryReducer ', action);
  switch (action.type) {
    case 'SET_TRANSACTION_TOTAL':
      return action.payload;
    default:
      return state;
  }
};

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

