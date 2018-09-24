import {
  Body,
  Button,
  Container,
  Icon,
  Left,
  ListItem,
  Text
} from 'native-base';
import { FlatList } from 'react-native';
import { type NavigationState } from 'react-navigation';
import React, { Component } from 'react';

import { userData } from '../services/UserService';

type Props = { navigation: NavigationState };

export class TasksScreen extends Component<Props> {
  static navigationOptions = { title: 'Tasks' };

  createTask() {
    const { navigate } = this.props.navigation;
    navigate('CreateTask', { onBack: () => this.setState({}) });
  }

  editTask(entry) {
    const { navigate } = this.props.navigation;
    navigate('EditTask', {
      task: entry.item,
      index: entry.index - 1,
    })
  }

  listItems() {
    const items = [
      { title: '...New Task...', onPress: () => this.createTask() }
    ]

    const tasks = userData.currentUser().tasks.map(task => ({
      ...task,
      onPress: (entry) => this.editTask(entry),
    }))

    return [ ...items, ...tasks ]
  }

  render() {
    return (
      <Container>
        <FlatList
          data={ () => this.listItems() }
          renderItem={ entry =>
              <ListItem itemDivider>
                <Left />
                <Body>
                  <Text>
                    { entry.item.title }
                  </Text>
                </Body>
                <Button transparent onPress={ entry.item.onPress }>
                  <Icon active name="arrow-forward" />
                </Button>
              </ListItem>
          }
        />
      </Container>
    );
  }
}
