import { call, put } from 'redux-saga/effects'
import { REQUEST_COMPLAINTS_SUCCESS, REQUEST_COMPLAINTS_FAILED} from 'actions/types';
import { requestComplaints } from 'api/complaints';
import * as NavigationService from 'libs/navigation/NavigationServices.js'

export function* fetchComplaints(actions) {
  try {
    const datas = yield call(requestComplaints,actions.payload);

    if (datas.success == false) {
      const errData = Object.assign(datas.data,actions.payload);
      yield put({ type: REQUEST_COMPLAINTS_FAILED, errData});
    }else {
      const data = datas.data
      yield put({ type: REQUEST_COMPLAINTS_SUCCESS, data });
    }
  }
  catch (errData) {
    errData = Object.assign(errData,actions.payload);
    yield put({ type: REQUEST_COMPLAINTS_FAILED, errData });
  }
}