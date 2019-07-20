import { call, put } from 'redux-saga/effects'
import { 
  REQUEST_COMPLAINTS, REQUEST_COMPLAINTS_SUCCESS, REQUEST_COMPLAINTS_FAILED,
  REQUEST_ADD_COMPLAINT_SUCCESS, REQUEST_ADD_COMPLAINT_FAILED ,
  REQUEST_DETAIL_COMPLAINT, REQUEST_DETAIL_COMPLAINT_SUCCESS, REQUEST_DETAIL_COMPLAINT_FAILED
} from 'actions/types';
import { requestComplaints, requestAddComplaint, requestDetailComplaint } from 'api/complaints';
import * as NavigationService from 'libs/navigation/NavigationServices.js';

export function* getComplaints(actions) {
  try {
    const rootData = yield call(requestComplaints, actions.payload);

    if (rootData.success === false) {
      const errData = Object.assign(rootData.data, actions.payload);
      yield put({ type: REQUEST_COMPLAINTS_FAILED, errData});
    }else {
      const data = rootData.data;
      yield put({ type: REQUEST_COMPLAINTS_SUCCESS, data });
    }
  }
  catch (errData) {
    errData = Object.assign(errData,actions.payload);
    yield put({ type: REQUEST_COMPLAINTS_FAILED, errData });
  }
}

export function* getDetailComplaint(actions) {
  try {
    const rootData = yield call(requestDetailComplaint, actions.payload);
    console.log(rootData);
    if(rootData.success === true) {
      console.log('root data success');
      const data = rootData.data;
      yield put({ type: REQUEST_DETAIL_COMPLAINT_SUCCESS, data })
    }else {
      console.log('raot data failed 1')
      console.log(rootData.data);
      const errData = { message : rootData.message };
      yield put({ type: REQUEST_DETAIL_COMPLAINT_FAILED, errData });
    }
  } catch (error) {
    console.log('raot data failed call api')
    const errData = Object.assign(error, actions.payload);
    yield put({ type: REQUEST_DETAIL_COMPLAINT_FAILED, errData });
  }
}
export function* postComplaint(actions) {
  try {
    const data = yield call(requestAddComplaint, actions.payload);

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