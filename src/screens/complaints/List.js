import React from 'react';
import RN from 'react-native';
import { connect } from 'react-redux';

import List from '../../components/complaints/List';
import { requestComplaints, resetComplaintsRequest } from 'actions/complaints';
import { requestLogout } from 'actions/auth';

const mapStateToProps = (state) => {
  console.log('state lists props');
  console.log(state);
  console.log('state lists props');

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

const mapDispatchToProps = { requestComplaints, resetComplaintsRequest, requestLogout };

export default connect(mapStateToProps, mapDispatchToProps)(List);
