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

import { userData } from '../services/UserService';

type Props = { navigation: NavigationState };

export class CreateTaskScreen extends Component<Props> {
  static navigationOptions = { title: 'CreateTask' };

  state = {
    title: '',
  };

  create() {
    if (!this.state.title) {
      alert('Not a valid title');
      return;
    }

    userData.update(user => {
      user.tasks.push(this.state);
    });

    const { goBack } = this.props.navigation;
    goBack()
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Label>Title</Label>
              <Input placeholder="History Essay" onChangeText={
                (value) => this.setState({ title: value.trim() })
              } />
            </Item>
            <Item style={ styles.container }>
              <Button onPress={ () => this.create() } style={ styles.buttonContainer }>
                <Text>Create</Text>
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
