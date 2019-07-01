const localStorage = window.localStorage;

const PREFIX = 'store-persist/';

const createKey = (name) => {
  return `${PREFIX}${name}`;
}

const load = (name, defaultData) => {
  const key = createKey(name);
  if (!localStorage.hasOwnProperty(key)) {
    return defaultData;
  }
  const json = localStorage.getItem(key);
  const data = JSON.parse(json);
  return data;
}

const save = (name, data) => {
  const key = createKey(name);
  const json = JSON.stringify(data);
  localStorage.setItem(key, json);
}

const remove = (name) => {
  const key = createKey(name);
  localStorage.removeItem(key);
}

export default {
  createKey,
  load,
  save,
  remove,
};
