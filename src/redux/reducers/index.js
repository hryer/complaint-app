import { combineReducers } from 'redux';
// import { reducer as network } from 'react-native-offline/src/redux';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { auth as authReducer } from './auth';
import { complaints as complaintsReducer } from './complaints';

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["auth", "complaints","navigation"]
};

const complaintsPersistConfig = {
  key: "complaints",
  storage: storage,
  blacklist: ["isNetworkBannerVisible"]
};

export const rootReducer = combineReducers({
  complaints: persistReducer(complaintsPersistConfig, complaintsReducer),
  auth: authReducer,
  // network
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const persistedReducer = combineReducers({
//   complaints: complaintsReducer,
//   auth: authReducer
// })
