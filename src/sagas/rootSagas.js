import { all, takeEvery, fork } from 'redux-saga/effects';
// import { networkEventsListenerSaga } from 'react-native-offline';
import * as Types from 'actions/types';
import { fetchAuth } from './auth';

export default function* watchSagas() {
  yield all([
    yield takeEvery(Types.REQUEST_LOGIN,fetchAuth),
    // fork(networkEventsListenerSaga, { timeout: 2000, checkConnectionInterval: 20000 }),
  ]);
}