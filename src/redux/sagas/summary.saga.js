import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// fetches the total of categories and then sets them
function* fetchSummaryCatSaga() {
  let response = yield axios({
    method: 'GET',
    url: '/api/summary',
  });
  console.log('in fetchSummaryCatSaga', response);
  yield put({
    type: "SET_SUMMARY_CAT_TOTAL",
    payload: response.data,
  });
}

// fetches all categories according to the date specified
function* fetchSummary(action) {
  console.log('in fetchSummary saga', action);
  let response = yield axios({
    method: 'POST',
    url: `/api/summary`,
    data: action.payload
  });
  console.log('this is our response', response);
  yield put({
    type: "SET_SUMMARY",
    payload: response.data,
  });
}

// fetches transaction total according to date specified
function* fetchSummaryTotalSaga(action) {
  console.log('in fetchSummaryTotalSaga', action);
  let response = yield axios({
    method: 'POST',
    url: '/api/summary/sum',
    data: action.payload
  });
  yield put({
    type: "SET_TRANSACTION_TOTAL",
    payload: response.data,
  });
}

function* summarySaga() {
  yield takeLatest('FETCH_SUMMARY_DATES', fetchSummary);
  yield takeLatest('FETCH_TRANSACTION_TOTAL', fetchSummaryTotalSaga);
  yield takeLatest('FETCH_SUMMARY_CAT_TOTAL', fetchSummaryCatSaga);
}

export default summarySaga;