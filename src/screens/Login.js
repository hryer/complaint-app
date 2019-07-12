import React from 'react';
import RN from 'react-native';
import { connect } from 'react-redux';

import Login from 'components/Login';
import { requestLogin, resetAuthRequest } from 'actions/auth';

const mapStateToProps = ( state ) => {
  const { message, isError, isLoggedIn, data } = state.auth;
  const { isConnected } = state.network;
  console.log('state login');
  console.log(state);
  console.log('state login');

  return {
    isError,
    message,
    isConnected,
    isLoggedIn,
    data
  };
};

const mapDispatchToProps = { requestLogin, resetAuthRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
