/*HomePage.js*/

import React, {Component} from "react";

import {
  ActivityIndicator,
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
          "EventsList": [], 
          PapersList: [],
      Evaluated: [],
      ToEvaluate: [],
      dataToEvaluate: [],
      dataEvaluated: [],
      isActivityVisible: true,      
         };

       }

       componentDidMount() {
        this.getPapersList();
          this.getEventsList(); 
      }
    
  

async getEventsList() {
  
  const token = await AsyncStorage.getItem("token");
  console.log('entering geteventlist'); 
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



async getPapersList() {

  const token = await AsyncStorage.getItem("token");
  console.log('entering getPapersList');
  console.log('activity indicator is visible');
  return fetch('http://159.65.104.138/api/papers/', {
    method: 'GET',
  })
    //.then((response) => response.json())
    .then(response => { return response.json(); })
    .then(data => {
      console.log('data.papers is being fetched');
      this.setState({ "PapersList": data.papers });
      console.log('data.papers fetched work done');
      console.log('separating list in half (for static purpose, to change when API is functionnal)')
      //This is only for practice purpose, to be removed when API is functionnal
      let Papers = this.state.PapersList;
      let halfWayThough = Math.floor(Papers.length / 2)
      this.setState({ ToEvaluate: Papers.slice(0, halfWayThough+8) })
      this.setState({ Evaluated: Papers.slice(halfWayThough+8, Papers.length) });
      this.setState({ dataToEvaluate: this.state.ToEvaluate })
      this.setState({ dataEvaluated: this.state.Evaluated })

  
      this.setState({ isActivityVisible: false}); // isTouchableVisible: true });
      console.log('activity is invisible and touchable is visible');
    })
    .catch((error) => {
      console.error('error', error);
    });
}




displayDetailForEvent = (item, PapersList, Evaluated, ToEvaluate, dataToEvaluate, dataEvaluated) => {
    this.props.navigation.navigate("EventsPage", {item, PapersList, Evaluated, ToEvaluate, dataToEvaluate, dataEvaluated})
}

  render() {
   return (
    <Container>
     <MainHeader navigation={this.props.navigation}/> 

      { !this.state.isActivityVisible &&
       <FlatList
       data={this.state.EventsList}
       keyExtractor={(item) => item.description.toString()}
       renderItem={({item}) => 
                                 <Card>
                                   <TouchableOpacity
                                  // onPress={() => this.props.navigation.navigate("EventsPage", {item, ToEvaluate, Evaluated})} 
                                     onPress={() => this.displayDetailForEvent(item, this.state.PapersList, this.state.Evaluated,  this.state.ToEvaluate, this.state.dataToEvaluate, this.state.dataEvaluated)}
                                  > 
                                   <Text
                                     style={{marginBottom: 10, fontWeight:'bold'}}
                                     //onPress={() => this.props.navigation.navigate("Question", {item})}
                                   >
                                     {item.description.toString()}
                                   </Text>
                                   <Text
                                     style={{marginBottom: 10, fontStyle:'italic'}}
                                     //onPress={() => this.props.navigation.navigate("Question", {item})}   
                                   >
                                     {item.name.toString()}
                                   </Text>
                                   </TouchableOpacity>
                                 
                                 </Card>

                               }
     />
      }
      

<View style={styles.loading}>
          <ActivityIndicator size="large" color="#6013b2" animating={this.state.isActivityVisible} />
          {this.state.isActivityVisible &&
          <View style={{alignItems:'center'}}>
               <Text>As apresentações a serem avaliadas estão carregando</Text>
               <Text>é normal que demore um pouco... </Text>
          </View> 
          }
        </View> 
      
     </Container>
    );
 }
}


const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});