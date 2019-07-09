/*EvaluationView.js*/
import React, { Component } from "react";
import { Alert, Image, Platform, ScrollView, View, Picker, Dimensions } from "react-native";
import { Button, Container, Card, CardItem, Left, Tab, Icon, TabHeading, Tabs, Text} from "native-base";

import EvaluateCardView from "Anubis/app/views/EvaluateCardView";
//import console = require("console");
//import { Card } from "react-native-elements";

export default class EvaluationView extends Component {
  static navigationOptions = {
    header: null
    
  };

  constructor(props) {
    super(props);
    this.state = {
      locked:this.props.locked, 
      presentator: '', 
      presentatorData: this.props.navigation.state.params.item.autores.split(','),
      criterias: ['Originalidade e caráter inovador', 
                  'Consistência e rigor na abordagem teórico-metodológica', 
                  'Clareza dos resultados alcançados', 
                  'Relevância para a área', 
                  'Qualidade visual da apresentação/pôster', 
                  'Domínio do assunto'],
      evaluation: ['', '', '', '', '', '']
    };
  }

  componentDidUpdate () {
    console.log('updated?', this.state.presentator)
  }

  updatePresentator = (selection) => {
    console.log('state view', this.state)
    this.setState({ presentator: selection })
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
                onValueChange = { (value)  => {this.updatePresentator(value)}}
                itemStyle={{ backgroundColor: "white", color: "black", widht:'100%'}}>
                {this.state.presentatorData.map((i) => {
               return <Picker.Item key={i} value={i} label={i} />
                })}
        </Picker>      
          
          </Card>
        
        {this.state.criterias.map((question, questionIndex) => { 
            return <EvaluateCardView changeLocked={this.props.changeLocked.bind(this)}
                    question={question}
                    criteria={this.state.criterias[questionIndex]}
                    evaluation={this.state.evaluation[questionIndex]}/>
        })}
    

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
