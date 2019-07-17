import axios from 'axios'
import { urlComplaints } from '../config';

/* 
TODO::
  ADD COMPLAINT API
  CONNECT WITH SAGAS
*/
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

// TODO:: INTEGRATE THIS DATA TO VIEW LISTS BEFORE INTEGRATE SAVE TO ASYNC DB or PERSISTS
export const requestAddComplaint = (payload) => {
  // http://staging.dash-api.efishery.com/complaint POST
  console.log('api');
  console.log(payload);
  console.log('api');
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-Api-Version': '1',
      'x-app-token': payload.token
    }
  };

  let dataComplaint = new FormData();
  console.log(payload.data);
  const temp = payload.data; 
 
  Object.keys(temp).forEach(function(key) {
    console.log(key, temp[key]);
    if(key == 'subcategory') {
      dataComplaint.append('subcategory[]',temp[key]);
    }else {
      dataComplaint.append(key,temp[key]);
    }
  });
  
  console.log('config');
  console.log(config);
  console.log('config');

  return axios.post(urlComplaints,dataComplaint,config)
    .then(function (response) {
      console.log('respone api');
      console.log(response);
      console.log('respone api');

      return response.data;
    }).catch(function (error) {
      console.log('axios wakwaw');
      return error;
    });
    // const tempToken = payload.token;
    // console.log(tempToken);
    // return axios({
    //   method: 'POST',
    //   url: urlComplaints,
    //   data: formData,
    //   config: { headers: { 'content-type': 'multipart/form-data', 'x-app-token': payload.token }},
    // }).then(function (response) {
    //   console.log(response);
    //   console.log('respone api');
    // }).catch(function (error) {
    //   console.log('axios wakwaw');
    //   return error;
    // });
}

export const requestDetailComplaint = (payload) => {
  // http://staging.dash-api.efishery.com/complaint/complaint_id GET
  return null;
}

export const requestEditComplaint = (payload) => {
  // http://staging.dash-api.efishery.com/complaint/complaint_id PUT
  return null;
}