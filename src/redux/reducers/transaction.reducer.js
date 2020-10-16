const transactionReducer = (state = [], action) => {
  console.log('in transactionReducer', action);
  switch (action.type) {
    case 'SET_TRANSACTION':
      return action.payload;
    default:
      return state;
  }
};

export default transactionReducer;