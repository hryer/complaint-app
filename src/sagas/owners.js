import { call, put } from 'redux-saga/effects'
import {
  REQUEST_GET_OWNERS_SUCCESS, REQUEST_GET_OWNERS_FAILED,
  REQUEST_GET_BARCODES_SUCCESS, REQUEST_GET_BARCODES_FAILED
} from 'actions/types';
import { requestGetOwners, requestGetBarcodes } from 'api/owners';

export function* getOwners(actions) {
  try {
    const rootData = yield call(requestGetOwners, actions.payload);

    if (rootData.success === true) {
      const data = rootData.data;
      yield put({ type: REQUEST_GET_OWNERS_SUCCESS, data });
    } else {
      const errData = Object.assign(rootData.data, actions.payload);
      yield put({ type: REQUEST_GET_OWNERS_FAILED, errData });
    }
  } catch (errData) {
    yield put({ type: REQUEST_GET_OWNERS_FAILED, errData });
  }
}

export function* getBarcodes(actions) {
  try {
    const rootData = yield call(requestGetBarcodes, actions.payload);
    
    if (rootData.status === 200) {
      const data = rootData.data;
      yield put({ type: REQUEST_GET_BARCODES_SUCCESS, data });
    } else {
      const errData = Object.assign(rootData.data, actions.payload);
      yield put({ type: REQUEST_GET_BARCODES_FAILED, errData });
    }
  } catch (errData) {
    yield put({ type: REQUEST_GET_BARCODES_FAILED, errData });
  }
}