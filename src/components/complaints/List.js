import React from 'react';
import RN from 'react-native';
import * as NB from 'native-base';
import * as NavigationService from 'libs/navigation/NavigationServices.js'
import moment from 'moment';
class List extends React.PureComponent {
  constructor() {
    super();
    // this.state = {
    //   token = '',
    //   username = ''
    // }
  }

  componentDidMount() {
    console.log(this.props);
    this.props.requestComplaints({
      token : this.props.token,
      startDate : moment().subtract('days', 7).format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD')
    });
    // const {token, isLoggedIn, username} = this.props;

    // if(token != null && token != undefined) {
    //   this.setState(token,token);
    // }
    if (this.props.isLoggedIn === false) {
      NavigationService.navigate('Login');
    }
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
          alert('sinkron');
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

