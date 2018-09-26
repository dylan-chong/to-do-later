import { createStackNavigator } from 'react-navigation';

import { CreateTaskScreen } from './screens/CreateTaskScreen';
import { EditTaskScreen } from './screens/EditTaskScreen';
import { LoginScreen } from './screens/LoginScreen';
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
    CreateTask: CreateTaskScreen,
    EditTask: EditTaskScreen,
    UnifiedEditTask: UnifiedEditTaskScreen,
  },
  { initialRouteName: 'Welcome' },
);
