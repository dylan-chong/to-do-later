import { Container, Button, Text } from 'native-base';
import { type NavigationState } from 'react-navigation';
import { StyleSheet } from 'react-native';
import React, { Component } from 'react';

type Props = { navigation: NavigationState };

export class WelcomeScreen extends Component<Props> {
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
