import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from 'src/screens/Login';
import ListComplaints from 'src/screens/complaints/List';
import DetailComplaint from 'src/screens/complaints/Detail';
import AddComplaint from 'src/screens/complaints/Add';

const AppNavigator = createStackNavigator(
  {
    Login: Login,
    Complaints: ListComplaints,
    AddComplaint: AddComplaint,
    DetailComplaint: DetailComplaint,
    // EditComplaint: EditComplaint
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      header: null,
    }
  }
);

export default createAppContainer(AppNavigator);
