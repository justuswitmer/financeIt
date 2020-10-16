import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchTransaction(action) {
  console.log('in fetchTransaction saga', action);
  let response = yield axios({
    method: 'POST',
    url: `/api/transaction/`,
    data: action.payload
  });
  console.log('this is our response', response);
  yield put({
    type: "SET_TRANSACTION",
    payload: response.data,
  });
}

function* transactionSaga() {
  yield takeLatest('FETCH_DATES', fetchTransaction);
}

export default transactionSaga;