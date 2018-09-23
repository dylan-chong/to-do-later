import { Container, Fab, Icon } from 'native-base';
import { type NavigationState } from 'react-navigation';
import React, { Component } from 'react';

type Props = { navigation: NavigationState };

export class TasksScreen extends Component<Props> {
  static navigationOptions = { title: 'Tasks' };

  createTask() {
    const { navigate } = this.props.navigation;
    navigate('CreateTask');
  }

  render() {
    return (
      <Container>
        <Fab 
          direction="left" 
          position="bottomRight" 
          onPress={ () => this.createTask() }>
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }
}
