import React from 'react';
import RN from 'react-native';
import PropTypes from 'prop-types';
import { checkInternetConnection, offlineActionTypes } from 'react-native-offline';
import * as NB from 'native-base';
import * as NavigationService from 'libs/navigation/NavigationServices.js'
import moment from 'moment';
import Loading from '../utils/Loading';

const styles = RN.StyleSheet.create({
  fab: {
    backgroundColor: '#039978',
  }
});
class List extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isFetching: false,
      refreshing: false
    }
  }

  async componentWillMount() {
    if (this.props.isLoggedIn === false) {
      NavigationService.navigate('Login');
    }
    this.getData();
  }

  render() {
    const { data, actionQueue } = this.props;
    if (data === null || data === undefined) {
      return <Loading />
    } else {
      return (
        <NB.Container>
          <NB.Header noLeft>
            <NB.Left />
            <NB.Body>
              <NB.Title>List Complaint</NB.Title>
            </NB.Body>
            <NB.Right>
              <NB.Subtitle>
                Pending Upload : {actionQueue.length}
              </NB.Subtitle>
            </NB.Right>
          </NB.Header>
          <NB.List>
            <RN.FlatList
              data={data}
              refreshControl={
                <RN.RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              }
              renderItem={({ item }) => (
                <NB.ListItem key={item.id.toString()} onPress={() => this.getDetailData(item.id)}>
                  <NB.Left>
                    <NB.Text>{item.complaint}</NB.Text>
                  </NB.Left>
                  <NB.Body>
                    <NB.Text>{item.status}</NB.Text>
                    <NB.Text note>{item.category}</NB.Text>
                  </NB.Body>
                  <NB.Right>
                    <NB.Icon name="arrow-forward" />
                  </NB.Right>
                </NB.ListItem>
              )}
              keyExtractor={item => item.id.toString()}
            />
            <NB.Fab position='bottomRight' onPress={this.showMenu} style={styles.fab} >
              <NB.Icon name='menu' />
            </NB.Fab>
          </NB.List>
        </NB.Container>
      )
    }
  }

  getData = async () => {
    const { requestComplaints, isConnected, authData } = this.props;

    if (isConnected === true && authData != null && authData != undefined) {
      await requestComplaints({
        token: authData.token,
        startDate: moment().subtract(90, 'days').format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD')
      });
    }
  }

  getDetailData = async (complaint_id) => {
    const { requestDetailComplaint, isConnected, authData } = this.props;

    if (isConnected === true && authData != null && authData != undefined) {
      await requestDetailComplaint({
        token: authData.token,
        complaint_id: complaint_id
      });
    }
  }
  syncData = async () => {
    const isConnectedCall = await checkInternetConnection();

    if (isConnectedCall != this.props.isConnected) {
      this.setState(isConnected, isConnectedCall);
      this.props.syncConnection({ isConnected: isConnected });
    }

    this.getData();
    alert('sync data success');
  }

  onRefresh = async () => {
    this.setState({
      refreshing: true
    });

    await this.syncData();
    await this.setState({
      refreshing: false
    });
  };

  showMenu = () => {
    const options = [
      {
        text: 'Tambah Data Baru',
        icon: 'add',
        onPress: () => {
          NavigationService.navigate('AddComplaint');
        },
      },
      {
        text: 'Sinkronkan Data',
        icon: 'refresh',
        onPress: this.syncData,
      },
      {
        text: 'Logout',
        icon: 'log-out',
        onPress: () => {
          this.props.requestLogout();
        },
      }
    ];

    NB.ActionSheet.show({ options }, index => {
      if (options[index] && options[index].onPress) {
        options[index].onPress();
      }
    });
  }
}

List.propTypes = {
  isError: PropTypes.bool.isRequired,
  isConnected: PropTypes.bool.isRequired
};

export default List;

