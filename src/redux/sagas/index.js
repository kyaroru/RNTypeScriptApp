import {all, fork} from 'redux-saga/effects';
import common from './common';
import categories from './categories';
import products from './products';
import dashboard from './dashboard';

export default function* root() {
  yield all([fork(common), fork(categories), fork(products), fork(dashboard)]);
}
