import React from 'react';
import RN from 'react-native';
import { connect } from 'react-redux';

import List from '../../components/complaints/List';
import { requestComplaints, resetRequestComplaints, syncConnection } from 'actions/complaints';
import { requestLogout } from 'actions/auth';

const mapStateToProps = (state) => {
  const { isLoggedIn } = state.auth;
  const authData = state.auth.data;
  const { data, isError, message } = state.complaints;

  const { isConnected, actionQueue } = state.network;

  return {
    isLoggedIn,
    authData,
    data,
    isError,
    isConnected,
    actionQueue,
    message
  };
};

const mapDispatchToProps = { requestComplaints, resetRequestComplaints, requestLogout, syncConnection };

export default connect(mapStateToProps, mapDispatchToProps)(List);
