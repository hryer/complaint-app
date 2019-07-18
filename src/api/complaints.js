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
      return response.data;
    }).catch(function (error) {
      return error;
    })
}

export const requestAddComplaint = (payload) => {
 
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-Api-Version': '1',
      'x-app-token': payload.token
    }
  };

  let dataComplaint = new FormData();
  const temp = payload.data; 
 
  Object.keys(temp).forEach(function(key) {
    if(key == 'subcategory') {
      dataComplaint.append('subcategory[]',temp[key]);
    }else {
      dataComplaint.append(key,temp[key]);
    }
  });

  return axios.post(urlComplaints,dataComplaint,config)
    .then(function (response) {
      return response;
    }).catch(function (error) {
      return error;
    });
}

export const requestDetailComplaint = (payload) => {
  // http://staging.dash-api.efishery.com/complaint/complaint_id GET
  return null;
}

export const requestEditComplaint = (payload) => {
  // http://staging.dash-api.efishery.com/complaint/complaint_id PUT
  return null;
}