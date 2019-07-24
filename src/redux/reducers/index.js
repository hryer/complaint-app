import { combineReducers } from 'redux';
import { reducer as network } from 'react-native-offline';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { auth as authReducer } from './auth';
import { complaints as complaintsReducer } from './complaints';
import { owners as ownersReducer } from './owners';

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["navigation"],
  whitelist: ['auth', 'complaints', 'owners'],
  timeout: null
};

const authPersistConfig = {
  key: "auth",
  storage: storage,
  timeout: null,
}
const complaintsPersistConfig = {
  key: "complaints",
  storage: storage,
  blacklist: ["isNetworkBannerVisible"], // TODO: this is for component isNetworkBannerVisible (belum dibikin)
  timeout: null,
};

const ownersPersistsConfig = {
  key: "owners",
  storage: storage,
  timeout: null
}

export const rootReducer = combineReducers({
  complaints: persistReducer(complaintsPersistConfig, complaintsReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  owners: persistReducer(ownersPersistsConfig, ownersReducer),
  network
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
