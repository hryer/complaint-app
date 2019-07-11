import React from 'react';
import RN from 'react-native';
import { connect } from 'react-redux';

import Add from '../../components/complaints/Add';
import { requestAddComplaint, resetComplaintsRequest } from 'actions/complaints';

const mapStateToProps = (state) => {
  console.log(state);
  const { isLoggedIn } = state.auth;
  const { email, token } = state.auth.data;

  const { data, isError, message } = state.complaints;

  const { isConnected, actionQueue } = state.network;

  return {
    isLoggedIn,
    email,
    token,
    data,
    isError,
    isConnected,
    actionQueue,
    message
  };
};

const mapDispatchToProps = { requestAddComplaint, resetComplaintsRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Add);
