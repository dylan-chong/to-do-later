import {
  Body,
  Button,
  Container,
  Fab,
  Icon,
  Left,
  ListItem,
  Right,
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

  render() {
    // TODO fix floating action button stupidly not working working at the flat list
    return (
      <Container>
        {
          userData.currentUser().tasks.length === 0
            ?
            <Button onPress={ () => this.createTask() } style={{ margin: 10 }}>
              <Text>
                Create First Task
              </Text>
            </Button>
            :
            <FlatList
              data={ userData.currentUser().tasks }
              renderItem={ entry =>
                  <ListItem itemDivider>
                    <Left />
                    <Body>
                      <Text>
                        { entry.item.title }
                      </Text>
                    </Body>
                    <Right>
                      <Icon active name="arrow-forward" />
                    </Right>
                  </ListItem>
              }
            />
        }
      </Container>
    );
  }

  // render() {
    // return (
      // <Container>
        // <Fab
          // direction="left"
          // position="bottomRight"
          // onPress={ () => this.createTask() }>
          // <Icon name="add" />
        // </Fab>
      // </Container>
    // );
  // }
}
