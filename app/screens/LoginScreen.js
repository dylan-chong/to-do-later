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
import Spinner from 'react-native-loading-spinner-overlay';

import { login, signup } from '../services/UserService';

type Props = { navigation: NavigationState };

export class LoginScreen extends Component<Props> {
  static navigationOptions = { title: 'Login' };

  state = {
    username: '',
    password: '',
  };

  login() {
    this.authenticate(login)
  }

  signup() {
    this.authenticate(signup)
  }

  authenticate(fn) {
    this.setState({ loading: true });
    fn(this.state.username, this.state.password)
      .then(() => {
        const { navigate } = this.props.navigation;
        navigate('Tasks');
      })
      .catch(e => {
        alert(e);
      })
      .finally(() => {
        this.setState({ loading: false });
      })
  }

  render() {
    return (
      <Container>
        <Spinner visible={this.state.loading} />
        <Content>
          <Form>
            <Item>
              <Label>Username</Label>
              <Input placeholder="Username" onChangeText={
                (username) => this.setState({ username })
              } />
            </Item>
            <Item>
              <Label>Password</Label>
              <Input placeholder="Password" onChangeText={
                (password) => this.setState({ password })
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
