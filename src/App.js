import firebase from 'firebase/app';
import 'firebase/database';

import { StyleSheet } from 'react-native';
import { Container, Button, Text } from 'native-base';
import { createStackNavigator, type NavigationState } from 'react-navigation';
import React, { Component } from 'react';

type Props = { navigation: NavigationState };

// TODO move into a new file
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
  static navigationOptions = { title: 'Welcome' };

  start() {
    const { navigate } = this.props.navigation;
    navigate('Login');
    // TODO NEXT login page **************************************************
    // TODO after refactor into multiple files
  }

  render() {
    return (
      <Container style={styles.container}>
        <Text style={styles.welcome}>Welcome to To Do Later!</Text>
        <Button style={styles.welcome} onPress={ () => this.start() }>
          <Text>
            { "Let's get you organised!" }
          </Text>
        </Button>
      </Container>
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
    alignSelf: 'center',
  },
});

export default createStackNavigator(
  {
    Welcome: WelcomeScreen,
  },
  { initialRouteName: 'Welcome' },
);
