import { createStackNavigator, createAppContainer } from 'react-navigation';

import Login from 'src/screens/Login';

import ListComplaints from 'src/screens/complaints/List';
import DetailComplaints from 'src/screens/complaints/Detail';
import AddComplaints from 'src/screens/complaints/Add';
import EditComplaints from 'src/screens/complaints/Edit';

const AppNavigator = createStackNavigator(
  {
    Login: Login,
    Complaints: ListComplaints,
    // DetailComplaints: DetailComplaints,
    // AddComplaints: AddComplaints,
    // EditComplaints: EditComplaints
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      header: null,
    }
  }
);

export default createAppContainer(AppNavigator);
