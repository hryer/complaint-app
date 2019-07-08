import { call, put } from 'redux-saga/effects'
import { REQUEST_LOGIN_SUCCESS, REQUEST_LOGIN_FAILED } from 'actions/types';
import { requestLogin } from 'api/auth';
import * as NavigationService from 'libs/navigation/NavigationServices.js'

export function* fetchAuth(actions) {
  try {
    const datas = yield call(requestLogin,actions.payload);
    if (datas.success == false) {
      const errData = Object.assign(datas.data,actions.payload);
      yield put({ type: REQUEST_LOGIN_FAILED, errData});
    }else {
      const data = Object.assign(datas.data,actions.payload);
      yield put({ type: REQUEST_LOGIN_SUCCESS, data });
      NavigationService.navigate('Complaints');
    }
  }
  catch (errData) {
    errData = Object.assign(errData,actions.payload);
    yield put({ type: REQUEST_LOGIN_FAILED, errData });
  }
}