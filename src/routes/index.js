import { createStackNavigator, createAppContainer } from 'react-navigation';
// import * as rna from "react-native-offline";
// import { withNetworkConnectivity } from 'react-native-offline'

import Login from 'src/screens/Login';
import ListComplaints from 'src/screens/complaints/List';
import DetailComplaint from 'src/screens/complaints/Detail';
import AddComplaint from 'src/screens/complaints/Add';
import EditComplaint from 'src/screens/complaints/Edit';

// const RootNavigator = createStackNavigator(
const AppNavigator = createStackNavigator(
  {
    Login: Login,
    Complaints: ListComplaints,
    AddComplaint: AddComplaint,
    // DetailComplaint: DetailComplaint,
    // EditComplaint: EditComplaint
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      header: null,
    }
  }
);

// const AppNavigator = withNetworkConnectivity({
//   withRedux: true
// })(RootNavigator);
// const AppNavigator = withNetworkConnectivity(RootNavigator);

export default createAppContainer(AppNavigator);
