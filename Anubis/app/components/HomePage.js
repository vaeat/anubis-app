/*HomePage.js*/

import React, {Component} from "react";

import {
  View,
  ScrollView,
  FlatList, 
  Alert
} from 'react-native';

import {
  Card,
  Icon,
  Text,
  ThemeProvider
} from "react-native-elements";

import { Container, Tab, TabHeading, Tabs} from "native-base";


import AsyncStorage from '@react-native-community/async-storage';

import EventsPage from './EventsPage'

import MainHeader from "Anubis/app/components/MainHeader.js";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class HomePage extends Component {
    static navigationOptions = {
        header: null,
      };

      constructor(props) {
        super(props);
        this.state = {
          "EventsList": []
         };
       }

       componentDidMount() {
          this.getEventsList(); 
      }
    
  

async getEventsList() {
  
  const token = await AsyncStorage.getItem("token");
  console.log('je rentre dans geteventlist'); 
  return fetch('http://159.65.104.138/api/events/', {
    method: 'GET',
  })
  //.then((response) => response.json())
  .then(response => { return response.json();})
  .then(data => {console.log('data.events', data.events); this.setState({"EventsList" : data.events})})
  .catch((error) => {
    console.error('error', error);
  });

}

  render() {
   return (
    <Container>
    <MainHeader navigation={this.props.navigation}/>

       <FlatList
        data={this.state.EventsList}
        keyExtractor={(item) => item.description.toString()}
        renderItem={({item}) => 
                                  <Card>
                                    <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate("EventsPage", {item})} 
                                    > 
                                    <Text
                                      style={{marginBottom: 10}}
                                      //onPress={() => this.props.navigation.navigate("Question", {item})}
                                    >
                                      {item.description.toString()}
                                    </Text>
                                    <Text
                                      style={{marginBottom: 10}}
                                      //onPress={() => this.props.navigation.navigate("Question", {item})}   
                                    >
                                      {item.name.toString()}
                                    </Text>
                                    </TouchableOpacity>
                                  
                                  </Card>

                                }
      />
      
     </Container>
    );
 }
}
