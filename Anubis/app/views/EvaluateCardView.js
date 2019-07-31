/*EvaluateCardView.js*/
import React, {Component} from 'react';
import {Platform, StyleSheet, View, StatusBar, Image} from 'react-native';
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



export default class EvaluateCardView extends Component {

   constructor(props) {
    super(props);
    this.state = {
      locked:false, 
      thumbValue: 0,
      minValue: 0,
      maxValue: 100, 
      question: this.props.question,
      index:this.props.questionIndex
    };
  }

onSlideDone(){ 
  this.props.onUpdateGrade(this.state.index, this.state.thumbValue/10)
}

onEndSlide(){ 
   this.props.changeLocked(false)
}

onStartSlide(){ 
  this.props.changeLocked(true)
}
  render() {
    const grade = this.props.evaluation; 
    return (
      <Card>
        <CardItem>
          <Left>
              <Text>Critério</Text>
          </Left>
          <Body style={{flex:3}}>
              <Text>{this.props.question}</Text>
          </Body>
        </CardItem>

        <CardItem>
          <Left>
              <Text style={{marginTop:-5}}>Nota</Text>
          </Left>
          <Body style={{flex:3}}>
           <View> 
            <Slider 
              style={{width:200, height: 50}}
              minimumValue={this.state.minValue}
              maximumValue={this.state.maxValue}
              value={this.state.thumbValue}
              step={1}
              minimumTrackTintColor="#000000"
              maximumTrackTintColor="#000000"
              onValueChange={val => this.setState({ thumbValue: val})}
              onSlidingComplete={this.onSlideDone.bind(this)}
              onTouchStart={this.onStartSlide.bind(this)}
              onTouchEnd={this.onEndSlide.bind(this)}
            />  
            <View style={styles.textCon}>
                    <Text style={styles.colorGrey}>{this.state.minValue}</Text>
                    <Text style={styles.colorGrey}>{this.state.maxValue/10}</Text>
                </View>
           </View>
               
          </Body>
          <Right> 
            <Text note>{this.state.thumbValue/10}/10</Text>
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
