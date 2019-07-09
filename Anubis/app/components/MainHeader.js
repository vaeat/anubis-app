/*MainHeader.js*/

import React, { Component } from "react";

import {
  Image,
  Alert,
} from "react-native";

import {
  Body,
  Button,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title,
} from "native-base";

import {DrawerAction} from 'react-navigation'

export default class MainHeader extends Component {


  render() {
    return (
      <Header hasTabs androidStatusBarColor="#6013b2" style={{ backgroundColor: "#6013b2"}}>
         <Left>
         <Button
            transparent
            onPress={() => {
              Alert.alert('You tapped the button!');
            }}
        >
            <Icon type="MaterialIcons" name="account-circle" />
          </Button>
        </Left> 
        <Body>
          <Title>Events</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => this.props.navigation.navigate("HomePage")}
          >
            <Icon type="MaterialIcons" name="home" />
          </Button>
        </Right>
      </Header>
    );
  }

}
