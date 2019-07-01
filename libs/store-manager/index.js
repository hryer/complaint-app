import React from 'react';

const stores = {};

export const getStores = () => {
  return stores;
}

export const createStore = (Klass) => {
  const init = function(store) {
    if (typeof store.name !== 'string') {
      throw new Error(`Store class must have string 'name'.`);
    }
    if (store.name in stores) {
      throw new Error(`Store '${store.name}' has already been declared.`);
    }
    if (!('defaultData' in store)) {
      throw new Error(`Store class must have 'defaultData'.`);
    }

    store._data = store.defaultData;
    store._prevData = undefined;
    store._isReady = false;
    store._readyListeners = [];
  };

  Object.defineProperty(Klass.prototype, 'data', {
    get: function() {
      return this._data;
    }
  });

  Object.defineProperty(Klass.prototype, 'prevData', {
    get: function() {
      return this._prevData;
    }
  });

  Klass.prototype.setData = function(data, setOnly=false) {
    if (this._data === data) return;

    this._prevData = this._data;
    this._data = data;

    if (setOnly) return;

    notify(this);

    if (typeof this.persistor === 'object') {
      if (typeof this.persistor.save === 'function') {
        this.persistor.save(this.name, this._data);
      }
    }
  };

  Klass.prototype.subscribe = function(subscriber) {
    return subscribe(this, subscriber);
  };

  const loadData = async (store) => {
    if (typeof store.persistor === 'object') {
      if (typeof store.persistor.load === 'function') {
        try {
          let data = store.persistor.load(store.name, store.defaultData);
          if (data instanceof Promise) {
            data = await data;
          }
          store._data = data;
        } catch (error) {
          console.error(error);
        }
      }
    }

    store._isReady = true;
    callReadyListeners(store);
  };

  Klass.prototype.onReady = function(listener) {
    this._readyListeners.push(listener);
    callReadyListeners(this);
  };

  const callReadyListeners = (store) => {
    if (!store._isReady) return;
    while (store._readyListeners.length > 0) {
      const listener = store._readyListeners.shift();
      listener(store.name, store._data);
    }
  };

  const store = new Klass();
  init(store);
  loadData(store);
  stores[store.name] = store;
  return store;
}

const subscribers = {};

const subscribe = (store, subscriber) => {
  if (!(store.name in subscribers)) {
    subscribers[store.name] = new Set();
  }
  subscribers[store.name].add(subscriber);

  if (subscriber instanceof React.Component) {
    const componentWillUnmount = subscriber.componentWillUnmount;
    subscriber.componentWillUnmount = function() {
      unsubscribe(store, subscriber);
      if (typeof componentWillUnmount === 'function') {
        this.componentWillUnmount = componentWillUnmount;
        this.componentWillUnmount();
      } else {
        delete this.componentWillUnmount;
      }
    };
  }

  return () => unsubscribe(store, subscriber);
}

const unsubscribe = (store, subscriber) => {
  if (!(store.name in subscribers)) return;
  subscribers[store.name].delete(subscriber);
}

const notify = (store) => {
  if (!(store.name in subscribers)) return;
  for (let subscriber of subscribers[store.name]) {
    if (subscriber instanceof React.Component) {
      subscriber.setState({
        _storeNotify: Math.random(),
      });
      continue;
    }
    if (typeof subscriber === 'function') {
      subscriber(store.name, store._data, store._prevData);
      continue;
    }
  }
}
