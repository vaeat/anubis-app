// Navigation/Navigation.js
import React from 'react-native'; 

import { createStackNavigator, createAppContainer } from 'react-navigation'
import Papers  from '../views/Papers'
import NewEvaluation from '../views/NewEvaluation'


const StackNavigator = createStackNavigator({
  Papers: { 
    screen: Papers,
    navigationOptions: {
      title: 'Papers'
    }
  }, 
  NewEvaluation: { 
    screen: NewEvaluation,
    navigationOptions: {
      title: 'New Evaluation'
    }
  }, 
})


export default createAppContainer(StackNavigator)
