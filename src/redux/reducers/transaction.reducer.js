// sets transaction detail after they are set
const transactionReducer = (state = [], action) => {
  console.log('in transactionReducer', action);
  switch (action.type) {
    case 'SET_TRANSACTION':
      return action.payload;
    default:
      return state;
  }
};

// sets updated transaction detail and saves it until it is called
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