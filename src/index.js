import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StatusBar, View } from 'react-native'

import * as NB from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

import DefaultRoute from 'src/routes';
import configureStore from './store/store';
import * as NavigationService from 'libs/navigation/NavigationServices.js'

import { name as appName } from '../app.json';

const store = configureStore();
export default class App extends Component {
  componentDidMount() {
    NavigationService.setNavigator(this.navigator);
  }

  render() {
    return (
      <Provider store={store}>
        <NB.StyleProvider style={getTheme(material)}>
          <NB.Root>
            <View style={{ flex: 1 }}>
              <DefaultRoute ref={nav => { this.navigator = nav;}} />
            </View>
          </NB.Root>
        </NB.StyleProvider>
      </Provider>
    );
  }
}