import axios from 'axios'
import {urlLogin} from '../config';

export const requestLogin = (payload) => {
  console.log(payload);
  var config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Version': '1'
    }
  };

  var bodyParameters = {
    "email": payload.email,
    "password": payload.password
  }
  return axios.post(urlLogin, bodyParameters, config)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    })
}