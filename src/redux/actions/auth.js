import { createAction } from 'redux-actions'

import {
  REQUEST_LOGIN, REQUEST_LOGIN_FAILED, REQUEST_LOGOUT_SUCCESS,
  REQUEST_LOGOUT, REQUEST_LOGOUT_FAILED, REQUEST_LOGIN_SUCCESS
} from './types';

export const requestLogin = createAction(REQUEST_LOGIN);
export const requestLoginFailed = createAction(REQUEST_LOGIN_FAILED);
export const requestLoginSuccess = createAction(REQUEST_LOGIN_SUCCESS);

export const requestLogout = createAction(REQUEST_LOGOUT);
export const requestLogoutFailed = createAction(REQUEST_LOGOUT_FAILED);
export const requestLogoutSuccess = createAction(REQUEST_LOGOUT_SUCCESS);
