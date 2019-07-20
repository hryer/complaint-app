import {
  REQUEST_OWNERS, REQUEST_OWNERS_SUCCESS, REQUEST_OWNERS_FAILED,
  RESET_REQUEST_OWNERS
} from 'actions/types';

export const initialState = {
  dataOwner: null,
  isError: false,
  message: '',
  errDataOwner: null
}

export const owners = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case RESET_REQUEST_OWNERS: {
      return {...initialState};
    }
    case REQUEST_OWNERS: {
      return {
        message: 'Getting owners...',
        isError: false,
        errDataOwner: null
      };
    }
    case REQUEST_OWNERS_SUCCESS: {
      return {
        dataOwner: action.data,
        message: 'Owners has been received',
        isError: false,
        errDataOwner: null
      };
    }
    case REQUEST_OWNERS_FAILED: {
      return {
        ...state,
        errData: action.errData,
        message: action.errData.message,
        isError: true
      };
    }
    default:
      return {...state};
  }
};