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
import { clone } from 'lodash';
import React, { Component } from 'react';

import { userSettings } from '../services/SettingsService';

type Props = { navigation: NavigationState };

export class SettingsScreen extends Component<Props> {
  static navigationOptions = { title: 'Settings' };

  state = clone(userSettings.all())

  updateSetting(newSettings) {
    this.setState(newSettings)
    userSettings.update((settings) => Object.assign(settings, newSettings))
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
