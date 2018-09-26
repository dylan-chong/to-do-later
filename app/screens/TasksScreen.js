import { Body, Button, Container, Icon, ListItem, Text } from 'native-base';
import { FlatList } from 'react-native';
import { type NavigationState } from 'react-navigation';
import { omit } from 'lodash';
import React, { Component } from 'react';

import { newBlankTask, userTasks } from '../services/TaskService';

type Props = { navigation: NavigationState };

export class TasksScreen extends Component<Props> {
  static navigationOptions = { title: 'Tasks' };

  willFocus = this.props.navigation.addListener(
    'willFocus',
    () => this.forceUpdate(),
  )

  createTask() {
    const { navigate } = this.props.navigation;

    const saveFunction = (task) => {
      userTasks.update(tasks => tasks.push(task));
    };

    navigate('UnifiedEditTask', {
      task: newBlankTask(),
      saveFunction,
    })
  }

  editTask(entry) {
    const { navigate } = this.props.navigation;
    const taskIndex = entry.index - 1;

    const saveFunction = (task) => {
      userTasks.update(tasks => tasks[taskIndex] = task);
    };

    const deleteFunction = () => {
      userTasks.update(tasks => tasks.splice(taskIndex, 1))
    }

    navigate('UnifiedEditTask', {
      task: omit(entry.item, 'onPress'),
      saveFunction,
      deleteFunction,
    })
  }

  listItems() {
    const items = [
      { title: 'New Task...', onPress: () => this.createTask() }
    ]

    const tasks = userTasks.all().map(task => ({
      ...task,
      onPress: (entry) => this.editTask(entry),
    }))

    return [ ...items, ...tasks ]
  }

  render() {
    return (
      <Container>
        <FlatList
          data={ this.listItems() }
          keyExtractor={ (item, index) => index.toString() }
          renderItem={ entry =>
              <ListItem itemDivider>
                <Body>
                  <Text>
                    { entry.item.title }
                  </Text>
                </Body>
                <Button transparent onPress={ () => entry.item.onPress(entry) }>
                  <Icon active name="arrow-forward" />
                </Button>
              </ListItem>
          }
        />
      </Container>
    );
  }
}
