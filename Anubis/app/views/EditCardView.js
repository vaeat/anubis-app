/*EditCardView.js*/
import React, {Component} from 'react';
import {Platform, StyleSheet, View, StatusBar, Image, Switch} from 'react-native';
import Slider from '@react-native-community/slider';

import {
  Badge,
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Header,
  Icon,
  Left,
  Right,
  Tab,
  TabHeading,
  Tabs,
  Text,
  Title,
  Thumbnail
} from "native-base";
import { ScrollView } from 'react-native-gesture-handler';


export default class EditCardView extends Component {

   constructor(props) {
    super(props);
    this.state = {
      //locked: this.props.locked,
      thumbValue: this.props.grade*10,
      minValue: 0,
      maxValue: 100, 
      switchValue:false, 
      disabled: true, 
      criteria: this.props.criteria,
      index:this.props.questionIndex
    };
  }

onEndSlide(){ 
   console.log('props', this.props)
   this.props.changeLocked(false)
 
}

onSlideDone(){ 
  this.props.onUpdateGrade(this.state.index, this.state.thumbValue/10)
}

onStartSlide(){ 
  console.log('props', this.props)
  this.props.changeLocked(true)
  
}

toggleSwitch = (value) => {
  this.setState({switchValue: value}); 
  this.setState({disabled: !this.state.disabled})
}

  render() {

    return (
      <Card>
        <CardItem>
          <Left>
              <Text>Critério</Text>
          </Left>
          <Body style={{flex:3}}>
              <Text>{this.props.criteria}</Text>
          </Body>
        </CardItem>

        <CardItem>
          <Left>
              <Text style={{marginTop:-5}}>Nota</Text>
          </Left>
          <Body style={{flex:3}}>

<View style={{flexDirection:'row'}}>

       

          <View style={{marginLeft:15}}> 
            <Slider 
              style={{width:200, height: 50}}
              minimumValue={this.state.minValue}
              maximumValue={this.state.maxValue}
              value={this.state.thumbValue}
              step={1}
              disabled={this.state.disabled}
              minimumTrackTintColor="#000000"
              maximumTrackTintColor="#000000"
              onValueChange={val => this.setState({ thumbValue: val})}
              onTouchStart={this.onStartSlide.bind(this)}
              onTouchEnd={this.onEndSlide.bind(this)}
              onSlidingComplete={this.onSlideDone.bind(this)}
            />  
            <View style={styles.textCon}>
                    <Text style={styles.colorGrey}>{this.state.minValue}</Text>
                    <Text style={styles.colorGrey}>{this.state.maxValue/10}</Text>
                </View>
           </View>

          
           <View> 
           <Text style={{marginLeft:5, marginTop:15}} note>{this.state.thumbValue/10}/10</Text>
           </View>
        </View>    

          </Body>
          <Right style={{flex:2}}> 
            <View style={{flexDireciton: 'row'}}> 
           
            <View> 
            <Switch
          style={{marginTop:25}}
          onValueChange = {this.toggleSwitch}
          style={{ transform: [{ scaleX: 0.9 }, { scaleY: .9 }] }}
          value = {this.state.switchValue}/>
          <Text>{this.state.switchValue?'Validar':'Editar'}</Text>
            </View>
            
            </View>
          </Right>
        </CardItem>
      </Card>

    );
  }
}

const styles = StyleSheet.create({
  textCon: {
      marginTop: -15,
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
  colorGrey: {
      color: '#d3d3d3', 
      fontSize: 14
  },
});
