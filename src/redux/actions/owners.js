import { createAction } from 'redux-actions';

import {
  REQUEST_OWNERS, REQUEST_OWNERS_SUCCESS, REQUEST_OWNERS_FAILED,
  RESET_REQUEST_OWNERS
} from './types';

export const requestOwners = createAction(REQUEST_OWNERS);
export const requestOwnersSuccess = createAction(REQUEST_OWNERS_SUCCESS);
export const requestOwnersFailed = createAction(REQUEST_OWNERS_FAILED);

export const resetRequestOwners = createAction(RESET_REQUEST_OWNERS);
