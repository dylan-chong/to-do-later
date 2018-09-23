import { createStackNavigator } from 'react-navigation';

import { CreateTaskScreen } from './screens/CreateTaskScreen';
import { LoginScreen } from './screens/LoginScreen';
import { TasksScreen } from './screens/TasksScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { initialiseFirebase } from './FirebaseService';

initialiseFirebase();

export default createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Login: LoginScreen,
    Tasks: TasksScreen,
    CreateTask: CreateTaskScreen,
  },
  { initialRouteName: 'Welcome' },
);
