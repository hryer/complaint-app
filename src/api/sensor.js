import RN from 'react-native';
import Berwifi from 'libs/Berwifi';
import config from 'src/config';

const RNProgressDialog = RN.NativeModules.RNProgressDialog;

const createSensorSsid = (sensorId) => {
  return `sensor_${sensorId}`;
}

const isConnectedToSensor = async (sensorId) => {
  const sensorSsid = createSensorSsid(sensorId);
  const isEnabled = await Berwifi.isWifiEnabled();
  if (isEnabled) {
    const currentSsid = await Berwifi.getCurrentSsid();
    return currentSsid === sensorSsid;
  } else {
    return false;
  }
}

const forceWifiUsage = (useWifi=true) => {
  return Berwifi.forceWifiUsage(useWifi);
}

const scanSensor = async (sensorId) => {
  const sensorSsid = createSensorSsid(sensorId);
  for (let count = 0; count < 2; count++) {
    await Berwifi.startScan();
    const wifiArray = await Berwifi.getScanResults();
    console.log(wifiArray);
    for (let spec of wifiArray) {
      if (spec.ssid === sensorSsid) {
        return true;
      }
    }
  }

  throw new Error(`Wifi sensor ${sensorId} tak terdeteksi`);
}

const connectToSensor = (sensorId, labelClose) => {
  labelClose = labelClose || 'Batalkan';
  switch (true) {
    case config.features.wifiHybrid:
      return connectToSensor_wifiHybrid(sensorId, labelClose);
    case config.features.wifiMenu:
      return connectToSensor_wifiMenu(sensorId, labelClose);
    default:
      return connectToSensor_auto(sensorId);
  }
}

const connectToSensor_auto = async (sensorId) => {
  const isConnected = await isConnectedToSensor(sensorId);
  if (isConnected) {
    return true;
  }

  RNProgressDialog.show(`Connecting to sensor ${sensorId}`);
  await scanSensor(sensorId);

  return new Promise(async (resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Gagal konek ke sensor ${sensorId}`));
    }, 10*1000);

    let error;
    try {
      const sensorSsid = createSensorSsid(sensorId);
      await Berwifi.connect(sensorSsid);
    } catch (err) {
      error = err;
    }

    clearTimeout(timer);
    if (error) {
      reject(error);
    } else {
      resolve(true);
    }
  });
}

const connectToSensor_wifiMenu = async (sensorId, labelClose) => {
  labelClose = labelClose || 'Batalkan';

  var isConnected = await isConnectedToSensor(sensorId);
  if (isConnected) {
    return true;
  }

  RNProgressDialog.show(`Connecting to sensor ${sensorId}`);
  await Berwifi.enable();

  return new Promise(async (resolve, reject) => {
    const checkConnection = async () => {
      try {
        var isConnected = await isConnectedToSensor(sensorId);
        if (isConnected) {
          clearTimeout(timer);
          resolve();
        } else {
          timer = setTimeout(checkConnection, 1000);
        }
      } catch (err) {
        clearTimeout(timer);
        reject(err);
      }
    }

    let timer = setTimeout(checkConnection, 1000);

    const sensorSsid = createSensorSsid(sensorId);
    const message = `Pilih wifi ${sensorSsid}`;

    RN.Alert.alert(
      'Alert',
      message,
      [
        {
          text: 'Batalkan',
          style: 'cancel',
          onPress: () => {
            clearTimeout(timer);
            Promise.resolve().then(() => {
              reject(new Error(`Wifi ${sensorSsid} tak dipilih`));
            });
          },
        },
      ],
    )

    await Berwifi.openWifiSettings(message);
  });
}

const connectToSensor_wifiHybrid = async (sensorId, labelClose) => {
  labelClose = labelClose || 'Batalkan';
  try {
    await connectToSensor_auto(sensorId);
  } catch (err) {
    return connectToSensor_wifiMenu(sensorId, labelClose);
  }
}

const httpRequest = async (sensorId, method, endpoint, headers, payload) => {
  const isConnected = await isConnectedToSensor(sensorId);
  if (!isConnected) {
    throw new Error(`Tidak konek ke sensor ${sensorId}`);
  }

  const options = {
    method,
    headers,
  };
  if (payload) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(payload);
  }

  const res = await fetch(`${config.urlSensor}${endpoint}`, options);
  if (!res.ok) {
    throw new Error(`Error HTTP ${res.status}`);
  }

  return res.json();
}

const getInfo = (sensorId, Token) => {
  return httpRequest(sensorId, 'GET', '/info', { Token });
}

const restart = (sensorId, Token) => {
  return httpRequest(sensorId, 'POST', '/restart', { Token }, {});
}

const setTime = (sensorId, Token, time) => {
  const payload = {
    time: time || Math.round((new Date()).getTime() / 1000),
  }
  return httpRequest(sensorId, 'POST', '/time', { Token }, payload);
}

const setFeeder = (sensorId, Token, feederSsid, feederToken) => {
  const payload = {
    ssid: feederSsid,
    password: '',
    token: feederToken,
  }
  return httpRequest(sensorId, 'POST', '/feeder', { Token }, payload);
}

const setConfig = (sensorId, Token, data) => {
  const payload = data;
  return httpRequest(sensorId, 'POST', '/config', { Token }, payload);
}

const startLabeling = (sensorId, Token) => {
  const payload = {
    command: 1,
    time: Math.round((new Date()).getTime()/1000),
  }
  return httpRequest(sensorId, 'POST', '/labeling', { Token }, payload);
}

const stopLabeling = (sensorId, Token) => {
  const payload = {
    command: 0,
  }
  return httpRequest(sensorId, 'POST', '/labeling', { Token }, payload);
}

const clearSDCard = (sensorId, Token) => {
  const payload = {
    command: 'clear',
  }
  return httpRequest(sensorId, 'POST', '/sdcard', { Token }, payload);
}

export default {
  createSensorSsid,
  isConnectedToSensor,
  forceWifiUsage,
  connectToSensor,
  scanSensor,
  getInfo,
  restart,
  setTime,
  setFeeder,
  setConfig,
  startLabeling,
  stopLabeling,
  clearSDCard,
}
