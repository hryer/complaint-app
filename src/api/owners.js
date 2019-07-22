import axios from 'axios'
import { urlOwner } from '../config';

export const requestOwners = (payload) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'x-app-token': payload.token
    }
  };

  return axios.get(urlOwner, config)
    .then(function (response) {
      return response.data;
    }).catch(function (error) {
      return error;
    })
}