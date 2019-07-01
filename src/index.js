import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StatusBar, View } from 'react-native'

import * as NB from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

import DefaultRoute from 'src/routes';
import Login from 'src/screens/Login';
import configureStore from './store';

import { name as appName } from '../app.json';
const store = configureStore();
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NB.StyleProvider style={getTheme(material)}>
          <NB.Root>
            <View style={{ flex: 1 }}>
              <StatusBar backgroundColor='black' barStyle='light-content' />
              <DefaultRoute />
            </View>
          </NB.Root>
        </NB.StyleProvider>
      </Provider>
    );
  }
}