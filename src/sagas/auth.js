import { call, put } from 'redux-saga/effects'
import { REQUEST_LOGIN_SUCCESS, REQUEST_BANNER_FAILED } from 'actions/types';
import { requestLogin } from 'api/auth';
import { REQUEST_LOGIN_FAILED } from '../redux/actions/types';
// import { NavigationActions } from 'react-navigation';
import * as NavigationService from 'libs/navigation/NavigationServices.js'

export function* fetchAuth(actions) {
  try {
    const datas = yield call(requestLogin,actions.payload);
    if (datas.success == false) {
      const errData = datas.data;
      yield put({ type: REQUEST_LOGIN_FAILED, errData});
    }else {
      // const data = datas.data;
      yield put({ type: REQUEST_LOGIN_SUCCESS, datas });
      NavigationService.navigate('Complaints');
      // yield put (NavigationActions.navigate({ routeName: 'Complaints' }))
    }
  }
  catch (data) {
    const errData = Object.assign(data,actions.payload);
    yield put({ type: REQUEST_LOGIN_FAILED, errData });
  }
}