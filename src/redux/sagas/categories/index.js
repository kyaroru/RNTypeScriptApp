import {all, fork} from 'redux-saga/effects';
import list from './list';

export default function* categories() {
  yield all([fork(list)]);
}
