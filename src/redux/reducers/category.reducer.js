// sets categories after they are fetched
const categoryReducer = (state = [], action) => {
  console.log('in category reducer', action);
  switch (action.type) {
    case 'SET_CATEGORY':
      return action.payload;
    default:
      return state;
  }
};

export default categoryReducer;