/*
  DETAIL DATA -> 
  USER BUKA LIST -> USER KLIK MAKA DIA AKAN NGE CALL REQUESTDETAIL DGN ID COMPLAINT 
  -> navigation ke hal detail which is screen detail
*/

import React from 'react';
import RN from 'react-native';
import { connect } from 'react-redux';

import AddComplaint from '../../components/complaints/Add';
import { requestEditComplaint, resetRequestComplaints } from 'actions/complaints';
import {
  requestGetBarcodes, resetRequestBarcodes
} from 'actions/owners';
import { requestLogout } from 'actions/auth';

const mapStateToProps = (state) => {
  const { isLoggedIn } = state.auth;

  const { isConnected, actionQueue } = state.network;

  let token = '';
  let dataOwner = null;
  let dataBarcode = null;
  let detailData = null;
  const screenComponent = 'Detail Complaint';

  if (state.auth.data != null && state.auth.data != undefined) {
    token = state.auth.data.token;
  }

  if (state.owners.dataOwner != null && state.owners.dataOwner) {
    dataOwner = state.owners.dataOwner;
    if (state.owners.dataBarcode != null && state.owners.dataBarcode) {
      if (state.owners.dataBarcode.success === true) {
        dataBarcode = state.owners.dataBarcode.data;
      }
    }
  }

  if (state.complaints.detailData != null && state.complaints.detailData != undefined) {
    detailData = state.complaints.detailData;
  }

  return {
    isLoggedIn,
    isConnected,
    actionQueue,
    token,
    dataOwner,
    dataBarcode,
    detailData,
    screenComponent
  };
};

const mapDispatchToProps = {
  requestEditComplaint, resetRequestComplaints,
  requestGetBarcodes, resetRequestBarcodes,
  requestLogout
};

export default connect(mapStateToProps, mapDispatchToProps)(AddComplaint);
