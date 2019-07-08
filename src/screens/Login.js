import React from 'react';
import RN from 'react-native';
import { connect } from 'react-redux';

import Login from 'components/Login';
import { requestLogin, resetAuthRequest } from 'actions/auth';
import { List } from './complaints/List';

const mapStateToProps = ({ auth }) => {
  const { message, isError, email, password } = auth;

  return {
    isError,
    message,
    email,
    password
  };
};

const mapDispatchToProps = { requestLogin, resetAuthRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
