const transactionReducer = (state = [], action) => {
  console.log('in transactionReducer', action);
  switch (action.type) {
    case 'SET_TRANSACTION':
      return action.payload;
    default:
      return state;
  }
};

export const saveTransactionForUpdateReducer = (state = {}, action) => {
  console.log('in transactionReducer', action);
  switch (action.type) {
    case 'EDIT_TRANSACTION_FOR_UPDATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default transactionReducer;