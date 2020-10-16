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

function* transactionSaga() {
  yield takeLatest('FETCH_TRANSACTION', fetchTransactionSaga);
}

export default transactionSaga;