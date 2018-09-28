import { createStackNavigator } from 'react-navigation';

import { LoginScreen } from './screens/LoginScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { TasksScreen } from './screens/TasksScreen';
import { UnifiedEditTaskScreen } from './screens/UnifiedEditTaskScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { initialiseFirebase } from './services/FirebaseService';

initialiseFirebase();

export default createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Login: LoginScreen,
    Tasks: TasksScreen,
    UnifiedEditTask: UnifiedEditTaskScreen,
    Settings: SettingsScreen,
  },
  { initialRouteName: 'Welcome' },
);
