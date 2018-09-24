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

// TODO NEXT remove duplication between the screen and the other screen

export class EditTaskScreen extends Component<Props> {
  static navigationOptions = { title: 'EditTask' };

  state = {};

  componentDidMount() {
    const { getParam } = this.props.navigation;
    this.setState(getParam('task'))
  }

  save() {
    if (!this.state.title) {
      alert('Not a valid title');
      return;
    }

    const { goBack, getParam } = this.props.navigation;

    userData.update(user => {
      const index = getParam('index');
      user.tasks[index] = this.state;
    });

    goBack()
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Label>Title</Label>
              <Input placeholder="History Essay" value={ this.state.title } onChangeText={
                (value) => this.setState({ title: value.trim() })
              } />
            </Item>
            <Item style={ styles.container }>
              <Button onPress={ () => this.save() } style={ styles.buttonContainer }>
                <Text>Done</Text>
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
