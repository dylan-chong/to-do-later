import {
  Body,
  Button,
  CheckBox,
  Container,
  Icon,
  ListItem,
  Right,
  Text
} from 'native-base';
import { FlatList } from 'react-native';
import { type NavigationState } from 'react-navigation';
import { distanceInWordsToNow } from 'date-fns';
import React, { Component } from 'react';

import { newBlankTask, userTasks } from '../services/TaskService';

type Props = { navigation: NavigationState };

export class TasksScreen extends Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: 'Tasks',
    headerRight: (
      <Button transparent
        style={{ paddingTop: 18 }}
        onPress={ navigation.getParam('createTaskFunction') }>
        <Icon active name="add" />
      </Button>
    ),
  })

  willFocus = this.props.navigation.addListener(
    'willFocus',
    () => this.forceUpdate(),
  )

  componentDidMount() {
    this.props.navigation.setParams({ createTaskFunction: this.createTask.bind(this) });
  }

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

    const saveFunction = (task) => {
      userTasks.update(tasks => tasks[entry.index] = task);
    };

    const deleteFunction = () => {
      userTasks.update(tasks => tasks.splice(entry.index, 1))
    }

    navigate('UnifiedEditTask', {
      task: entry.item.task,
      saveFunction,
      deleteFunction,
    })
  }

  listItems() {
    return userTasks.all().map(task => ({
      task,
      onPress: (entry) => this.editTask(entry),
      onCompletionChange: (entry) => this.toggleChecked(entry),
    }))
  }

  toggleChecked({ index }) {
    userTasks.update(tasks => {
      const task = tasks[index]
      task.isCompleted = !task.isCompleted;
    })

    this.setState({})
  }

  render() {
    return (
      <Container>
        <FlatList
          data={ this.listItems() }
          keyExtractor={ (item, index) => index.toString() }
          renderItem={ entry =>
              <ListItem itemDivider>
                <CheckBox
                  checked={ entry.item.task.isCompleted }
                  onPress={ () => entry.item.onCompletionChange(entry) }
                />
                <Body>
                  <Text>
                    {
                      entry.item.task.title + (
                        entry.item.task.dueDate
                        ? ' (Due '
                          + distanceInWordsToNow(entry.item.task.dueDate, { addSuffix: true })
                          + ')'
                        : ''
                      )
                    }
                  </Text>
                </Body>
                <Right>
                  <Button transparent onPress={ () => entry.item.onPress(entry) }>
                    <Icon active name="arrow-forward" />
                  </Button>
                </Right>
              </ListItem>
          }
        />
      </Container>
    );
  }
}
