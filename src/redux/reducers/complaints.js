import {
  REQUEST_COMPLAINTS, REQUEST_COMPLAINTS_SUCCESS, REQUEST_COMPLAINTS_FAILED,
  REQUEST_DETAIL_COMPLAINT, REQUEST_DETAIL_COMPLAINT_SUCCESS, REQUEST_DETAIL_COMPLAINT_FAILED,
  REQUEST_ADD_COMPLAINT, REQUEST_ADD_COMPLAINT_SUCCESS, REQUEST_ADD_COMPLAINT_FAILED,
  REQUEST_EDIT_COMPLAINT, REQUEST_EDIT_COMPLAINT_SUCCESS, REQUEST_EDIT_COMPLAINT_FAILED,
  RESET_COMPLAINTS_REQUEST
} from 'actions/types';

export const initialState = {
  data: null,
  isError: false,
  message: ''
}

export const complaints = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case RESET_COMPLAINTS_REQUEST: {
      return {...initialState};
    }
    case REQUEST_COMPLAINTS: {
      return {
        data: null,
        message: 'Getting complaints...',
        isError: false
      };
    }
    case REQUEST_COMPLAINTS_SUCCESS: {
      return {
        data: action.data,
        message: 'Complaints has been received',
        isError: false
      }
    }
    case REQUEST_COMPLAINTS_FAILED: {
      return {
        data: action.errData,
        message: action.errData.message,
        isError: true
      }
    }
    case REQUEST_ADD_COMPLAINT: {
      return {
        data: null,
        message: 'Adding complaint...',
        isError: false
      }
    }
    case REQUEST_ADD_COMPLAINT_SUCCESS: {
      return {
        data: action.data,
        message: 'Complaint has been added',
        isError: false
      }
    }
    case REQUEST_ADD_COMPLAINT_FAILED: {
      return {
        data: action.errData,
        message: action.errData.message,
        isError: true
      }
    }
    // TODO: create reducer for edit, etc
    default:
      return {...state};
  }
};
