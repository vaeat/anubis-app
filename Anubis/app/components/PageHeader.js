/*PageHeader.js*/

import React, { Component } from "react";

import {
  Image,
  Alert,
  View,
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
import { TouchableHighlight } from "react-native-gesture-handler";


export default class PageHeader extends Component {


  render() {
    return (
      <Header hasTabs androidStatusBarColor="#6013b2" style={{ backgroundColor: "#6013b2"}}>
         <Left>
           <View style={{flexDirection:'row', justifyContent:'space-between'}}> 
           <Button
            transparent
            onPress={() => {
                Alert.alert('You tapped the button!');
              }}
        >
            <Icon type="MaterialIcons" name="account-circle" />
          </Button>
           </View>
        </Left> 

        <Body style={{flex: 2}}>

          <View style={{flexDirection:'row', justifyContent: 'space-between'}}> 
            
            <Button style={{justifyContent: 'flex-end'}}
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <View> 
                <Icon type="MaterialIcons" name="arrow-back" style={{color:"white" }}/>
              </View>
            </Button>
           
            <Button style={{flex:1, justifyContent: 'center'}}
              transparent
              onPress={() => {
                Alert.alert('You tapped the button!');
              }}
            >
              <View> 
                <Title>{this.props.name}</Title>
              </View>
            </Button>

          </View>

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
