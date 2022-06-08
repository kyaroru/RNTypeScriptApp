import {all, fork} from 'redux-saga/effects';
import profile from './profile';

export default function* dashboard() {
  yield all([fork(profile)]);
}
