import {
  REQUEST_COMPLAINTS, REQUEST_COMPLAINTS_SUCCESS, REQUEST_COMPLAINTS_FAILED,
  REQUEST_DETAIL_COMPLAINT, REQUEST_DETAIL_COMPLAINT_SUCCESS, REQUEST_DETAIL_COMPLAINT_FAILED,
  REQUEST_ADD_COMPLAINT, REQUEST_ADD_COMPLAINT_SUCCESS, REQUEST_ADD_COMPLAINT_FAILED,
  REQUEST_EDIT_COMPLAINT, REQUEST_EDIT_COMPLAINT_SUCCESS, REQUEST_EDIT_COMPLAINT_FAILED
} from 'actions/types';

export const initialState = {
  data: null,
  isError: false,
  message: ''
}

export const complaints = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case REQUEST_COMPLAINTS: {
      return {
        ...state,
        data: null,
        message: 'Fetching complaints success...',
        isError: false
      }
    }
    case REQUEST_COMPLAINTS_FAILED: {
      return {
        ...state,
        data: action.errData,
        message: action.errData.message,
        isError: true
      }
    }
    case REQUEST_COMPLAINTS_SUCCESS: {
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
