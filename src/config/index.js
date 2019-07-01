import moment from 'moment';

export default config = {
  urlAuth: 'http://api.efishery.com', // 'http://staging.api.efishery.com',
  urlSensor: 'http://172.16.0.1:2516', // 'http://192.168.12.1:2516'
  urlWsSensor: 'ws://172.16.0.1:2516/', // 'ws://192.168.12.1:8080/'
  mqtt: {
    qos: 0,
    url: 'tcp://mqttbroker.efishery.com:1883',
    username: 'efishery',
    password: 'efishery2018',
    clientId: 'SensorTools',
  },
  sensorTokenSuper: '12345678',

  features: {
    wifiHybrid: false,
  },

  urlTokens: 'https://bi-dash.efishery.com/api/public/card/3e42a636-f4ef-4717-a87f-71f87f0c3e40/query/json',
}

moment.updateLocale('en', config.locale);
