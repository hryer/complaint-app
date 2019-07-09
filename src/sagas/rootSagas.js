import { all, takeEvery, fork } from 'redux-saga/effects';
// import { networkEventsListenerSaga } from 'react-native-offline';
// import { networkSaga } from 'react-native-offline';
import * as Types from 'actions/types';
import { fetchAuth, directPages } from './auth';

export default function* watchSagas() {
  yield all([
    takeEvery(Types.REQUEST_LOGIN,fetchAuth),
    // takeEvery(Types.REQUEST_LOGIN_SUCCESS,directPages),
    // fork(networkSaga, { pingInterval: 20000 }),
    // fork(networkEventsListenerSaga),
  ]);
}