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

function* updateCategorySaga(action) {
  console.log('in updateCategorySaga', action.payload);
  let response = yield axios({
    method: 'PUT',
    url: action.url,
    data: action.payload
  });
  console.log('in updateCategorySaga', action);
  yield put({
    type: "GET",
    payload: response.data
  });
}

function* deleteCategorySaga(action) {
  console.log('in updateCategorySaga', action.url);
  let response = yield axios({
    method: 'DELETE',
    url: action.url,
  });
  console.log('in updateCategorySaga', action);
  yield put({
    type: "GET",
    payload: response.data
  });
}


function* categorySaga() {
  yield takeLatest('FETCH_CATEGORY', fetchCategorySaga);
  yield takeLatest('ADD_CATEGORY', addCategorySaga);
  yield takeLatest('UPDATE_CATEGORY', updateCategorySaga);
  yield takeLatest('DELETE_CATEGORY', deleteCategorySaga);
}


export default categorySaga;