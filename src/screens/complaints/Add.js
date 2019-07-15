import React from 'react';
import RN from 'react-native';
import { connect } from 'react-redux';

import Add from '../../components/complaints/Add';
import { requestAddComplaint, resetComplaintsRequest } from 'actions/complaints';

const mapStateToProps = (state) => {
  const { isLoggedIn } = state.auth;]

  const { isConnected, actionQueue } = state.network;

  return {
    isLoggedIn,
    isConnected,
    actionQueue,
  };
};

const mapDispatchToProps = { requestAddComplaint, resetComplaintsRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Add);
