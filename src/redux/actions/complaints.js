import { createAction } from 'redux-actions'

import {
  REQUEST_COMPLAINTS, REQUEST_COMPLAINTS_SUCCESS, REQUEST_COMPLAINTS_FAILED,
  REQUEST_DETAIL_COMPLAINT, REQUEST_DETAIL_COMPLAINT_SUCCESS ,REQUEST_DETAIL_COMPLAINT_FAILED,
  REQUEST_ADD_COMPLAINT, REQUEST_ADD_COMPLAINT_SUCCESS, REQUEST_ADD_COMPLAINT_FAILED,
  REQUEST_EDIT_COMPLAINT, REQUEST_EDIT_COMPLAINT_SUCCESS, REQUEST_EDIT_COMPLAINT_FAILED,
  RESET_COMPLAINTS_REQUEST
} from './types';

export const resetComplaintsRequest = createAction(RESET_COMPLAINTS_REQUEST);

export const requestComplaints = createAction(REQUEST_COMPLAINTS);
export const requestComplaintsSuccess = createAction(REQUEST_COMPLAINTS_SUCCESS); 
export const requestComplaintsFailed = createAction(REQUEST_COMPLAINTS_FAILED);

export const requestDetailComplaint = createAction(REQUEST_DETAIL_COMPLAINT);
export const requestDetailComplaintSuccess = createAction(REQUEST_DETAIL_COMPLAINT_SUCCESS);
export const requestDetailComplaintFailed = createAction(REQUEST_DETAIL_COMPLAINT_FAILED);

export const requestAddComplaint = createAction(REQUEST_ADD_COMPLAINT);
export const requestAddComplaintSuccess = createAction(REQUEST_ADD_COMPLAINT_SUCCESS);
export const requestAddComplaintFailed = createAction(REQUEST_ADD_COMPLAINT_FAILED);

export const requestEditComplaint = createAction(REQUEST_EDIT_COMPLAINT);
export const requestEditComplaintSuccess = createAction(REQUEST_EDIT_COMPLAINT_SUCCESS);
export const requestEditComplaintFailed = createAction(REQUEST_EDIT_COMPLAINT_FAILED);
