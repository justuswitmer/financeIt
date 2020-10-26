import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// fetches all transactions according to date specified
function* fetchTransactionSaga(action) {
  console.log('in fetchTransactionSaga', action);
  let response = yield axios({
    method: 'POST',
    url: '/api/transaction',
    data: action.payload
  });
  yield put({
    type: "SET_TRANSACTION",
    payload: response.data,
  });
}
// adds a new transactions then fetches all transactions
function* addTransactionSaga(action) {
  console.log('in addTransactionSaga');
  yield axios({
    method: 'POST',
    url: '/api/transaction/add',
    data: action.payload
  });
  yield put({
    type: "FETCH_TRANSACTION",
    payload: action.payload.date
  });
}

// updates a transactions then fetches all transactions
function* updateTransactionSaga(action) {
  console.log('in updateTransactionSaga', action.payload.date);
  yield axios({
    method: 'PUT',
    url: action.url,
    data: action.payload
  });
  yield put({
    type: "FETCH_TRANSACTION",
    payload: action.payload.date
  });
}

// deletes a transactions then fetches all transactions
function* deleteTransactionSaga(action) {
  console.log('in deleteTransactionSaga', action.payload);
  yield axios({
    method: 'DELETE',
    url: action.url,
  });
  yield put({
    type: "FETCH_TRANSACTION",
    payload: action.payload
  });
}

function* transactionSaga() {
  yield takeLatest('FETCH_TRANSACTION', fetchTransactionSaga);
  yield takeLatest('ADD_TRANSACTION', addTransactionSaga);
  yield takeLatest('UPDATE_TRANSACTION', updateTransactionSaga);
  yield takeLatest('DELETE_TRANSACTION', deleteTransactionSaga);
}

export default transactionSaga;