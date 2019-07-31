/*MainHeader.js*/

import React, { Component } from "react";

import {
  Image,
  Alert,
  TouchableOpacity
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

import {DrawerActions} from 'react-navigation'

export default class MainHeader extends Component {
  toggleDrawer = () => {
    //this.props.navigation.navigate('DrawerToggle')
    console.log('pressed')
   this.props.navigation.dispatch(DrawerActions.toggleDrawer());
   // console.log(this.props.navigation.navigate('DrawerClose'))
  }

  render() {
    return (
      <Header hasTabs androidStatusBarColor="#6013b2" style={{ backgroundColor: "#6013b2"}}>
         <Left>
         <Button
            transparent
          //  onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
          onPress={this.toggleDrawer}
        >

<Icon type="MaterialIcons" name="account-circle" />

          
          </Button>
        </Left> 
        <Body>
          <Title>Eventos</Title>
        </Body>
        <Right>
          <Button
            transparent
           
          >

<TouchableOpacity  onPress={() => this.props.navigation.navigate("HomePage")}>
            <Icon type="MaterialIcons" name="home" />
            </TouchableOpacity> 
          </Button>
            
         
        </Right>
      </Header>
    );
  }

}


