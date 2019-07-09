/*Papers.js*/

import React, {Component} from "react";

import {
  View,
  ScrollView,
  FlatList, 
  Alert, 
  StyleSheet
} from 'react-native';

import {
  Card,
  Icon,
  Text,
  ThemeProvider
} from "react-native-elements";


import AsyncStorage from '@react-native-community/async-storage';
import { Container, Tab, TabHeading, Tabs} from "native-base";

import PageHeader from "../components/PageHeader";
import MainHeader from "Anubis/app/components/MainHeader.js";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class Papers extends Component {
  static navigationOptions = {
    header: null,

  };


  constructor(props) {
    super(props);
    this.state = {
      "PapersList": []
     };
   }

   componentDidMount() {
      this.getPapersList(); 
  }



async getPapersList() {

const token = await AsyncStorage.getItem("token");
console.log('je rentre dans getpaperslist'); 
return fetch('http://159.65.104.138/api/papers/', {
method: 'GET',
})
//.then((response) => response.json())
.then(response => { return response.json();})
.then(data => {console.log('data.events', data.papers); this.setState({"PapersList" : data.papers});})
.catch((error) => {
console.error('error', error);
});
}


  displayDetailForPaper = (item) => {
    this.props.navigation.navigate("NewEvaluation", {item})
  }
  
  goToTop = () => {
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
 }

  render() {
   return (
     <Container> 


 
               <FlatList
               ref={(c) => {this.flatListRef = c}}
        data={this.state.PapersList}
        keyExtractor={(item, index) => item.title.toString()}
        renderItem={({item}) => 
                                  <Card>
                                    <TouchableOpacity
                                    onPress={() => this.displayDetailForPaper(item)}>
                                    <Text
                                      style={{marginBottom: 10}}
                                    >
                                      {item.title.toString()}
                                    </Text>
                                    <Text
                                      style={{marginBottom: 10}}
                                      //onPress={() => this.displayDetailForPaper(item.title.toString())}  
                                    >
                                      {item.cateName}
                                    </Text>
                                    <Text
                                      style={{marginBottom: 10}}
                                     // onPress={() => this.displayDetailForPaper(item.title.toString())}
                                    >
                                      {item.time.toString()}
                                    </Text>
                                    </TouchableOpacity>
                                   
                                  </Card>

                                }
      /> 
  <View style={styles.buttonView}>
  <TouchableOpacity onPress={this.goToTop} style={styles.goUpTouchable}>
          <Text style={styles.goUpIcon}>↑</Text>
</TouchableOpacity>
      
  </View>

     </Container>

    );
 }
}

const styles = StyleSheet.create({ 
  buttonView: {
    position: "absolute",
    right: 0,
    bottom: 0
  }, 
  goUpTouchable: { 
    width: 46, 
    height: 46, 
    alignItems: 'center', 
    justifyContent: 'center', 
    right: 20, 
    bottom: 20, 
    backgroundColor: '#6013b2', 
    borderRadius: 30, 
  flexDirection: 'row',
  
    }, 
    goUpIcon: { 
      fontSize: 30, 
      color: 'white' 
    }
});