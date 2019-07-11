import axios from 'axios'
import { urlComplaints } from '../config';

export const requestComplaints = (payload) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'x-app-token': payload.token
    }
  };

  const urlListComplaints = `${urlComplaints}?status=open%2Cunresolved&startDate=${payload.startDate}&endDate=${payload.endDate}`;

  return axios.get(urlListComplaints, config)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      return error;
    })
}

// TODO:: INTEGRATE THIS DATA TO VIEW LISTS BEFORE INTEGRATE SAVE TO ASYNC DB or PERSISTS
export const requestAddComplaint = (payload) => {
  // http://staging.dash-api.efishery.com/complaint POST
  return null;
}

export const requestDetailComplaint = (payload) => {
  // http://staging.dash-api.efishery.com/complaint/complaint_id GET
  return null;
}

export const requestEditComplaint = (payload) => {
  // http://staging.dash-api.efishery.com/complaint/complaint_id PUT
  return null;
}