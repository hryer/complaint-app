import { AsyncStorage } from 'react-native';
import { createQueueRunner } from './index';

const enqueueAndRun = createQueueRunner();

const PREFIX = 'store-persist/';

const createKey = (name) => {
  return `${PREFIX}${name}`;
}

const load = (name, defaultData) => {
  return enqueueAndRun(async () => {
    const key = createKey(name);
    const allKeys = await AsyncStorage.getAllKeys();
    if (!(key in allKeys)) {
      return defaultData;
    }
    const json = await AsyncStorage.getItem(key);
    const data = JSON.parse(json);
    return data;
  });
}

const save = (name, data) => {
  return enqueueAndRun(async () => {
    const key = createKey(name);
    const json = JSON.stringify(data);
    await AsyncStorage.setItem(key, json);
  });
}

const remove = async (name) => {
  return enqueueAndRun(async () => {
    const key = createKey(name);
    await AsyncStorage.removeItem(key);
  });
}

export default {
  createKey,
  load,
  save,
  remove,
};
