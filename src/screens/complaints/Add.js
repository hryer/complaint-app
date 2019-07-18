import React from 'react';
import RN from 'react-native';
import { connect } from 'react-redux';

import AddComplaint from '../../components/complaints/Add';
import { requestAddComplaint, resetRequestComplaints } from 'actions/complaints';
import { requestOwners, resetRequestOwners } from 'actions/owners';

const mapStateToProps = (state) => {
  const { isLoggedIn } = state.auth;

  const { isConnected, actionQueue } = state.network;

  let token = '';
  let errPostData = ''; 
  let dataOwner = null;

  if(state.auth.data != null && state.auth.data != undefined) {
    token = state.auth.data.token;
  }

  if(state.owners.dataOwner != null && state.owners.dataOwner){
    dataOwner = state.owners.dataOwner;
  }
  /*
    TODO:: errPostData -> message for error when add complaint
    if(state.complaints.errPostData != undefined){
      errPostData = state.complaints.errPostData;
    }
  */
 console.log(state);

  return {
    isLoggedIn,
    isConnected,
    actionQueue,
    token,
    dataOwner,
    // errPostData
  };
};

const mapDispatchToProps = { 
  requestAddComplaint, resetRequestComplaints,
  requestOwners, resetRequestOwners
};

export default connect(mapStateToProps, mapDispatchToProps)(AddComplaint);
