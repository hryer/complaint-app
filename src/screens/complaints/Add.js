import React from 'react';
import RN from 'react-native';
import { connect } from 'react-redux';

import AddComplaint from '../../components/complaints/Add';
import { requestAddComplaint, resetRequestComplaints } from 'actions/complaints';
import { requestGetOwners, resetRequestOwners } from 'actions/owners';
import { requestLogout } from 'actions/auth';

const mapStateToProps = (state) => {
  const { isLoggedIn } = state.auth;

  const { isConnected, actionQueue } = state.network;

  let token = '';
  let errPostData = '';
  let dataOwner = null;
  let screenComponent = 'Add Complaint';

  if (state.auth.data != null && state.auth.data != undefined) {
    token = state.auth.data.token;
  }

  if (state.owners.dataOwner != null && state.owners.dataOwner) {
    dataOwner = state.owners.dataOwner;
  }

  return {
    isLoggedIn,
    isConnected,
    actionQueue,
    token,
    dataOwner,
    screenComponent
  };
};

const mapDispatchToProps = {
  requestAddComplaint, resetRequestComplaints,
  requestGetOwners, resetRequestOwners,
  requestLogout
};

export default connect(mapStateToProps, mapDispatchToProps)(AddComplaint);
