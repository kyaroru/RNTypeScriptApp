import {all, fork} from 'redux-saga/effects';
import list from './list';

export default function* products() {
  yield all([fork(list)]);
}
