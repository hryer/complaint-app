import { call, put } from 'redux-saga/effects'
import { REQUEST_LOGIN_SUCCESS, REQUEST_LOGIN_FAILED, 
  REQUEST_LOGOUT_SUCCESS, REQUEST_LOGOUT_FAILED,
  RESET_REQUEST_COMPLAINTS  } from 'actions/types';
import { requestLogin } from 'api/auth';
import * as NavigationService from 'libs/navigation/NavigationServices.js';
import moment from 'moment';

export function* getAuth(actions) {
  try {
    const rootData = yield call(requestLogin,actions.payload);
    if (rootData.success === false) {
      const errData = Object.assign(rootData.data,actions.payload);
      yield put({ type: REQUEST_LOGIN_FAILED, errData});
    }else {
      const loginDate = moment();
      let data = Object.assign(rootData.data,actions.payload);
      data = Object.assign(data, { lastLogin: loginDate });
      yield put({ type: REQUEST_LOGIN_SUCCESS, data });
      NavigationService.navigate('Complaints');
    }
  }
  catch (errData) {
    errData = Object.assign(errData,actions.payload);
    yield put({ type: REQUEST_LOGIN_FAILED, errData });
    NavigationService.navigate('Login');
  }
}

export function* logoutAuth(actions) {
  try {
    yield put({ type: RESET_REQUEST_COMPLAINTS});
    yield put({ type: REQUEST_LOGOUT_SUCCESS});
    NavigationService.navigate('Login');
  } catch (errData) {
    yield put({ type: REQUEST_LOGOUT_FAILED, errData });
  }
}