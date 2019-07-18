import { call, put } from 'redux-saga/effects'
import { REQUEST_OWNERS_SUCCESS, REQUEST_OWNERS_FAILED } from 'actions/types';
import { requestOwners } from 'api/owners';

export function* getOwners(actions) {
  try {
    const datas = yield call(requestOwners,actions.payload);
    console.log('owners');
    console.log(datas);
    console.log('owners');

    if(datas.success === true) {
      const data = datas.data;
      yield put({ type: REQUEST_OWNERS_SUCCESS, data });
    }else {
      const errData = Object.assign(datas.data,actions.payload);
      yield put({ type: REQUEST_OWNERS_FAILED, errData });
    }
  } catch (errData) {
    yield put({ type: REQUEST_OWNERS_FAILED, errData });
  }
}