import React from 'react';
import RN from 'react-native';
import { connect } from 'react-redux';

import Login from 'components/Login';
import { requestLogin, resetRequest } from 'actions/auth';
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

const mapDispatchToProps = { requestLogin, resetRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
