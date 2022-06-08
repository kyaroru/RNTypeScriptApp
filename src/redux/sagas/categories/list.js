import {takeLatest, all, fork, put, call} from 'redux-saga/effects';
import Actions from 'actions';
import api from 'api';

function* fetchCategories({data}) {
  try {
    const response = yield call(api.categories, data);
    if (response) {
      yield put(Actions.fetchCategoriesSuccess(response.data));
    } else {
      yield put(Actions.fetchCategoriesFail());
    }
  } catch (err) {
    yield put(Actions.fetchCategoriesFail(err));
  }
}

function* watchFetchCategories() {
  yield takeLatest(Actions.FETCH_CATEGORIES, fetchCategories);
}

export default function* categories() {
  yield all([fork(watchFetchCategories)]);
}
