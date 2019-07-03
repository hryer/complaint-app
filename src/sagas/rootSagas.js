import { all, takeEvery } from 'redux-saga/effects';
import * as Types from 'actions/types';
import { fetchAuth } from './auth';

export default function* watchSagas() {
  yield all([
    yield takeEvery(Types.REQUEST_LOGIN,fetchAuth)
  ])
}