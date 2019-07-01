// import React from 'react';
// import RN from 'react-native';
// import * as NB from 'native-base';
// import moment from 'moment';
// import DataUtil from 'libs/DataUtil';

// import DataSensor from 'src/api/DataSensor';
// import userStore from 'src/store/user';
// import formsStore from 'src/store/forms';
// import logDao from 'src/database/log';

// export default class DeveloperInfo extends React.PureComponent {
//   state = {
//     page: 'init',
//   }

//   render() {
//     return (
//       <NB.Container>
//         <NB.Header noLeft>
//           <NB.Left />
//           <NB.Body>
//             <NB.Title>
//               Developer Info
//             </NB.Title>
//           </NB.Body>
//           <NB.Right>
//             <NB.Button
//               hasText
//               transparent
//               onPress={() => this.setState({ page: 'forms' })}
//             >
//               <NB.Text>
//                 {
//                   this.state.page === 'forms' ? (
//                     `[Forms]`
//                   ) : (
//                     `Forms`
//                   )
//                 }
//               </NB.Text>
//             </NB.Button>
//             <NB.Button
//               hasText
//               transparent
//               onPress={() => this.setState({ page: 'logs' })}
//             >
//               <NB.Text>
//                 {
//                   this.state.page === 'logs' ? (
//                     `[Logs]`
//                   ) : (
//                     `Logs`
//                   )
//                 }
//               </NB.Text>
//             </NB.Button>
//           </NB.Right>
//         </NB.Header>

//         <NB.Content padder>
//           {
//             this.state.page === 'init' && (
//               <NB.Text>Initializing...</NB.Text>
//             )
//           }
//           {
//             this.state.page === 'forms' && (
//               this.state.forms.length === 0 ? (
//                 <NB.Text>Kosong</NB.Text>
//               ) : (
//                 <FormList data={this.state.forms} />
//               )
//             )
//           }
//           {
//             this.state.page === 'logs' && (
//               this.state.logs.length === 0 ? (
//                 <NB.Text>Kosong</NB.Text>
//               ) : (
//                 <LogList data={this.state.logs} />
//               )
//             )
//           }
//         </NB.Content>
//       </NB.Container>
//     );
//   }

//   async componentDidMount() {
//     try {
//       const forms = formsStore.data.concat().reverse().map(item => {
//         const info = { ...item };
//         info.createdAt = moment(info.createdAt).format();
//         if (info.updatedAt) {
//           info.updatedAt = moment(info.updatedAt).format();
//         }
//         if (info.deletedAt) {
//           info.deletedAt = moment(info.deletedAt).format();
//         }
//         if (info.uploadedAt) {
//           info.uploadedAt = moment(info.uploadedAt).format();
//         }
//         info.metadata = { ...info.metadata };
//         if (info.metadata.timeStart) {
//           info.metadata.timeStart = moment(info.metadata.timeStart).format();
//         }
//         if (info.metadata.timeStop) {
//           info.metadata.timeStop = moment(info.metadata.timeStop).format();
//         }
//         if (info.metadata.timeEnd) {
//           info.metadata.timeEnd = moment(info.metadata.timeEnd).format();
//         }
//         return info;
//       });

//       let logs = await logDao.selectAll();
//       logs = logs.reverse().map(item => {
//         const info = {
//           timestamp: moment(item.timestamp).format(),
//           sensorId: item.sensorId,
//           topic: item.topic,
//         };
//         if (info.topic === 'sen_info') {
//           info.data = JSON.parse(item.data);
//           info.data.time = moment(info.data.time*1000).format();
//           info.data.startupTime = moment(info.data.startupTime*1000).format();
//         }
//         if (info.topic === 'sen_log') {
//           const buffer = DataSensor.parseBase64(item.data);
//           const senLog = DataUtil.parseDeviceLog(buffer);
//           info.data = senLog;
//         }
//         return info;
//       });

//       this.setState({
//         page: this.props.navigation.getParam('page', 'forms'),
//         forms,
//         logs,
//       });

//     } catch (err) {
//       console.log(err);
//       alert(err.message);
//     }
//   }
// }

// class MyFlatList extends React.PureComponent {
//   render() {
//     return (
//       <RN.FlatList
//         data={this.props.data}
//         keyExtractor={this.keyExtractor}
//         renderItem={this.renderItem}
//       />
//     );
//   }

//   keyExtractor = (item, index) => {
//     return item.id || item.timestamp || index;
//   }

//   renderItem = ({ item, index }) => {
//     return (
//       <ListItem id={this.keyExtractor(item, index)} data={item} />
//     );
//   }
// }

// class FormList extends MyFlatList {}
// class LogList extends MyFlatList {}

// class ListItem extends React.PureComponent {
//   state = {
//     isExpand: false,
//   }

//   render() {
//     this._prevId = this.props.id;

//     const data = { ...this.props.data };
//     if (data.data && !this.state.isExpand) {
//       data.data = '(tap to show)';
//     }

//     return (
//       <React.Fragment>
//         <NB.Text style={styles.smallFont} onPress={this.toggleExpand}>
//           {JSON.stringify(data, null, 2)}
//         </NB.Text>
//         <NB.View style={styles.separator} />
//       </React.Fragment>
//     );
//   }

//   toggleExpand = () => {
//     if (this.props.data.data) {
//       this.setState({ isExpand: !this.state.isExpand });
//     }
//   }

//   componentDidUpdate = () => {
//     if (this._prevId !== this.props.id) {
//       this.setState({ isExpand: false });
//     }
//   }
// }

// const styles = RN.StyleSheet.create({
//   inline: {
//     flexDirection: 'row',
//   },
//   smallFont: {
//     fontSize: 12,
//   },
//   separator: {
//     backgroundColor: '#888',
//     height: 1,
//     marginTop: 8,
//     marginBottom: 8,
//   },
// });
