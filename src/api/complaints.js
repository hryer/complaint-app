import axios from 'axios'
// import { urlLogin } from '../config';

export const requestComplaints = (payload) => {
  // http://staging.dash-api.efishery.com/complaint?startDate=2018&endDate=2018 GET
  // http://private-7208e-efisheryfrontendapi.apiary-mock.com/complaint?startDate=2018&endDate=2018
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'x-app-token': payload.token
    }
  };

  const urlComplaints = `http://staging.dash-api.efishery.com/complaint?startDate=${payload.startDate}&endDate=${payload.endDate}`;

  return axios.get(urlComplaints, config)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      return error;
    })
}

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