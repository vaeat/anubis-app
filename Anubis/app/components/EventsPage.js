/*EventsPage.js*/
import React, { Component } from "react";
import { Image, Platform, ScrollView, View } from "react-native";
import { Container, Tab, TabHeading, Tabs, Text} from "native-base";

import PageHeader from "Anubis/app/components/PageHeader.js";
import Papers from "Anubis/app/views/Papers.js";
//import Home from "../components/Home";

export default class EventsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      headerName:'Eventos',
      //paper: this.props.item
      //locked:this.props.locked, 
    };
    //this.changeLocked = this.changeLocked.bind(this);
  }

  static navigationOptions = {
    header: null
    
  };

  render() {
    return (
      <Container>
        <PageHeader navigation={this.props.navigation} name={this.state.headerName}/>

        <Tabs style={Platform.OS === 'android' ? { overflow: 'hidden' } : null}>
          <Tab heading={ 
            <TabHeading style={{ backgroundColor: "#8f2fd8" }}>
              <Text>Avaliar</Text>
            </TabHeading>} >
             <Papers navigation={this.props.navigation} /> 
          </Tab>

          <Tab heading={
            <TabHeading style={{ backgroundColor: "#8f2fd8" }} >
              <Text>Avaliadas</Text>
            </TabHeading>}>
         {/*    <News navigation={this.props.navigation}/> */}
          </Tab>
        </Tabs>

      </Container>
    );
  }

}
