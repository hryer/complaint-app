import { call, put } from 'redux-saga/effects'
import { REQUEST_COMPLAINTS, REQUEST_COMPLAINTS_SUCCESS, REQUEST_COMPLAINTS_FAILED,
          REQUEST_ADD_COMPLAINT_SUCCESS, REQUEST_ADD_COMPLAINT_FAILED 
} from 'actions/types';
import { requestComplaints, requestAddComplaint } from 'api/complaints';
import * as NavigationService from 'libs/navigation/NavigationServices.js';

export function* getComplaints(actions) {
  try {
    const datas = yield call(requestComplaints,actions.payload);

    if (datas.success == false) {
      const errData = Object.assign(datas.data,actions.payload);
      yield put({ type: REQUEST_COMPLAINTS_FAILED, errData});
    }else {
      const data = datas.data;
      yield put({ type: REQUEST_COMPLAINTS_SUCCESS, data });
    }
  }
  catch (errData) {
    errData = Object.assign(errData,actions.payload);
    yield put({ type: REQUEST_COMPLAINTS_FAILED, errData });
  }
}

export function* postComplaint(actions) {
  try {
    const data = yield call(requestAddComplaint,actions.payload);
    console.log('sagas');
    console.log(data);
    console.log('sagas');

    if(data.status === 204) {
      yield put({ type: REQUEST_ADD_COMPLAINT_SUCCESS });
      NavigationService.navigate('Complaints');
    }else {
      const errData = [...data];
      yield put({ type: REQUEST_ADD_COMPLAINT_FAILED, errData });
    }
  } catch (errData) {
    errData = Object.assign(errData,actions.payload);
    yield put({ type: REQUEST_ADD_COMPLAINT_FAILED, errData });
  }
}