import {
  REQUEST_COMPLAINTS, REQUEST_COMPLAINTS_SUCCESS, REQUEST_COMPLAINTS_FAILED,
  REQUEST_DETAIL_COMPLAINT, REQUEST_DETAIL_COMPLAINT_SUCCESS, REQUEST_DETAIL_COMPLAINT_FAILED,
  REQUEST_ADD_COMPLAINT, REQUEST_ADD_COMPLAINT_SUCCESS, REQUEST_ADD_COMPLAINT_FAILED,
  REQUEST_EDIT_COMPLAINT, REQUEST_EDIT_COMPLAINT_SUCCESS, REQUEST_EDIT_COMPLAINT_FAILED,
  RESET_COMPLAINTS_REQUEST
} from 'actions/types';

export const initialState = {
  data: null,
  postData: null,
  isError: false,
  message: '',
  errData: null,
  errPostData: null
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
        isError: false,
        errData: null
      };
    }
    case REQUEST_COMPLAINTS_SUCCESS: {
      return {
        data: action.data,
        message: 'Complaints has been received',
        isError: false,
        errData: null
      }
    }
    case REQUEST_COMPLAINTS_FAILED: {
      return {
        errData: action.errData,
        message: action.errData.message,
        isError: true
      }
    }
    case REQUEST_ADD_COMPLAINT: {
      return {
        postData: null,
        message: 'Adding complaint...',
        isError: false,
        errPostData: null
      }
    }
    case REQUEST_ADD_COMPLAINT_SUCCESS: {
      return {
        postData: action.data,
        message: 'Complaint has been added',
        isError: false,
        errPostData: null
      }
    }
    case REQUEST_ADD_COMPLAINT_FAILED: {
      return {
        errPostData: action.errData,
        message: action.errData.message,
        isError: true
      }
    }
    /* TODO :: Make sure add complaint work with integration react native offline
    Create reducer for edit complaint
    Create reducer for detail complaint
    */
    default:
      return {...state};
  }
};
