import React from 'react';
import RN from 'react-native';
import { checkInternetConnection, offlineActionTypes } from 'react-native-offline';
import * as NB from 'native-base';
import * as NavigationService from 'libs/navigation/NavigationServices.js'
import moment from 'moment';
class List extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      showComplaints: []
    };
  }

  componentDidMount() {
    const { requestComplaints, isConnected, actionQueue, authData } = this.props;
    this.state.showComplaints = [];

    if (isConnected === true) {
      requestComplaints({
        token: authData.token,
        startDate: moment().subtract(30, 'days').format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD')
      });
    }

    if (this.props.data != null && this.props.data != undefined) {
      this.state.showComplaints = [...this.props.data];
    }
    console.log('props');
    console.log(this.props);
    console.log('props');
    console.log(this.state.showComplaints);
    if (this.props.isLoggedIn === false) {
      NavigationService.navigate('Login');
    }
  }

  render() {
    return (
      <NB.Container>
        <NB.Header noLeft>
          <NB.Left />
          <NB.Body>
            <NB.Title>List Complaint</NB.Title>
          </NB.Body>
          <NB.Right />
        </NB.Header>

        <NB.Content>
          <NB.List>
            <RN.FlatList
              data={this.state.showComplaints}
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
                    <NB.Icon name="arrow-forward" />
                  </NB.Right>
                </NB.ListItem>
              )}
              keyExtractor={item => item.id.toString()}
            />
          </NB.List>

        </NB.Content>

        <NB.Fab position='bottomRight' onPress={this.showMenu}>
          <NB.Icon name='menu' />
        </NB.Fab>
      </NB.Container>
    )
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
        onPress: async () => {
          const isConnectedCall = await checkInternetConnection();
          
          if(isConnectedCall != this.props.isConnected){
            this.setState(isConnected,isConnectedCall);
            this.props.syncConnection({ isConnected: isConnected });
            alert('sync success');
            // TODO: CHECK IF CONNECTION TRUS META AUTOMATE TRUE AND THEN UPLOAD THE OFFLINEQUEUE
          }
        },
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

export default List;

