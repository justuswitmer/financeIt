import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// fetches categories to display in Categories page
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

// sends new category to database then fetches them
function* addCategorySaga(action) {
  let response = yield axios({
    method: 'POST',
    url: '/api/category',
    data: action.payload
  });
  console.log('in AddCategorySaga', response);
  yield put({
    type: "FETCH_CATEGORY",
    payload: response.data,
  });
}

// updates a category then fetches them
function* updateCategorySaga(action) {
  console.log('in updateCategorySaga', action.payload);
  let response = yield axios({
    method: 'PUT',
    url: action.url,
    data: action.payload
  });
  yield put({
    type: "FETCH_CATEGORY",
    payload: response.data
  });
}

// deletes a category then fetches them
function* deleteCategorySaga(action) {
  console.log('in updateCategorySaga', action.url);
  let response = yield axios({
    method: 'DELETE',
    url: action.url,
  });
  yield put({
    type: "FETCH_CATEGORY",
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