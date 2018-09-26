import { Alert, StyleSheet } from 'react-native';
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
import React, { Component } from 'react';

type Props = { navigation: NavigationState };

export class UnifiedEditTaskScreen extends Component<Props> {
  static navigationOptions = { title: 'Task' };

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

    getParam('saveFunction')(this.state)

    goBack()
  }

  delete() {
    const { goBack, getParam } = this.props.navigation;

    const deleteAndGoBack = () => {
      getParam('deleteFunction')()
      goBack()
    }

    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel' },
        { text: 'OK', onPress: deleteAndGoBack },
      ],
    )
  }

  render() {
    const { getParam } = this.props.navigation;
    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Label>Title</Label>
              <Input placeholder="History Essay" value={ this.state.title } onChangeText={
                (value) => this.setState({ title: value })
              } />
            </Item>
            <Item style={ styles.container }>
              {
                getParam('deleteFunction')
                &&
                <Button onPress={ () => this.delete() } style={ styles.buttonContainer } danger>
                  <Text>Delete</Text>
                </Button>
              }
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
