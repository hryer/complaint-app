import RN from 'react-native';
import RNWifi from 'react-native-android-wifi';

const BerwifiModule = RN.NativeModules.BerwifiModule;
BerwifiModule.initialize();

const Berwifi = {};

[
  'isWifiEnabled',
  'getScanResults',
  'getCurrentSsid',
  'openWifiSettings',
].forEach(name => {
  Berwifi[name] = (...args) => BerwifiModule[name](...args);
});

Berwifi.enable = async () => {
  const isEnabled = await Berwifi.isWifiEnabled();
  if (isEnabled) {
    return;
  }

  setTimeout(() => {
    BerwifiModule.enable();
  }, 500);

  return new Promise(resolve => {
    const subscription = RN.DeviceEventEmitter.addListener('WIFI_STATE_CHANGED_ACTION', params => {
      if (params.wifiState === 'WIFI_STATE_ENABLED') {
        RN.DeviceEventEmitter.removeSubscription(subscription);
        resolve();
      }
    });
  });
}

Berwifi.disable = async () => {
  const isEnabled = await Berwifi.isWifiEnabled();
  if (!isEnabled) {
    return;
  }

  setTimeout(() => {
    BerwifiModule.disable();
  }, 500);

  return new Promise(resolve => {
    const subscription = RN.DeviceEventEmitter.addListener('WIFI_STATE_CHANGED_ACTION', params => {
      if (params.wifiState === 'WIFI_STATE_DISABLED') {
        RN.DeviceEventEmitter.removeSubscription(subscription);
        resolve();
      }
    });
  });
}

Berwifi.startScan = async () => {
  const isEnabled = await Berwifi.isWifiEnabled();
  if (!isEnabled) {
    await Berwifi.enable();
  }

  setTimeout(() => {
    BerwifiModule.startScan();
  }, 500);

  return new Promise(resolve => {
    const subscription = RN.DeviceEventEmitter.addListener('SCAN_RESULTS_AVAILABLE_ACTION', () => {
      RN.DeviceEventEmitter.removeSubscription(subscription);
      resolve();
    });
  });
}

Berwifi.connect = async (...args) => {
  const isEnabled = await Berwifi.isWifiEnabled();
  if (!isEnabled) {
    await Berwifi.enable();
  }

  return BerwifiModule.connect(...args);
}

Berwifi.disconnect = async () => {
  const isEnabled = await Berwifi.isWifiEnabled();
  if (!isEnabled) {
    return;
  }

  setTimeout(() => {
    BerwifiModule.disconnect();
  }, 500);

  return new Promise(resolve => {
    const subscription = RN.DeviceEventEmitter.addListener('NETWORK_STATE_CHANGED_ACTION', params => {
      if (params.supplicantState === 'DISCONNECTED') {
        RN.DeviceEventEmitter.removeSubscription(subscription);
        resolve();
      }
    });
  });
}

Berwifi.forceWifiUsage = (useWifi=true) => {
  RNWifi.forceWifiUsage(useWifi);
  return new Promise(resolve => setTimeout(resolve, 1000));
}

export default Berwifi;
