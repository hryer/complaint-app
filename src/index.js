import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StatusBar, View } from 'react-native';

import DefaultRoute from 'src/routes';
import configureStore from './store/store';
import * as NavigationService from 'libs/navigation/NavigationServices.js'

import * as NB from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import { PersistGate } from "redux-persist/integration/react";
import Loading from './components/utils/Loading';
import Instabug from 'instabug-reactnative';

import { name as appName } from '../app.json';

const confStore = configureStore();
const store = confStore.store;
const persistor = confStore.persistor;

export default class App extends Component {
  constructor() {
    super();
    Instabug.startWithToken('3790695211b83f817e88113377690bd4', [Instabug.invocationEvent.screenshot]);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor} >
          <NB.StyleProvider style={getTheme(material)}>
            <NB.Root>
              <View style={{ flex: 1 }}>
                <DefaultRoute ref={nav => { NavigationService.setNavigator(nav) }} />
              </View>
            </NB.Root>
          </NB.StyleProvider>
        </PersistGate>
      </Provider>
    );
  }
}