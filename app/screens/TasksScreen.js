import {
  Body,
  Button,
  CheckBox,
  Container,
  Icon,
  ListItem,
  Right,
  Text,
  View
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
      <View style={{ flexDirection: 'row' }}>
        <Button transparent
          onPress={ navigation.getParam('showSettingsFunction') }>
          <Icon active name="settings" />
        </Button>
        <Button transparent
          onPress={ navigation.getParam('createTaskFunction') }>
          <Icon active name="add" />
        </Button>
      </View>
    ),
  })

  willFocus = this.props.navigation.addListener(
    'willFocus',
    () => this.forceUpdate(),
  )

  componentDidMount() {
    this.props.navigation.setParams({
      createTaskFunction: this.createTask.bind(this),
      showSettingsFunction: this.showSettings.bind(this),
    });
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

  showSettings() {
    const { navigate } = this.props.navigation;
    navigate('Settings')
  }

  render() {
    if (this.listItems().length === 0) {
      return (
        <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ textAlign: 'center' }}>
            {
              'You have no tasks yet!\n\n'
              + 'Go ahead and create one above!'
            }
          </Text>
        </Container>
      )
    }

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
