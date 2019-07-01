import RNFetchBlob from 'rn-fetch-blob';
import { createQueueRunner } from './index';

const fs = RNFetchBlob.fs;
const enqueueAndRun = createQueueRunner();

const DATA_DIR = `${fs.dirs.DocumentDir}/.store-persist`;

const createKey = (name) => {
  return `${DATA_DIR}/${name}`;
}

const load = (name, defaultData) => {
  return enqueueAndRun(async () => {
    const filepath = createKey(name);
    const exists = await fs.exists(filepath);
    if (!exists) {
      return defaultData;
    }

    const json = await fs.readFile(filepath);
    const data = JSON.parse(json);
    return data;
  });
}

const save = (name, data) => {
  return enqueueAndRun(async () => {
    const isDir = await fs.isDir(DATA_DIR);
    if (!isDir) {
      await fs.mkdir(DATA_DIR);
    }

    const filepath = createKey(name);
    const json = JSON.stringify(data);
    await fs.writeFile(filepath, json);
  });
}

const remove = (name) => {
  return enqueueAndRun(async () => {
    const filepath = createKey(name);
    const exists = await fs.exists(filepath);
    if (exists) {
      await fs.unlink(filepath);
    }
  });
}

export default {
  createKey,
  load,
  save,
  remove,
};
