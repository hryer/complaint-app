import { all, takeEvery, fork } from 'redux-saga/effects';
import { networkSaga } from 'react-native-offline';
import * as Types from 'actions/types';
import { getAuth, logoutAuth } from './auth';
import { getComplaints, postComplaint } from './complaints';

export default function* watchSagas() {
  yield all([
    takeEvery(Types.REQUEST_LOGIN,getAuth),
    takeEvery(Types.REQUEST_LOGOUT,logoutAuth),
    takeEvery(Types.REQUEST_COMPLAINTS,getComplaints),
    takeEvery(Types.REQUEST_ADD_COMPLAINT,postComplaint),
    fork(networkSaga, { pingInterval: 20000 }),
  ]);
}