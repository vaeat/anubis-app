/*NewEdit.js*/
import React, { Component } from "react";
import { Image, Platform, ScrollView, View } from "react-native";
import { Container, Tab, TabHeading, Tabs, Text} from "native-base";


import PageHeader from "Anubis/app/components/PageHeader.js";
import TextView from "Anubis/app/views/TextView.js"
import EditingView from "Anubis/app/views/EditingView";

export default class NewEdit extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      locked:false,
    };
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
            <EditingView  changeLocked={this.changeLocked.bind(this)} locked={this.state.locked}  navigation={this.props.navigation} />
          </Tab>

          <Tab heading={ <TabHeading style={{ backgroundColor: "#8f2fd8" }}><Text>Texto</Text></TabHeading>}>
            <TextView navigation={this.props.navigation}/>
          </Tab>

        </Tabs>

      </Container>
    );
  }

}
