import axios from 'axios'
import config from 'src/config';

/* Result request Json (response)
  login
  {
    "success": false,
    "data": {
      "message": "wrong email or password",
      "status": 0
    }
  }

  {
  "success": true,
  "status":1,
  "user": {
    "owner_id": "17",
    "username": "joko.patil",
    "name": "Joko Patilele",
    "id": "3",
    "app_token": "dpOFuprYjU9GqjR",
    "phone": "+6280989999",
    "ponds":[],
    "feeders": []
  }
}
*/

export const requestLogin = (payload) => {
  const urlAuthLogin = `${config.urlAuth}/auth/login`;

  const userData = { ...payload, "device_token": "initokenfcm" };

  var config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Version': '1'
    }
  };

  var bodyParameters = {
    "username": payload.username,
    "password": payload.password,
    "device_token": payload.device_token
  }

  return axios.post(urlAuthLogin, bodyParameters, config)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    })
}

export const requestLogout = (payload) => {
  const urlAuthLogout = `${config.urlAuth}/auth/logout`;

  const userData = { ...payload, "device_token": "initokenfcm" };

  var config = {
    headers: {
      'Content-Type': 'application/json',
      'X-App-token' : 'app_token',
      'X-Api-Version': '1'
    }
  };

  var bodyParameters = {
    "username": payload.username,
    "password": payload.password,
    "device_token": payload.device_token
  }

  return axios.post(urlAuthLogin, bodyParameters, config)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    })
}