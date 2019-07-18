import { call, put } from 'redux-saga/effects'
import { REQUEST_OWNERS_SUCCESS, REQUEST_OWNERS_FAILED } from 'actions/types';
import { requestOwners } from 'api/owners';

export function* getOwners(actions) {
  try {
    const datas = yield call(requestOwners,actions.payload);
    console.log('owners');
    console.log(datas);
    console.log('owners');

    // if (datas.success == false) {
    //   const errData = Object.assign(datas.data,actions.payload);
    //   yield put({ type: REQUEST_COMPLAINTS_FAILED, errData});
    // }else {
    //   const data = datas.data;
    //   yield put({ type: REQUEST_COMPLAINTS_SUCCESS, data });
    // }
  } catch (errData) {
    yield put({ type: REQUEST_OWNERS_FAILED, errData });
  }
}