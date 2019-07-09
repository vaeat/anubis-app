/*EditingView.js*/
import React, { Component } from "react";
import { Alert, Image, Platform, ScrollView, View, Picker, Dimensions } from "react-native";
import { Button, Container, Card, CardItem, Left, Tab, Icon, TabHeading, Tabs, Text} from "native-base";

import PageHeader from "Anubis/app/components/PageHeader.js";
import TextView from "Anubis/app/views/TextView.js"
import EditCardView from "Anubis/app/views/EditCardView";
//import { Card } from "react-native-elements";

export default class EditingView extends Component {
  static navigationOptions = {
    header: null 
  };

  constructor(props) {
    super(props);
    this.state = {
      locked:this.props.locked, 
      presentator: '', 
      width: Dimensions.get('window').width,
      //changeLocked: this.props.changeLocked
    };
/*     Dimensions.addEventListener('change', (e) => {
      this.setState(e.window);
    }); */
  }

  updatePresentator = (presentator) => {
    this.setState({ presentator: presentator })
 }

  render() {
    return (
      <Container>
        <ScrollView> 
          <Card>
          <CardItem style={{marginLeft:-10}}>
            <Left>
            <Text>Apresentador</Text>
            </Left> 
          </CardItem>

           <Picker style={{marginLeft:10, marginRight:5}} selectedValue = {this.state.presentator} 
                onValueChange = {this.updatePresentator}
                itemStyle={{ backgroundColor: "white", color: "black", widht:'100%'}}>
               <Picker.Item label = "Steve" value = "steve" />
               <Picker.Item label = "Ellen" value = "ellen" />
        </Picker>      
          
          </Card>
        
          <EditCardView changeLocked={this.props.changeLocked.bind(this)}/>
         <View style={{flex:2, flexDirection:'row'}}>
         <Button style={{flex:1}}
          transparent
            onPress={() => {
                Alert.alert('You tapped the button!');
              }}
        >
            <Text>Validar</Text>
            <Icon type="MaterialIcons" name="done" />
          </Button>
          <Button style={{flex:1}}
          transparent
            onPress={() => {
                Alert.alert('You tapped the button!');
              }}
        >
            <Text>Cancelar</Text>
            <Icon type="MaterialIcons" name="cancel" />
          </Button>
         </View>
         
        </ScrollView>

      </Container>
    );
  }

}
