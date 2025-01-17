import { all, takeEvery, fork } from 'redux-saga/effects';
import { networkSaga } from 'react-native-offline';
import * as Types from 'actions/types';
import { getAuth, logoutAuth } from './auth';
import {
  getComplaints, postComplaint,
  getDetailComplaint,
  putComplaint
} from './complaints';
import { getOwners, getBarcodes } from './owners';

export default function* watchSagas() {
  yield all([
    takeEvery(Types.REQUEST_LOGIN, getAuth),
    takeEvery(Types.REQUEST_LOGOUT, logoutAuth),
    takeEvery(Types.REQUEST_COMPLAINTS, getComplaints),
    takeEvery(Types.REQUEST_ADD_COMPLAINT, postComplaint),
    takeEvery(Types.REQUEST_GET_OWNERS, getOwners),
    takeEvery(Types.REQUEST_GET_BARCODES, getBarcodes),
    takeEvery(Types.REQUEST_DETAIL_COMPLAINT, getDetailComplaint),
    takeEvery(Types.REQUEST_EDIT_COMPLAINT, putComplaint),
    fork(networkSaga, { pingInterval: 20000 }),
  ]);
}