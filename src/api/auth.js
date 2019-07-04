import axios from 'axios'
import {urlLogin} from '../config';

export const requestLogin = (payload) => {
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

export const requestLogout = (payload) => {
  const urlAuthLogout = `${config.urlAuth}/logout`;

  var config = {
    headers: {
      'Content-Type': 'application/json',
      'X-App-token': 'app_token',
      'X-Api-Version': '1'
    }
  };

  var bodyParameters = {
    "email": payload.email,
    "password": payload.password
  }

  return axios.post(urlAuthLogout, bodyParameters, config)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    })
}