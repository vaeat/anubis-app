import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, Alert} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import Papers  from './app/views/Papers';
import NewEvaluation from './app/views/NewEvaluation';
import HomePage from './app/components/HomePage'
import EventsPage from './app/components/EventsPage'

class Home extends Component {
  render() {
    return(
        <View style={styles.container}>
          <HomePage navigation={this.props.navigation}/>
        </View>

      );
    }
  }


const App = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      title: "HomePage"
    }
  },
  Papers: {
    screen: Papers,
    navigationOptions: {
        title: "Papers"
      },
  },
  NewEvaluation: {
    screen: NewEvaluation,
    navigationOptions: {
      title: "NewEvaluation"
    }
  },
  EventsPage: { 
    screen: EventsPage, 
    navigationOptions:{ 
      title: "Events"
    }
  }
});

export default createAppContainer(App);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
