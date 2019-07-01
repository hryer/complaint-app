import React from 'react';
import { getStores } from '../index';

export class StorePersistorGate extends React.PureComponent {
  constructor(props) {
    super(props);
    this.stores = getStores();
    this.state = {
      isDataLoaded: Object.keys(this.stores).length === 0,
    };
  }

  render() {
    if (!this.state.isDataLoaded) {
      if (typeof this.props.loading === 'function') {
        return this.props.loading() || null;
      }
      return this.props.loading || null;
    }
    return this.props.children || null;
  }

  componentDidMount() {
    const storeEntries = Object.entries(this.stores);
    storeEntries.forEach(([ name, store ]) => {
      store.onReady((name, data) => {
        this.onStoreReady(name, data);
      });
    });
  }

  onStoreReady = async (name, data) => {
    if (!this.datas) {
      this.datas = {};
    }
    this.datas[name] = data;

    if (Object.keys(this.datas).length === Object.keys(this.stores).length) {
      if (typeof this.props.onAllReady === 'function') {
        const maybePromise = this.props.onAllReady(this.datas);
        if (maybePromise instanceof Promise) {
          await maybePromise;
        }
      }

      delete this.datas;
      this.setState({
        isDataLoaded: true,
      });
    }
  }
}

export const createQueueRunner = () => {
  const queue = [];
  let isRunning = false;

  const enqueueAndRun = (task) => {
    return new Promise((resolve, reject) => {
      queue.push({
        task,
        resolve,
        reject,
      });
      runQueue();
    });
  }

  const runQueue = async () => {
    if (isRunning) return;
    isRunning = true;

    while (queue.length > 0) {
      const { task, resolve, reject } = queue.shift();
      try {
        let retval = task();
        if (retval instanceof Promise) {
          retval = await retval;
        }
        resolve(retval);
      } catch (error) {
        reject(error);
      }
    }

    isRunning = false;
  }

  return enqueueAndRun;
};
