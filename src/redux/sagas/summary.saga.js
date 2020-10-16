import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

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

function* summarySaga() {
  yield takeLatest('FETCH_DATES', fetchSummary);
}

export default summarySaga;