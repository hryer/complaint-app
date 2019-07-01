import { createStore, compose, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';
import { offline } from '@redux-offline/redux-offline';
import defaultConfig from '@redux-offline/redux-offline/lib/defaults';
import { createOfflineMiddleware } from '@redux-offline/redux-offline/lib/middleware';

import combineReducers from './redux/reducers';
// import { watchSagas } from './sagas';
import logger from 'redux-logger'

const offlineConfig = {
  ...defaultConfig,
};

// const sagaMiddleware = createSagaMiddleware(); sagaMiddleware, 
const middleware = [logger, createOfflineMiddleware(offlineConfig)];

export default function configureStore(initialState = {}) {
  const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const createOfflineStore = offline(offlineConfig)(createStore);

  const store = createOfflineStore(
    combineReducers,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );

  // run the sagas
  // sagaMiddleware.run(watchSagas);

  return store;
};