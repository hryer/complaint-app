import React from 'react';
import RN from 'react-native';
import { connect } from 'react-redux';

import AddComplaint from '../../components/complaints/Add';
import { requestAddComplaint, resetComplaintsRequest } from 'actions/complaints';

const mapStateToProps = (state) => {
  const { isLoggedIn } = state.auth;

  const { isConnected, actionQueue } = state.network;

  let token = '';

  if(state.auth.data != null && state.auth.data != undefined) {
    token = state.auth.data.token;
  }

  return {
    isLoggedIn,
    isConnected,
    actionQueue,
    token
  };
};

const mapDispatchToProps = { requestAddComplaint, resetComplaintsRequest };

export default connect(mapStateToProps, mapDispatchToProps)(AddComplaint);
