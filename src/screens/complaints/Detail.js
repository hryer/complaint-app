// import React from 'react';
// import RN from 'react-native';
// import { connect } from 'react-redux';

// import DetailComplaint from '../../components/complaints/detail';
// import { requestDetailComplaint, resetRequestComplaints, syncConnection } from 'actions/complaints';
// import { requestLogout } from 'actions/auth';

// const mapStateToProps = (state) => {
//   const { isLoggedIn } = state.auth;
//   const authData = state.auth.data;
//   const { detailData, isError, message } = state.complaints;

//   const { isConnected, actionQueue } = state.network;

//   return {
//     isLoggedIn,
//     authData,
//     data,
//     isError,
//     isConnected,
//     actionQueue,
//     message
//   };
// };

// const mapDispatchToProps = { requestComplaints, resetRequestComplaints, requestLogout, syncConnection };

// export default connect(mapStateToProps, mapDispatchToProps)(DetailComplaint);


// /*
//   DETAIL DATA -> 
//   USER BUKA LIST -> USER KLIK MAKA DIA AKAN NGE CALL REQUESTDETAIL DGN ID COMPLAINT 
//   -> navigation ke hal detail which is screen detail
// */