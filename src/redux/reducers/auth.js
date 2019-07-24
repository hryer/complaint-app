import {
  REQUEST_LOGIN, REQUEST_LOGIN_SUCCESS, REQUEST_LOGIN_FAILED,
  REQUEST_LOGOUT, REQUEST_LOGOUT_SUCCESS, REQUEST_LOGOUT_FAILED,
  RESET_REQUEST_AUTH
} from 'actions/types';

export const initialState = {
  isLoggedIn: false,
  data: null,
  isError: false,
  message: '',
  lastLogin: ''
}

export const auth = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case REQUEST_LOGIN: {
      return {
        data: null,
        message: 'Logging in...',
        isError: false
      };
    }
    case REQUEST_LOGIN_FAILED: {
      return {
        data: action.errData,
        message: action.errData.message,
        isError: true,
        isLoggedIn: false
      };
    }
    case REQUEST_LOGIN_SUCCESS: {
      return {
        data: action.data,
        message: '',
        isError: false,
        isLoggedIn: true,
        lastLogin: action.data.lastLogin
      };
    }
    case REQUEST_LOGOUT: {
      return {
        data: null,
        isError: false,
        isLoggedIn: false,
        lastLogin: ''
      };
    }
    case REQUEST_LOGOUT_FAILED: {
      return {
        data: action.errData,
        isError: true
      };
    }
    case REQUEST_LOGOUT_SUCCESS: {
      return { ...initialState };
    }
    case RESET_REQUEST_AUTH: {
      return { ...initialState };
    }
    default:
      return { ...state };
  }
};
