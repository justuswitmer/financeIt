import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

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
function* addTransactionSaga(action) {
  let response = yield axios({
    method: 'POST',
    url: '/api/transaction/add',
    data: action.payload
  });
  console.log('in addTransactionSaga', response);
  yield put({
    type: "GET",
    payload: response.data,
  });
}

function* transactionSaga() {
  yield takeLatest('FETCH_TRANSACTION', fetchTransactionSaga);
  yield takeLatest('ADD_TRANSACTION', addTransactionSaga)
}

export default transactionSaga;