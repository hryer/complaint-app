import axios from 'axios'
import { urlComplaints } from '../config';

export const requestGetComplaints = (payload) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Version': '1',
      'x-app-token': payload.token
    }
  };

  const urlListComplaints = `${urlComplaints}?status=open%2Cunresolved&startDate=${payload.startDate}&endDate=${payload.endDate}`;

  return axios.get(urlListComplaints, config)
    .then(function (response) {
      return response.data;
    }).catch(function (error) {
      return error;
    });
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
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-Api-Version': '1',
      'x-app-token': payload.token
    }
  };

  const urlDetailComplaint = `${urlComplaints}/${payload.complaint_id}`;

  return axios.get(urlDetailComplaint, config)
    .then(function (response) {
      return response.data;
    }).catch(function (error) {
      return error;
    });
}

export const requestEditComplaint = (payload) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Version': '1',
      'x-app-token': payload.token
    }
  };

  const urlEditComplaint = `${urlComplaints}/${payload.complaint_id}`; 
  let temp = payload.data.subcategory;
  payload.data.subcategory = [];
  payload.data.subcategory.push(temp);

  return axios.put(urlEditComplaint, payload.data, config)
    .then(function (response) {
      return response;
    }).catch(function (error) {
      return error;
    });
}