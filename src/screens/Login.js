import React from 'react';
import RN from 'react-native';
import { connect } from 'react-redux';

import Login from 'components/Login';
import { login, refreshLoginView } from 'actions/auth';
import { List } from './complaints/List';

const mapStateToProps = ({ auth }) => {
  const { message, isError, username } = auth;

  return {
    isError,
    message,
    username,
  };
};

const mapDispatchToProps = { login, refreshLoginView };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
