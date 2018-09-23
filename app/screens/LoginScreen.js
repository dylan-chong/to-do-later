import {
  Button,
  Container,
  Content,
  Form,
  Input,
  Item,
  Label,
  Text
} from 'native-base';
import { type NavigationState } from 'react-navigation';
import { StyleSheet } from 'react-native';
import React, { Component } from 'react';

import { login, signup } from '../FirebaseService';

type Props = { navigation: NavigationState };

export class LoginScreen extends Component<Props> {
  static navigationOptions = { title: 'Login' };

  state = {
    username: '',
    password: '',
  };

  login() {
    login(this.state.username, this.state.password)
      .then(() => {
        debugger
      })
      .catch(e => {
        alert(e);
      });
  }

  signup() {
    signup(this.state.username, this.state.password)
      .then(() => {
        debugger
      })
      .catch(e => {
        alert(e);
      });
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Label>Username</Label>
              <Input placeholder="Username" onChangeText={
                (text) => this.setState(state => ({ ...state, username: text }))
              } />
            </Item>
            <Item>
              <Label>Password</Label>
              <Input placeholder="Password" onChangeText={
                (text) => this.setState(state => ({ ...state, password: text }))
              } />
            </Item>
            <Item style={ styles.container }>
              <Button onPress={ () => this.signup() } style={ styles.buttonContainer }>
                <Text>Sign Up</Text>
              </Button>
              <Button onPress={ () => this.login() } style={ styles.buttonContainer }>
                <Text>Login</Text>
              </Button>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    margin: 10,
  }
});
