/*TextView.js*/

import React, {Component} from "react";

import {
  View,
  ScrollView,
  Button,
  FlatList
} from 'react-native';

import {
  Card,
  Text,
  ThemeProvider

} from "react-native-elements";


export default class TextView extends Component {
  static navigationOptions = {
    header: null
  };

/*   constructor() {
    super();
    this.state = {
      locked: this.props.locked 
    };
  }
 */

  render() {
    const abstract = this.props.navigation.state.params.item.abstract; 
    const paper_title = this.props.navigation.state.params.item.title; 
   return (
     <ThemeProvider>

       <ScrollView>
       {/*  <Card title={this.props.navigation.state.params.item.title}> */}
        <Card title={paper_title}>
          <Text style={{marginBottom: 10}}>
            {abstract}
          </Text>
        </Card>

       </ScrollView>
     </ThemeProvider>

    );
 }
}
