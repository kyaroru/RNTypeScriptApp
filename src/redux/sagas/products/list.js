import {takeLatest, all, fork, put, call} from 'redux-saga/effects';
import Actions from 'actions';
import api from 'api';

function* fetchProducts({data}) {
  try {
    let response;
    if (data?.category && data.category !== null) {
      const {category, ...otherData} = data;
      response = yield call(api.productsByCategory, category, otherData);
    } else {
      response = yield call(api.products, data);
    }
    if (response) {
      yield put(Actions.fetchProductsSuccess(response.data));
    } else {
      yield put(Actions.fetchProductsFail());
    }
  } catch (err) {
    yield put(Actions.fetchProductsFail(err));
  }
}

function* watchFetchProducts() {
  yield takeLatest(Actions.FETCH_PRODUCTS, fetchProducts);
}

export default function* products() {
  yield all([fork(watchFetchProducts)]);
}
