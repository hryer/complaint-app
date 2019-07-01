import { NavigationActions } from 'react-navigation';
import { createAction } from 'redux-actions'

import {
  LOGIN_ATTEMPT,
  LOGIN_SUCCESS,
  LOGIN_ALREADY,
  LOGIN_FAILED,
  CREDENTIAL_FAILED,
  LOGOUT_ATTEMPT,
  LOGOUT_SUCCESS,
  LOGIN_REFRESH } from './types';

const refreshLoginView = () => ({ type: LOGIN_REFRESH });

const login = (username, password) => (dispatch) => {
  const promise = new Promise((resolve, reject) => {
    dispatch({
      type: LOGIN_ATTEMPT,
      username,
      password,
    });

    setTimeout(() => {
      if (password !== '') {
        resolve({
          type: LOGIN_SUCCESS,
          username,
        });
      } else {
        reject();
      }
    }, 250);
  });
  return promise.then(obj => dispatch(obj))
    .then(() => dispatch(NavigationActions.navigate({ routeName: 'Complaints' })))
    .catch(() => dispatch({
      type: LOGIN_FAILED,
      message: 'Password is empty!',
    }));
};

const logout = () => (dispatch) => {
  const promise = new Promise((resolve) => {
    dispatch({ type: LOGOUT_ATTEMPT });
    setTimeout(() => {
      resolve({ type: LOGOUT_SUCCESS });
    }, 250);
  });
  return promise.then(obj => dispatch(obj))
    .then(() => dispatch(NavigationActions.navigate({ routeName: 'Login' })))
    .then(() => setTimeout(() => dispatch(refreshLoginView()), 500));
};

export {
  LOGIN_ATTEMPT,
  LOGIN_SUCCESS,
  LOGIN_ALREADY,
  LOGIN_FAILED,
  CREDENTIAL_FAILED,
  LOGOUT_ATTEMPT,
  LOGOUT_SUCCESS,
  LOGIN_REFRESH,
  login,
  logout,
  refreshLoginView,
};
