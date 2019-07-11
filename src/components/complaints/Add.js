import React from 'react';
import RN from 'react-native';
import * as NB from 'native-base';
import * as NavigationService from 'libs/navigation/NavigationServices.js'
import moment from 'moment';
class List extends React.PureComponent {
  constructor() {
    super();
  }

  componentDidMount() {
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
        <NB.Header>
          <NB.Left />
          <NB.Body>
            <NB.Title>Add Complaint</NB.Title>
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

