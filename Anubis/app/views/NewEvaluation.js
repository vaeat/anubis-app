/*NewEvaluation.js*/
import React, { Component } from "react";
import { Image, Platform, ScrollView, View, Button } from "react-native";
import { Container, Tab, TabHeading, Tabs, Text} from "native-base";


import PageHeader from "../components/PageHeader";
import TextView from "./TextView"
import EvaluationView from "./EvaluationView";


export default class NewEvaluation extends Component {
  static navigationOptions = {
    header: null
  };


  constructor(props) {
    super(props);
    this.state = {
      locked:false,
      //paper: this.props.item
      //locked:this.props.locked, 
    };
    //this.changeLocked = this.changeLocked.bind(this);
  }


   changeLocked = (bool) => { 
    this.setState({ locked : bool})
  }

  render() {
    return (
      <Container>
        <PageHeader navigation={this.props.navigation}/>

        <Tabs style={Platform.OS === 'android' ? { overflow: 'hidden' } : null} locked={this.state.locked}>
          <Tab heading={ <TabHeading style={{ backgroundColor: "#8f2fd8" }}><Text>Avaliação</Text></TabHeading>}>
            <EvaluationView changeLocked={this.changeLocked.bind(this)} locked={this.state.locked}  navigation={this.props.navigation} />
          </Tab>

          <Tab heading={ <TabHeading style={{ backgroundColor: "#8f2fd8" }}><Text>Abstrato</Text></TabHeading>}>
            <TextView navigation={this.props.navigation}/>
          </Tab>

        </Tabs>


      </Container>
    );
  }

}
