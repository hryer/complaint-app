import { all, takeEvery, fork } from 'redux-saga/effects';
import { networkSaga } from 'react-native-offline';
import * as Types from 'actions/types';
import { fetchAuth, directPages } from './auth';
import { fetchComplaints } from './complaints';

export default function* watchSagas() {
  yield all([
    takeEvery(Types.REQUEST_LOGIN,fetchAuth),
    takeEvery(Types.REQUEST_COMPLAINTS,fetchComplaints),
    fork(networkSaga, { pingInterval: 20000 }),
  ]);
}