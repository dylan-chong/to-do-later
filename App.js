import firebase from 'firebase/app';
import 'firebase/database';

import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator, type NavigationState } from 'react-navigation';
import React, { Component } from 'react';

type Props = { navigation: NavigationState };

const firebaseConfig = {
  apiKey: 'AIzaSyBO-WRCaI8AgCHfIE5WDmkpP3-uYW6zPUg',
  authDomain: 'to-do-later.firebaseapp.com',
  databaseURL: 'https://to-do-later.firebaseio.com',
  projectId: 'to-do-later',
  storageBucket: 'to-do-later.appspot.com',
  messagingSenderId: '844883333608'
};
firebase.initializeApp(firebaseConfig);

class WelcomeScreen extends Component<Props> {
  static navigationOptions = { title: 'Home' };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to To Do Later!</Text>
        <Button
          title="Let's get you organised"
          onPress={ () => this.start() }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default createStackNavigator(
  {
    Welcome: WelcomeScreen,
  },
  { initialRouteName: 'Welcome' },
);
