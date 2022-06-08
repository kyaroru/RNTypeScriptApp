import {takeLatest, all, fork, put, call} from 'redux-saga/effects';
import Actions from 'actions';
import api from 'api';

function* fetchProfile({data}) {
  try {
    const response = yield call(api.profile, data);
    if (response) {
      yield put(Actions.fetchProfileSuccess(response.data));
    } else {
      yield put(Actions.fetchProfileFail());
    }
  } catch (err) {
    yield put(Actions.fetchProfileFail(err));
  }
}

function* watchFetchProfile() {
  yield takeLatest(Actions.FETCH_PROFILE, fetchProfile);
}

export default function* profile() {
  yield all([fork(watchFetchProfile)]);
}
