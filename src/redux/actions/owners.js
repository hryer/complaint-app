import { createAction } from 'redux-actions';

import {
  REQUEST_OWNERS, REQUEST_OWNERS_SUCCESS, REQUEST_OWNERS_FAILED,
  RESET_REQUEST_OWNERS
} from './types';

export const requestGetOwners = createAction(REQUEST_OWNERS);
export const requestGetOwnersSuccess = createAction(REQUEST_OWNERS_SUCCESS);
export const requestGetOwnersFailed = createAction(REQUEST_OWNERS_FAILED);

export const resetRequestOwners = createAction(RESET_REQUEST_OWNERS);
