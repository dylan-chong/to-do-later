import {
  Body,
  Container,
  Content,
  ListItem,
  Right,
  Switch,
  Text
} from 'native-base';
import { type NavigationState } from 'react-navigation';
import React, { Component } from 'react';

type Props = { navigation: NavigationState };

export class SettingsScreen extends Component<Props> {
  static navigationOptions = { title: 'Settings' };

  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <Container>
        <Content>
          <ListItem icon>
            <Body>
              <Text>Show completed tasks</Text>
            </Body>
            <Right>
              <Switch value={false} />
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
