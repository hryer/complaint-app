// import React from 'react';
// import RN from 'react-native';
// import * as NB from 'native-base';
// import moment from 'moment';
// import memoize from 'libs/memoize';

// import userStore from 'src/store/user';
// import formsStore from 'src/store/forms

// const RNProgressDialog = RN.NativeModules.RNProgressDialog;
// const Netw = RN.NativeModules.Netw;

// let isPermissionAsked = false;

// export default class Home extends React.PureComponent {
//   getForms = memoize({
//     getArgs: () => [ formsStore.data ],
//     fn: () => {
//       return formsStore.data
//         .filter(item => !item.deletedAt)
//         .reverse()
//     },
//   })

//   getUnuploadedCount = memoize({
//     getArgs: () => [ formsStore.data ],
//     fn: () => {
//       let count = 0;
//       count += formsStore.getUnuploaded().length;
//       return count;
//     },
//   })

//   render() {
//     const forms = this.getForms();

//     return (
//       <NB.Container>
//         <NB.Header noLeft>
//           <NB.Left />
//           <NB.Body>
//             <NB.Title>
//               {userStore.data.email.split('@').shift()}
//             </NB.Title>
//           </NB.Body>
//           <NB.Right />
//         </NB.Header>

//         <NB.Content padder>
//           {
//             forms.length === 0 ? (
//               <NB.Text>
//                 Belum ada data
//               </NB.Text>
//             ) : (
//               <FormList forms={forms} navigation={this.props.navigation} />
//             )
//           }
//         </NB.Content>

//         <NB.Fab
//           position='bottomRight'
//           onPress={this.showMenu}
//           style={styles.fab}
//         >
//           <NB.Icon name='menu' />
//         </NB.Fab>
//       </NB.Container>
//     );
//   }

//   componentDidMount() {
//     this.askPermission();
//     formsStore.subscribe(this);
//   }

//   askPermission = async () => {
//     if (isPermissionAsked) return;

//     try {
//       await RN.PermissionsAndroid.requestMultiple([
//         RN.PermissionsAndroid.PERMISSIONS.CAMERA,
//         RN.PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         RN.PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
//         RN.PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//       ]);
//     } catch (err) {
//       console.log(err);
//       alert(err.message);
//     }

//     isPermissionAsked = true;
//   }

//   showMenu = () => {
//     const unuploadedCount = this.getUnuploadedCount();
//     const options = [
//       {
//         text: 'Tambah Data Baru',
//         icon: 'add',
//         onPress: () => {
//           this.props.navigation.navigate('Labeling');
//         },
//       },
//       {
//         text: 'Sinkronkan Data' + (unuploadedCount > 0 ? ` (${unuploadedCount})` : ''),
//         icon: 'refresh',
//         onPress: () => {
//           this.uploadData();
//         },
//       },
//       {
//         text: 'Logout',
//         icon: 'log-out',
//         onPress: () => {
//           this.logout();
//         },
//       },
//       {
//         text: 'Developer Info',
//         icon: 'warning',
//         onPress: () => {
//           this.props.navigation.navigate('DeveloperInfo');
//         },
//       },
//     ];

//     NB.ActionSheet.show({ options }, index => {
//       if (options[index] && options[index].onPress) {
//         options[index].onPress();
//       }
//     });
//   }

//   uploadData = async () => {
//     await RNProgressDialog.show('Loading...');
//     try {
//       await sensorApi.forceWifiUsage(false);
//       await Netw.checkInternet();
//     } catch (err) {
//       await RNProgressDialog.dismiss();
//       alert('No internet connection');
//       return;
//     }

//     try {
//       await RNProgressDialog.show('Uploading...');
//       await DataSensor.uploadAll();
//       await formsStore.uploadData(progress => {
//         const percent = progress*100;
//         RNProgressDialog.show(`Uploading ${Math.round(percent)}%`);
//       });
//       await RNProgressDialog.dismiss();
//       alert('Done');
//     } catch (err) {
//       console.log(err);
//       await RNProgressDialog.dismiss();
//       alert(err.message);
//     }
//   }

//   logout = () => {
//     userStore.clearUser();
//   }
// }

// class FormList extends React.PureComponent {
//   render() {
//     return (
//       <RN.FlatList
//         data={this.props.forms}
//         keyExtractor={this.keyExtractor}
//         renderItem={this.renderItem}
//       />
//     );
//   }

//   keyExtractor = (item, index) => {
//     return item.id;
//   }

//   renderItem = ({ item }) => {
//     return (
//       <NB.Card>
//         <NB.CardItem>
//           <NB.Body>
//             <NB.Text>
//               Tanggal : {
//                 moment(item.createdAt).format('D MMM YY, HH:mm')
//               }
//             </NB.Text>
//             <NB.Text>
//               Kolam : {
//                 item.metadata.pondInfo
//               }
//             </NB.Text>
//             <NB.Text>
//               Sensor : {
//                 item.metadata.sensorId
//               }
//             </NB.Text>
//             {
//               formsStore.checkUploaded(item) ? (
//                 <NB.Text>
//                   Upload: {moment(item.uploadedAt).format('D MMM YY, HH:mm')}
//                 </NB.Text>
//               ) : (
//                 <NB.Text style={styles.unuploaded}>
//                   Upload: belum upload
//                 </NB.Text>
//               )
//             }
//           </NB.Body>
//         </NB.CardItem>
//         <NB.CardItem
//           footer
//           button
//           onPress={() => this.props.navigation.navigate('Labeling', { id: item.id })}
//         >
//           <NB.Text>Buka</NB.Text>
//         </NB.CardItem>
//       </NB.Card>
//     );
//   }
// }

// const styles = RN.StyleSheet.create({
//   fab: {
//     backgroundColor: '#3F51B5',
//   },
//   unuploaded: {
//     backgroundColor: 'red',
//     color: 'white',
//   },
// });
