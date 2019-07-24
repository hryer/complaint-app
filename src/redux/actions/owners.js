import { createAction } from 'redux-actions';

import {
  REQUEST_GET_OWNERS, REQUEST_GET_OWNERS_SUCCESS, REQUEST_GET_OWNERS_FAILED,
  RESET_REQUEST_OWNERS, RESET_REQUEST_BARCODES,
  REQUEST_GET_BARCODES, REQUEST_GET_BARCODES_SUCCESS, REQUEST_GET_BARCODES_FAILED,
} from './types';

export const requestGetOwners = createAction(REQUEST_GET_OWNERS);
export const requestGetOwnersSuccess = createAction(REQUEST_GET_OWNERS_SUCCESS);
export const requestGetOwnersFailed = createAction(REQUEST_GET_OWNERS_FAILED);

export const requestGetBarcodes = createAction(REQUEST_GET_BARCODES);
export const requestGetBarcodesSuccess = createAction(REQUEST_GET_BARCODES_SUCCESS);
export const requestGetBarcodesFailed = createAction(REQUEST_GET_BARCODES_FAILED);

export const resetRequestOwners = createAction(RESET_REQUEST_OWNERS);
export const resetRequestBarcodes = createAction(RESET_REQUEST_BARCODES);
