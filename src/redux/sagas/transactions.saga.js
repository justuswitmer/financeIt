import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchTransaction() {
  let response = yield axios({
    method: 'GET',
    url: '/api/transaction',
  });
  console.log('this is our response', response);
  yield put({
    type: "SET_TRANSACTION",
    payload: response.data,
  });
}

function* transactionSaga() {
  yield takeLatest('GET', fetchTransaction);
}

export default transactionSaga;