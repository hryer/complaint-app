import { createStore, compose, applyMiddleware } from 'redux';

import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from 'redux-saga';
import { offline } from '@redux-offline/redux-offline';
import defaultConfig from '@redux-offline/redux-offline/lib/defaults';
import { createOfflineMiddleware } from '@redux-offline/redux-offline/lib/middleware';
import { reducer as network, createNetworkMiddleware } from "react-native-offline";

import reducers from '../redux/reducers';
import watchSagas from 'sagas/rootSagas';
import logger from 'redux-logger';

const offlineConfig = {
  ...defaultConfig,
};

const sagaMiddleware = createSagaMiddleware();
const networkMiddleware = createNetworkMiddleware();
const middleware = [createOfflineMiddleware(offlineConfig), sagaMiddleware, logger];
// const middleware = [networkMiddleware, sagaMiddleware, logger];


export default function configureStore(initialState = {}) {
  const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const createOfflineStore = offline(offlineConfig)(createStore);
  const store = createOfflineStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );

  // run the sagas
  sagaMiddleware.run(watchSagas);

  return store;
};
