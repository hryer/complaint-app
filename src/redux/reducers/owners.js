import {
  REQUEST_GET_OWNERS, REQUEST_GET_OWNERS_SUCCESS, REQUEST_GET_OWNERS_FAILED,
  RESET_REQUEST_OWNERS, RESET_REQUEST_BARCODES,
  REQUEST_GET_BARCODES, REQUEST_GET_BARCODES_SUCCESS, REQUEST_GET_BARCODES_FAILED
} from 'actions/types';

export const initialState = {
  dataOwner: null,
  dataBarcode: null,
  isError: false,
  message: '',
  errDataOwner: null,
  errDataBarcode: null
}

export const owners = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case RESET_REQUEST_OWNERS: {
      return {...initialState};
    }
    case REQUEST_GET_OWNERS: {
      return {
        ...state,
        message: 'Getting owners...',
        isError: false,
        errDataOwner: null
      };
    }
    case REQUEST_GET_OWNERS_SUCCESS: {
      return {
        ...state,
        dataOwner: action.data,
        message: 'Owners has been received',
        isError: false,
        errDataOwner: null
      };
    }
    case REQUEST_GET_OWNERS_FAILED: {
      return {
        ...state,
        errDataOwner: action.errData,
        message: action.errData.message,
        isError: true
      };
    }
    case REQUEST_GET_BARCODES: {
      return {
        ...state,
        message: 'Getting barcodes...',
        isError: false,
        errDataBarcode: null
      }
    }
    case REQUEST_GET_BARCODES_SUCCESS: {
      return {
        ...state,
        dataBarcode: action.data,
        message: 'Barcodes has been received',
        isError: false,
        errDataBarcode: null
      }
    }
    case REQUEST_GET_BARCODES_FAILED: {
      return {
        ...state,
        errDataBarcode: action.errData,
        message: action.errData.message,
        isError: true
      }
    }
    default:
      return {...state};
  }
};