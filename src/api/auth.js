import axios from 'axios'
import config from 'src/config';

/* Result request Json (response)
{
    "success": true,
    "data": {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MywibmFtZSI6IkRyLiBSb3NzIEdyZWVuZmVsZGVyIEREUyIsImNvbXBhbnlfbmFtZSI6ImFoYSBjb3JwIiwiZW1haWwiOiJhZG1pbkBlZmlzaGVyeS5jb20iLCJwaG9uZSI6IjYyODUyMjQ3NTIxODAiLCJhZGRyZXNzIjoiQ2lrdXRyYSBCYXJ1IFYiLCJwaWN0dXJlIjpudWxsLCJjcmVhdGVkX2F0IjpudWxsLCJ1cGRhdGVkX2F0IjpudWxsLCJhcHBfdG9rZW4iOiJpbml0b2tlbnRlc3QiLCJjdXN0X2lkIjoiY3VzdF8wMCIsImxvY2F0aW9uIjoiMDIyIiwiaXNBZG1pbiI6MSwiaW50ZXJlc3QiOm51bGwsInN0YXR1cyI6ImFjdGl2ZSIsImdkcml2ZV9mb2xkZXJfaWQiOiIiLCJpc19uYmlvdCI6MCwic3ViIjozLCJpc3MiOiJodHRwOi8vc3RhZ2luZy5kYXNoLWFwaS5lZmlzaGVyeS5jb20vbG9naW4iLCJpYXQiOjE1NjIwNTI3ODcsImV4cCI6MTU2MjEzOTE4NywibmJmIjoxNTYyMDUyNzg3LCJqdGkiOiJROU5Tbzg3VllRcDZuVVd3In0.g4nB96ITCDoD078YNSbXGOIx38bXJB5q8dRAgPZUdPs"
    }
}
*/

export const requestLogin = (payload) => {
  const urlAuthLogin = `http://staging.dash-api.efishery.com/login`;

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

  return axios.post(urlAuthLogin, bodyParameters, config)
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