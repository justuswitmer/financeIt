import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchCategorySaga() {
  let response = yield axios({
    method: 'GET',
    url: '/api/category',
  });
  console.log('in fetchCategorySaga', response);
  yield put({
    type: "SET_CATEGORY",
    payload: response.data,
  });
}

function* addCategorySaga(action) {
  let response = yield axios({
    method: 'POST',
    url: '/api/category',
    data: action.payload
  });
  console.log('in AddCategorySaga', response);
  yield put({
    type: "GET",
    payload: response.data,
  });
}

function* categorySaga() {
  yield takeLatest('GET', fetchCategorySaga);
  yield takeLatest('ADD_CATEGORY', addCategorySaga);
}

export default categorySaga;