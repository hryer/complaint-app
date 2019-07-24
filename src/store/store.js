import { createStore, compose, applyMiddleware } from 'redux';

import { persistStore } from "redux-persist";
import createSagaMiddleware from 'redux-saga';
import { createNetworkMiddleware } from 'react-native-offline';

import { persistedReducer } from 'reducers';
import watchSagas from 'sagas/rootSagas';
import logger from 'redux-logger';

export default configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const networkMiddleware = createNetworkMiddleware({
    actionTypes: ['REQUEST_ADD_COMPLAINT', 'REQUEST_EDIT_COMPLAINT'],
    queueReleaseThrottle: 200,
  });
  const middleware = [networkMiddleware, sagaMiddleware, logger];

  const store = createStore(
    persistedReducer,
    applyMiddleware(...middleware)
  );

  let persistor = persistStore(store);

  sagaMiddleware.run(watchSagas);

  return { store, persistor };
};
