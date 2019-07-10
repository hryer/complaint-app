import React from 'react';
import RN from 'react-native';
import * as NB from 'native-base';
import * as NavigationService from 'libs/navigation/NavigationServices.js'

class List extends React.PureComponent {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log(this.props);
    if(this.props.isLoggedIn === false) {
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
          <NB.Text>DAMN IT</NB.Text>
        </NB.Content>
      </NB.Container>
    )
  }
}

export default List;

