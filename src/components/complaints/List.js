import React from 'react';
import RN from 'react-native';
import { checkInternetConnection, offlineActionTypes } from 'react-native-offline';
import * as NB from 'native-base';
import * as NavigationService from 'libs/navigation/NavigationServices.js'
import moment from 'moment';
class List extends React.PureComponent {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.requestComplaints({
      token: this.props.token,
      startDate: moment().subtract(30, 'days').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD')
    });
    // const {token, isLoggedIn, username} = this.props;

    // if(token != null && token != undefined) {
    //   this.setState(token,token);
    // }

    console.log(this.props);
    console.log(this.state);
    if (this.props.isLoggedIn === false) {
      NavigationService.navigate('Login');
    }
  }

async internetChecker() {
  const isConnected = await checkInternetConnection();
  // Dispatching can be done inside a connected component, a thunk (where dispatch is injected), saga, or any sort of middleware
  // In this example we are using a thunk
  console.log(isConnected);
  // dispatch({
  //   type: offlineActionTypes.CONNECTION_CHANGE,
  //   payload: isConnected,
  // });
}

showMenu = () => {
  const options = [
    {
      text: 'Tambah Data Baru',
      icon: 'add',
      onPress: () => {
        alert('wakwaw');
      },
    },
    {
      text: 'Sinkronkan Data',
      icon: 'refresh',
      onPress: () => {
        this.internetChecker();
      },
    },
    {
      text: 'Logout',
      icon: 'log-out',
      onPress: () => {
        alert('logout');
      },
    }
  ];

  NB.ActionSheet.show({ options }, index => {
    if (options[index] && options[index].onPress) {
      options[index].onPress();
    }
  });
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
        <NB.Text>DAMN IT</NB.Text>
      </NB.Content>
      <NB.Fab position='bottomRight' onPress={this.showMenu}>
        <NB.Icon name='menu' />
      </NB.Fab>
    </NB.Container>
  )
}
}

export default List;

