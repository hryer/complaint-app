import {
  REQUEST_LOGIN, REQUEST_LOGIN_SUCCESS, REQUEST_LOGIN_FAILED,
  REQUEST_LOGOUT, REQUEST_LOGOUT_SUCCESS, REQUEST_LOGOUT_FAILED
} from 'actions/types';

export const initialState = {
  isLoggedIn: false,
  data: null,
  isError: false,
  message: ''
}

export const auth = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case REQUEST_LOGIN: {
      return {
        ...state,
        data: null,
        message: 'Logging in...',
        isError: false
      }
    }
    case REQUEST_LOGIN_FAILED: {
      return {
        ...state,
        data: action.errData,
        message: action.errData.message,
        isError: true
      }
    }
    case REQUEST_LOGIN_SUCCESS: {
      return {
        ...state,
        data: action.data,
        isError: false
      }
    }
    case REQUEST_LOGOUT: {
      return {
        ...state,
        data: null,
        isError: false
      }
    }
    case REQUEST_LOGOUT_FAILED: {
      return {
        ...state,
        data: action.errData,
        isError: true
      }
    }
    case REQUEST_LOGOUT_SUCCESS: {
      return {
        ...state,
        data: action.data,
        isError: false
      }
    }
    default:
      return {...state};
  }
};
