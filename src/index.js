import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StatusBar, View } from 'react-native'

import * as NB from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

// import DefaultRoute from 'src/routes';
import Login from 'src/screens/Login';
// import userStore from 'src/store/user';

import { name as appName } from '../app.json';

export default class App extends Component {
  componentDidMount() {
    // userStore.subscribe(this);
  }
  render() {
    return (
      <NB.StyleProvider style={getTheme(material)}>
        <NB.Root>
          {/* <Provider > */}
          <View style={{ flex: 1 }}>
            <StatusBar backgroundColor='black' barStyle='light-content' />
            <Login />
          </View>
          {/* </Provider> */}
        </NB.Root>
      </NB.StyleProvider>
    );
  }
}