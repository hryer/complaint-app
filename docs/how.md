# How To Use :

## Redux Saga
Let's say you want to create ajax call or something like that using redux saga maybe this `md` can help you.

1. Install `redux` and `redux saga`.
    ```javascript
      npm install react-redux redux redux-actions redux-logger redux-saga
    ```
    or you can use yarn
     ```javascript
      yarn add react-redux redux redux-actions redux-logger redux-saga
    ```
   We use `redux-actions` for create and handling actions redux, and `redux-logger` for debugging on this project.
   

2. On your `store` file add saga middleware to your store middleware, don't forget to run saga middleware the basic configuration is like    this

    Basic Configuration
    ```javascript
      const sagaMiddleware = createSagaMiddleware()

      const store = createStore(
        reducer,
        applyMiddleware(sagaMiddleware)
      )
      sagaMiddleware.run(helloSaga)
    ```

    If you use redux logger or another middleware
    ```javascript
    import { createStore, compose, applyMiddleware } from 'redux';
    import createSagaMiddleware from 'redux-saga';
    import watchSagas from 'sagas/rootSagas';
    import logger from 'redux-logger';

    const sagaMiddleware = createSagaMiddleware();
    
    const middleware = [sagaMiddleware, logger];
    
    const store = createStore(
      reducer,
      applyMiddleware(...middleware)
    );
    sagaMiddleware.run(watchSagas);
    
    return { store };
    ```

    when sagaMiddleware run ```sagaMiddleware.run(watchSagas);``` this code will watchSagas function
    #note you can the redux logger on console browser

3. Create `sagas` folder and `rootSagas` file on it
    ```javascript
    export default function* watchSagas() {
      yield all([
        takeEvery(Types.REQUEST_LOGIN, getAuth),
        takeEvery(Types.REQUEST_LOGOUT, logoutAuth),
        takeEvery(Types.REQUEST_COMPLAINTS, getComplaints),
        takeEvery(Types.REQUEST_ADD_COMPLAINT, postComplaint),
        takeEvery(Types.REQUEST_GET_OWNERS, getOwners),
        takeEvery(Types.REQUEST_GET_BARCODES, getBarcodes),
        takeEvery(Types.REQUEST_DETAIL_COMPLAINT, getDetailComplaint),
        takeEvery(Types.REQUEST_EDIT_COMPLAINT, putComplaint)
      ]);
    }
    ```
   watchSagas awalys running on the app. When actions called like ```Types.REQUEST_LOGIN``` that things will called ```getAuth``` function
   inside the function you can manipulated it with your ajax or anything you want for the details you can check on ```src/sagas/auth.js```, ```src/sagas/rootSagas.js```, and ```src/api/auth.js```

   for the details about redux sagas you can check on [official docs](https://redux-saga.js.org/)

## React Native Offline

1. Install `react native offline` 
  ```javascript
    npm install react-native-offline
  ```
  or you can use yarn
  ```javascript
    yarn add react-native-offline
  ```
2. Go to `android/app/src/main/AndroidManifest.xml` add this code to your AndroidManifest you can see the example on the same folder at this project.
```javascript
  <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```
3. add this code into `rootSagas` ```fork(networkSaga, {pingInterval: 20000})``` you can set the ping interval as you wish
  this is example code config networkSaga react native offline
  ```javascript
  import { all, takeEvery, fork } from 'redux-saga/effects';
  import { networkSaga } from 'react-native-offline';
  import * as Types from 'actions/types';
  import { getAuth, logoutAuth } from './auth';
  import {
    getComplaints, postComplaint,
    getDetailComplaint,
    putComplaint
  } from './complaints';
  import { getOwners, getBarcodes } from './owners';

  export default function* watchSagas() {
    yield all([
      takeEvery(Types.REQUEST_GET_BARCODES, getBarcodes),
      takeEvery(Types.REQUEST_DETAIL_COMPLAINT, getDetailComplaint),
      takeEvery(Types.REQUEST_EDIT_COMPLAINT, putComplaint),
      fork(networkSaga, { pingInterval: 20000 }),
    ]);
  }
  ```
4. To use rn offline for queue data if the connection false you can set on the action files
  if you use react actions packages you can set the action like this
  ```javascript
  export const requestEditComplaint = createAction('REQUEST_EDIT_COMPLAINT', payload => payload, () => ({ retry: true }));
  ```
  it's means you create action `requesteditcomplaint` with payload and then if the network isn't connected it'll retry the action if the connection comes to online
5. Don't forget add network reducer to your combine reducer 
  ```javascript
  import { reducer as network } from 'react-native-offline';

  export const rootReducer = combineReducers({
    complaints: persistReducer(complaintsPersistConfig, complaintsReducer),
    auth: persistReducer(authPersistConfig, authReducer),
    owners: persistReducer(ownersPersistsConfig, ownersReducer),
    network
  });
  ```
6. Register your actions to network middleware, you can check for the details on `src/store/store.js`
  ```javascript
  const networkMiddleware = createNetworkMiddleware({
    actionTypes: ['REQUEST_ADD_COMPLAINT', 'REQUEST_EDIT_COMPLAINT'],
    queueReleaseThrottle: 200,
  });
  ```

7. Your data will store into networks and you can check the data on actionQueue and you can check the connection is offline or online on isConnected boolean
  ```javascript
  type NetworkState = {
    isConnected: boolean,
    actionQueue: Array<*>
  }
  ```