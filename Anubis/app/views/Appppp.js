import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, Alert} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import Papers  from './app/views/Papers';
import NewEvaluation from './app/views/NewEvaluation';

class Home extends Component {
  render() {
    return(
        <View style={styles.container}>
         <Text>Home Page</Text>
        </View>
      );
    }
  }


const App = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Home"
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
});

export default createAppContainer(App);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
