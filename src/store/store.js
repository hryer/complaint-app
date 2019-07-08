import { createStore, compose, applyMiddleware } from 'redux';

import { persistStore } from "redux-persist";
import createSagaMiddleware from 'redux-saga';
// import { offline } from '@redux-offline/redux-offline';
// import defaultConfig from '@redux-offline/redux-offline/lib/defaults';
// import { createOfflineMiddleware } from '@redux-offline/redux-offline/lib/middleware';
import { createNetworkMiddleware } from "react-native-offline";

import { persistedReducer } from 'reducers';
import watchSagas from 'sagas/rootSagas';
import logger from 'redux-logger';

export default configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const networkMiddleware = createNetworkMiddleware();
  const middleware = [networkMiddleware, sagaMiddleware, logger];
  const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    persistedReducer,
    applyMiddleware(...middleware)
  );

  let persistor = persistStore(store);

  // run the sagas
  sagaMiddleware.run(watchSagas);

  return { store, persistor };
};
