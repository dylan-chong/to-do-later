import { Alert, StyleSheet, TextInput } from 'react-native';
import {
  Button,
  Container,
  Content,
  Form,
  Input,
  Item,
  Label,
  Separator,
  Text,
  View
} from 'native-base';
import { type NavigationState } from 'react-navigation';
import { distanceInWordsToNow, format } from 'date-fns';
import DateTimePicker from 'react-native-modal-datetime-picker';
import React, { Component } from 'react';

import {
  dueDateFrom,
  partialTaskDataFromNaturalText
} from '../services/TaskService';

type Props = { navigation: NavigationState };

export class UnifiedEditTaskScreen extends Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: 'Task',
    headerRight: (
      <View style={{ flexDirection: 'row' }}>
        <Button transparent
          onPress={ navigation.getParam('localSaveFunction') }>
          <Text>Save</Text>
        </Button>
      </View>
    ),
  })

  state = {};

  componentDidMount() {
    const { getParam, setParams } = this.props.navigation;
    this.setState(getParam('task'))
    setParams({ localSaveFunction: () => this.save() })
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
        { text: 'Delete', onPress: deleteAndGoBack },
      ],
    )
  }

  onDateSelected(date) {
    this.setState({ dueDate: dueDateFrom(date), isSelectingDate: false })
  }

  onSmartEntryChanged(text) {
    this.setState(partialTaskDataFromNaturalText(text))
  }

  render() {
    const { getParam } = this.props.navigation;
    const { dueDate, isSelectingDate } = this.state;

    return (
      <Container>
        <Content>
          <Form>

            {
              getParam('hasSmartEntry')
                &&
                <Item stackedLabel>
                  <Label>Smart Entry</Label>
                  <Input placeholder="History Assignment due Tuesday 3pm" onChangeText={
                    (value) => this.onSmartEntryChanged(value)
                  } />
                </Item>
            }

            { getParam('hasSmartEntry') && <Separator/> }

            <Item stackedLabel>
              <Label>Title</Label>
              <Input placeholder="History Essay" value={ this.state.title } onChangeText={
                (value) => this.setState({ title: value })
              } />
            </Item>

            <Item stackedLabel>
              <Label>Due Date</Label>
              <Button transparent onPress={ () => this.setState({ isSelectingDate: true }) }>
                <Text uppercase={false}>{
                  dueDate
                    ? format(dueDate, 'ddd D MMM YYYY, hh:mm a')
                      + ' (' + distanceInWordsToNow(dueDate, { addSuffix: true }) + ')'
                    : 'None'
                }</Text>
              </Button>
              {
                dueDate
                &&
                <Button transparent onPress={ () => this.setState({ dueDate: null }) }>
                  <Text uppercase={false}>Remove due date</Text>
                </Button>
              }
            </Item>

            <Separator/>

            <Item stackedLabel>
              <Label>Notes</Label>
              <TextInput 
                placeholder="This assignment is really important!" 
                multiline={true}
                value={ this.state.description } 
                onChangeText={
                  (value) => this.setState({ description: value })
                } />
            </Item>

            {
              getParam('deleteFunction')
                &&
                <View>
                  <Separator/>
                  <Item style={ styles.container }>
                    <Button onPress={ () => this.delete() } style={ styles.buttonContainer } danger>
                      <Text>Delete</Text>
                    </Button>
                  </Item>
                </View>
            }

          </Form>
        </Content>
        <DateTimePicker
          date={ dueDate ? new Date(dueDate) : new Date() }
          mode="datetime"
          isVisible={ isSelectingDate }
          onConfirm={ (date) => this.onDateSelected(date) }
          onCancel={ () => this.setState({ isSelectingDate: false }) }
        />
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
