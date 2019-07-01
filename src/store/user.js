import { createStore } from 'libs/store-manager';
import persistor from 'libs/store-manager/persistor/rn-fetch-blob';

class UserStore {
  get name() {
    return 'user';
  }

  get defaultData() {
    return {
      email: null,
    };
  }

  get persistor() {
    return persistor;
  }

  setUser(user) {
    this.setData(user);
  }

  clearUser() {
    this.setData(this.defaultData);
  }
}

export default createStore(UserStore);
