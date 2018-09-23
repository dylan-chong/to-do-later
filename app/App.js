import { createStackNavigator } from 'react-navigation';

import { WelcomeScreen } from './screens/WelcomeScreen';
import { initialiseFirebase } from './FirebaseService';

initialiseFirebase();

export default createStackNavigator(
  {
    Welcome: WelcomeScreen,
  },
  { initialRouteName: 'Welcome' },
);
