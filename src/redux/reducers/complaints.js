import {
  REQUEST_COMPLAINTS, REQUEST_COMPLAINTS_SUCCESS, REQUEST_COMPLAINTS_FAILED,
  REQUEST_DETAIL_COMPLAINT, REQUEST_DETAIL_COMPLAINT_SUCCESS, REQUEST_DETAIL_COMPLAINT_FAILED,
  REQUEST_ADD_COMPLAINT, REQUEST_ADD_COMPLAINT_SUCCESS, REQUEST_ADD_COMPLAINT_FAILED,
  REQUEST_EDIT_COMPLAINT, REQUEST_EDIT_COMPLAINT_SUCCESS, REQUEST_EDIT_COMPLAINT_FAILED,
  RESET_REQUEST_COMPLAINTS
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
    case RESET_REQUEST_COMPLAINTS: {
      return { ...initialState };
    }
    case REQUEST_COMPLAINTS: {
      return {
        ...state,
        message: 'Getting complaints...',
        isError: false,
        errData: null
      };
    }
    case REQUEST_COMPLAINTS_SUCCESS: {
      return {
        ...state,
        data: action.data,
        message: 'Complaints has been received',
        isError: false,
        errData: null
      }
    }
    case REQUEST_COMPLAINTS_FAILED: {
      return {
        ...state,
        errData: action.errData,
        message: action.errData.message,
        isError: true
      }
    }
    case REQUEST_ADD_COMPLAINT: {
      return {
        ...state,
        postData: null,
        message: 'Adding complaint...',
        isError: false,
        errPostData: null
      }
    }
    case REQUEST_ADD_COMPLAINT_SUCCESS: {
      return {
        ...state,
        postData: action.data,
        message: 'Complaint has been added',
        isError: false,
        errPostData: null
      }
    }
    case REQUEST_ADD_COMPLAINT_FAILED: {
      return {
        ...state,
        errPostData: action.errData,
        message: 'add complaint failed',
        isError: true
      }
    }
    case REQUEST_DETAIL_COMPLAINT: {
      return {
        ...state,
        message: 'get detail complaint...',
        isError: false,
        errData: null
      }
    }
    case REQUEST_DETAIL_COMPLAINT_SUCCESS: {
      return {
        ...state,
        message: 'get detail complaint success',
        detailData: action.data,
        isError: false,
        errData: null
      }
    }
    case REQUEST_DETAIL_COMPLAINT_FAILED: {
      return {
        ...state,
        message: 'get detail complaint failed',
        isError: true,
        errData: action.errData
      }
    }
    default:
      return { ...state };
  }
};
