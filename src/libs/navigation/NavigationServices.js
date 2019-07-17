import { NavigationActions } from 'react-navigation';

const config = {};

export function setNavigator(nav) {
  if (nav) {
    config.navigator = nav;
  }
}

export function navigate(routeName, params) {
  console.log(config.navigator);
  if (config.navigator && routeName) {
    console.log('kimak');
    let action = NavigationActions.navigate({ routeName, params });
    config.navigator.dispatch(action);
  }
}

export function goBack() {
  console.log('goblok');
  if (config.navigator) {
    console.log('goback');
    let action = NavigationActions.back({});
    config.navigator.dispatch(action);
  }
}