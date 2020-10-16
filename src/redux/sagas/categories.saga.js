import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchCategory() {
  let response = yield axios({
    method: 'GET',
    url: '/api/category',
  });
  console.log('in fetchCategory Saga', response);
  yield put({
    type: "SET_CATEGORY",
    payload: response.data,
  });
}

function* categorySaga() {
  yield takeLatest('GET', fetchCategory);
}

export default categorySaga;