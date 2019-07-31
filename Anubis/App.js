import React, { Component } from 'react';
import {Dimensions } from 'react-native';


import { createStackNavigator, createDrawerNavigator, createAppContainer, createSwitchNavigator, DrawerNavigator } from 'react-navigation';

import Papers from './app/views/Papers';
import NewEvaluation from './app/views/NewEvaluation';
import HomePage from './app/components/HomePage';
import EventsPage from './app/components/EventsPage';
import NewEdit from './app/views/NewEdit';
import Login from './app/views/Login';
import drawerContentComponents from './app/components/drawerContentComponents';


const WIDTH = Dimensions.get("window").width;

class App extends Component {
  render() {
    return (
      <rootNav />
    );
  }
}


const AppStackNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
    }
  },
  Papers: {
    screen: Papers,
    navigationOptions: {
      // title: "Papers", 
      header: null
    },
  },
  NewEvaluation: {
    screen: NewEvaluation,
    navigationOptions: {
      header: null
    }
  },
  NewEdit: {
    screen: NewEdit,
    navigationOptions: {
      //  title: "NewEdit", 
    }
  },
  EventsPage: {
    screen: EventsPage,
    navigationOptions: {
      //  title: "Events",
    }
  },
});

const homePageStack = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {

      /*  header: props => <MainHeader {...props} style={{flex:1}}/> */
    }
  },
})


const AppDrawerNavigator = createDrawerNavigator(
  {
    HomePage: {
      screen: HomePage,
      navigationOptions: {
      }
    },
    Papers: {
      screen: Papers,
      navigationOptions: {
        // title: "Papers", 
        header: null
      },
    },
    NewEvaluation: {
      screen: NewEvaluation,
      navigationOptions: {
        header: null
      }
    },
    NewEdit: {
      screen: NewEdit,
      navigationOptions: { 
      }
    },
    EventsPage: {
      screen: EventsPage,
      navigationOptions: {
      }
    },
  },
  {
    contentComponent: drawerContentComponents,
  },
)



const rootNav = createSwitchNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      // title: "Login", 
      header: null
    }
  },
  AppDrawerNavigator: {
    screen: AppDrawerNavigator,
    navigationOptions: {
      header: null
    }
  },
/*   AppStackNavigator: {
    screen: AppStackNavigator,
    navigationOptions: {
      header: null
    }
  }, */
});

export default createAppContainer(rootNav);


