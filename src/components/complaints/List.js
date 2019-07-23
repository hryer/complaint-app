import React from 'react';
import RN from 'react-native';
import PropTypes from 'prop-types';
import { checkInternetConnection, offlineActionTypes } from 'react-native-offline';
import * as NB from 'native-base';
import * as NavigationService from 'libs/navigation/NavigationServices.js'
import moment from 'moment';
import Loading from '../Loading';
const styles = RN.StyleSheet.create({
  fab: {
    backgroundColor: '#039978',
  }
});
class List extends React.PureComponent {
  constructor() {
    super();
  }

  async componentDidMount() {
    if (this.props.isLoggedIn === false) {
      NavigationService.navigate('Login');
    }
    this.getData();
  }

  render() {
    if (this.props.data === null || this.props.data === undefined) {
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
                Pending Upload : {this.props.actionQueue.length}
              </NB.Subtitle>
            </NB.Right>
          </NB.Header>
          <NB.Content>
            <NB.List>
              <RN.FlatList
                data={this.props.data}
                renderItem={({ item }) => (
                  <NB.ListItem key={item.id.toString()}>
                    <NB.Left>
                      <NB.Text>{item.category}</NB.Text>
                    </NB.Left>
                    <NB.Body>
                      <NB.Text>{item.complaint}</NB.Text>
                      <NB.Text note>{item.status}</NB.Text>
                    </NB.Body>
                    <NB.Right>
                      <NB.Icon name="arrow-forward" onPress={() => this.getDetailData(item.id)}/>
                    </NB.Right>
                  </NB.ListItem>
                )}
                keyExtractor={item => item.id.toString()}
              />
            </NB.List>
          </NB.Content>
          <NB.Fab position='bottomRight' onPress={this.showMenu} style={styles.fab} >
            <NB.Icon name='menu' />
          </NB.Fab>
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
    const { requestDetailComplaint, isConnectedf, authData } = this.props;

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

AddComplaint.propTypes = {
  isError: PropTypes.bool.isRequired,
  isConnected: PropTypes.bool.isRequired
};

export default List;

