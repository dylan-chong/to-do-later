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

import {
  isTaskOverdue,
  newBlankTask,
  userTasks
} from '../services/TaskService';
import { matchesFilters } from '../services/SettingsService';

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

  editTask(task) {
    const { navigate } = this.props.navigation;

    const saveFunction = (newTask) => {
      userTasks.update(() => Object.assign(task, newTask));
    };

    const deleteFunction = () => {
      userTasks.update(tasks => tasks.splice(tasks.indexOf(task), 1))
    }

    navigate('UnifiedEditTask', { task, saveFunction, deleteFunction })
  }

  listItems() {
    return userTasks
      .all()
      .filter(matchesFilters)
      .map(task => ({
        task,
        onPress: (entry) => this.editTask(entry.item.task),
        onCompletionChange: (entry) => this.toggleChecked(entry.item.task),
      }))
  }

  toggleChecked(task) {
    userTasks.update(() => task.isCompleted = !task.isCompleted)

    this.setState({})
  }

  taskText(task) {
    let dueDateText = undefined
    let isOverdue = isTaskOverdue(task)

    if (task.dueDate) {
      dueDateText =
        ' (Due '
        + distanceInWordsToNow(task.dueDate, { addSuffix: true })
        + ')'
    }

    return (
      <View>
        <Text>{ task.title }</Text>
        <Text style={{ color: isOverdue ? 'red' : 'gray' }}>
          { dueDateText }
        </Text>
      </View>
    )
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
              userTasks.all().length === 0
              ?
              'You have no tasks yet!\n\n'
              + 'Go ahead and create one above!'
              :
              'All your tasks are hidden by filters.\n\n'
              + 'You can control these in the settings above.'
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
              <ListItem>
                <CheckBox
                  checked={ entry.item.task.isCompleted }
                  onPress={ () => entry.item.onCompletionChange(entry) }
                />
                <Body style={{ paddingLeft: 15 }}>
                  { this.taskText(entry.item.task) }
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
