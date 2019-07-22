import axios from 'axios'
import { urlOwner, urlFeeder } from '../config';

export const requestGetOwners = (payload) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'x-app-token': payload.token
    }
  };

  return axios.get(urlOwner, config)
    .then(function(response) {
      return response.data;
    }).catch(function(error) {
      return error;
    })
}

export const requestGetBarcode = (payload) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'x-app-token': payload.token
    }
  };

  const urlBarcode = `${urlFeeder}/${payload.user_id}/status/history`;
  return axios.get(urlFeeder, config)
    .then(function(response) {
      return response;
    }).catch(function(error) {
      return error;
    })
}