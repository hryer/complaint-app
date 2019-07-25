import { call, put } from 'redux-saga/effects'
import {
  REQUEST_COMPLAINTS, REQUEST_COMPLAINTS_SUCCESS, REQUEST_COMPLAINTS_FAILED,
  REQUEST_ADD_COMPLAINT_SUCCESS, REQUEST_ADD_COMPLAINT_FAILED,
  REQUEST_DETAIL_COMPLAINT_SUCCESS, REQUEST_DETAIL_COMPLAINT_FAILED,
  REQUEST_EDIT_COMPLAINT_SUCCESS, REQUEST_EDIT_COMPLAINT_FAILED
} from 'actions/types';
import { requestGetComplaints, requestAddComplaint, requestDetailComplaint, requestEditComplaint } from 'api/complaints';
import * as NavigationService from 'libs/navigation/NavigationServices.js';

export function* getComplaints(actions) {
  try {
    const rootData = yield call(requestGetComplaints, actions.payload);

    if (rootData.success === false) {
      const errData = {...rootData.data, ...actions.payload};
      yield put({ type: REQUEST_COMPLAINTS_FAILED, errData });
    } else {
      const data = rootData.data;
      yield put({ type: REQUEST_COMPLAINTS_SUCCESS, data });
    }
  }
  catch (errData) {
    yield put({ type: REQUEST_COMPLAINTS_FAILED, errData });
  }
}

export function* getDetailComplaint(actions) {
  try {
    const rootData = yield call(requestDetailComplaint, actions.payload);

    if (rootData.success === true) {
      const data = rootData.data;
      yield put({ type: REQUEST_DETAIL_COMPLAINT_SUCCESS, data });
      NavigationService.navigate('DetailComplaint');
    } else {
      const errData = { message: rootData.message };
      yield put({ type: REQUEST_DETAIL_COMPLAINT_FAILED, errData });
    }
  } catch (error) {
    const errData = Object.assign(error, actions.payload);
    yield put({ type: REQUEST_DETAIL_COMPLAINT_FAILED, errData });
  }
}
export function* postComplaint(actions) {
  try {
    const data = yield call(requestAddComplaint, actions.payload);

    if (data.status === 204) {
      yield put({ type: REQUEST_ADD_COMPLAINT_SUCCESS });
      NavigationService.navigate('Complaints');
    } else {
      const errData = [...data];
      yield put({ type: REQUEST_ADD_COMPLAINT_FAILED, errData });
    }
  } catch (errData) {
    errData = Object.assign(errData, actions.payload);
    yield put({ type: REQUEST_ADD_COMPLAINT_FAILED, errData });
  }
}

export function* putComplaint(actions) {
  try {
    const data = yield call(requestEditComplaint, actions.payload);

    if (data.status === 204) {
      yield put({ type: REQUEST_EDIT_COMPLAINT_SUCCESS });
      NavigationService.navigate('Complaints');
    } else {
      const errData = [...data];
      yield put({ type: REQUEST_EDIT_COMPLAINT_FAILED, errData });
    }
  } catch (errData) {
    errData = Object.assign(errData, actions.payload);
    yield put({ type: REQUEST_EDIT_COMPLAINT_FAILED, errData });
  }
}