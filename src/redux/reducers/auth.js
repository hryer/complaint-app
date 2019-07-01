import {
  LOGIN_ATTEMPT,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  CREDENTIAL_FAILED,
  LOGOUT_ATTEMPT,
  LOGOUT_SUCCESS,
  LOGIN_REFRESH,
} from 'actions/auth';

const defaultState = {
  isLoggedIn: false,
  username: '',
  isError: false,
  message: ''
}

const auth = (state = defaultState, action) => {
  const { type,
    username = '',
    message = ''
  } = action;

  switch (type) {
    case LOGIN_ATTEMPT: {
      return {
        ...state,
        message: 'Logging in...',
        isError: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        username,
        message,
        isError: false,
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        message,
        isError: true,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isLoggedIn: false,
      }
    }
    case LOGIN_REFRESH: {
      return {
        ...state,
        message,
        username,
        isError: false,
      };
    }
    default: return state;
  }
};

export { defaultState };
export default auth;
