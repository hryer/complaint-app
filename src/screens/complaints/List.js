import React from 'react';
import RN from 'react-native';
import * as NB from 'native-base';
import console = require('console');

export default class List extends React.PureComponent {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log(this.props);
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