import RN from 'react-native';
import config from 'src/config';

const MyQTT = RN.NativeModules.MyQTT;

const connect = () => {
  return MyQTT.connect(config.mqtt.url, config.mqtt.username, config.mqtt.password);
}

const disconnect = () => {
  return MyQTT.disconnect();
}

const publishString = (topic, data) => {
  return MyQTT.publishString(topic, data);
}

const publishBase64 = (topic, data) => {
  return MyQTT.publishBase64(topic, data);
}

export default {
  connect,
  disconnect,
  publishString,
  publishBase64,
}
