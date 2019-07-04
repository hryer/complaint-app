import { combineReducers } from 'redux';
import { reducer as network } from 'react-native-offline';

import {auth} from './auth';

const rootReducer = combineReducers({ 
  network,
  auth,
  complaints
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["network", "chat"]
};

const chatPersistConfig = {
  key: "chat",
  storage: storage,
  blacklist: ["isNetworkBannerVisible"]
};

const rootReducer = combineReducers({
  chat: persistReducer(chatPersistConfig, ChatReducer),
  network
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  applyMiddleware(networkMiddleware, sagaMiddleware)
);
let persistor = persistStore(store);