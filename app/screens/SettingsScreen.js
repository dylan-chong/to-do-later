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

import { userData } from '../services/UserService';
import { clone } from 'lodash';

type Props = { navigation: NavigationState };

export class SettingsScreen extends Component<Props> {
  static navigationOptions = { title: 'Settings' };

  state = clone(userData.currentUser().settings)

  updateSetting(newSettings) {
    this.setState(newSettings)
    userData.update(({ settings }) => Object.assign(settings, newSettings))
  }

  render() {
    return (
      <Container>
        <Content>
          <ListItem icon>
            <Body>
              <Text>Show completed tasks</Text>
            </Body>
            <Right>
              <Switch
                value={ this.state.showCompletedTasks  }
                onValueChange={ (value) => this.updateSetting({
                  showCompletedTasks: value,
                }) } />
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
