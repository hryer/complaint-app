import axios from 'axios'
// import { urlLogin } from '../config';

export const requestComplaints = (payload) => {
  // http://staging.dash-api.efishery.com/complaint?startDate=2018&endDate=2018 GET
  // http://private-7208e-efisheryfrontendapi.apiary-mock.com/complaint?startDate=2018&endDate=2018
  var config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Version': '1',
      'x-app-token': payload.token
    }
  };

  var bodyParameters = {
  }

  return axios.get('http://staging.dash-api.efishery.com/complaint?startDate=2018-07-03&endDate=2019-07-10', bodyParameters, config)
    .then(function (response) {
      console.log('api response');
      console.log(config);
      console.log(payload);
      console.log(response);
      console.log('api response');

      return response;
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