import { combineReducers } from 'redux';
import { reducer as network } from 'react-native-offline';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { auth as authReducer } from './auth';
import { complaints as complaintsReducer } from './complaints';

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["navigation"]
};

const authPersistConfig = {
  key: "auth",
  storage: storage
}
const complaintsPersistConfig = {
  key: "complaints",
  storage: storage,
  blacklist: ["isNetworkBannerVisible"]
};

export const rootReducer = combineReducers({
  complaints: persistReducer(complaintsPersistConfig, complaintsReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  network
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
