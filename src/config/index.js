import moment from 'moment';

export default config = {
  urlAuth: 'http://staging.api.efishery.com',//'http://api.efishery.com', 'http://staging.api.efishery.com',
  features: {
    wifiHybrid: false,
  },

  urlTokens: 'https://bi-dash.efishery.com/api/public/card/3e42a636-f4ef-4717-a87f-71f87f0c3e40/query/json',
}

moment.updateLocale('en', config.locale);
