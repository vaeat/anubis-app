/*Papers.js*/

import React, { Component } from "react";

import {
  ActivityIndicator,
  Modal,
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
  ThemeProvider, 
  SearchBar
} from "react-native-elements";


import AsyncStorage from '@react-native-community/async-storage';
import { Container, Tab, TabHeading, Tabs } from "native-base";

import { TouchableOpacity } from "react-native-gesture-handler";

import RenderList from '../components/RenderList';


export default class Papers extends React.Component {
  static navigationOptions = {
    header: null,

  };


  constructor(props) {
    super(props);
    this.state = {
      searchtext: this.props.searchtext,
      searchedData: this.props.searchedData,
      isSearchBarVisible: this.props.isSearchBarVisible,
      isHeaderVisible: this.props.isHeaderVisible,

      search: this.props.search,

     // ToEvaluate: this.props.PapersList,
      Evaluated: this.props.navigation.state.params.Evaluated,
      ToEvaluate: this.props.navigation.state.params.ToEvaluate, 

      otherData: [],
      data: this.props.PapersList,
      refresh:false
      };
  }



  componentDidUpdate(){ 
   
   console.log('Evaluated upd df', this.props.navigation.state.params.Evaluated.length)
      console.log('To Evaluate upd df', this.props.navigation.state.params.ToEvaluate.length)

  }

  updateLists = (ToEvaluate, Evaluated) => {
   this.props.navigation.setParams({ ToEvaluate: ToEvaluate, Evaluated: Evaluated})
   this.setState({ search : ''})

   const { refresh  } = this.state;
   this.setState({ refresh : !refresh})
    console.log('lists are updated', this.props.navigation.state.params.ToEvaluate.length, this.props.navigation.state.params.Evaluated.length)
  }

  displayDetailForPaper = (item, Evaluated, ToEvaluate, search) => {
    if (this.props.tab == 'ToEvaluate') {

        this.setState({ isSearchBarVisible: false, isHeaderVisible: true })
        this.setState({ backgroundColor: "#6013b2" })
        this.setState({ search : ''})

      this.props.navigation.navigate("NewEvaluation", {item, Evaluated, ToEvaluate, search, updateLists: this.updateLists})     
    }
    else if (this.props.tab == 'Evaluated') {
      this.props.navigation.navigate("NewEdit", {item})
    }
  }


  goToTop = () => {
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
  }



  render() {
    if (this.props.data != null){ 
      data= this.props.data
      if (this.props.tab == 'ToEvaluate'){ 
        otherData=this.props.navigation.state.params.Evaluated;
      }
      else if (this.props.tab == 'Evaluated'){ 
        otherData=this.props.navigation.state.params.ToEvaluate;
      }
    } else { 
     // data = this.state.data
      if (this.props.tab == 'ToEvaluate'){ 
        otherData=this.props.navigation.state.params.Evaluated;
        data=this.props.navigation.state.params.ToEvaluate
      }
      else if (this.props.tab == 'Evaluated'){ 
        data=this.props.navigation.state.params.Evaluated
        otherData=this.props.navigation.state.params.ToEvaluate;
      }
    } 


    return (
      <Container>
        <FlatList
          ref={(c) => { this.flatListRef = c }}
          data={data}
          keyExtractor={(item, index) => item.title.toString()}
          extraData={this.state.search}
          renderItem={({item}) => <RenderList item={item} data={data} 
          displayDetailForPaper={this.displayDetailForPaper} 
          Evaluated={this.props.navigation.state.params.Evaluated} 
          ToEvaluate={this.props.navigation.state.params.ToEvaluate} 
          isSearchBarVisible={this.props.isSearchBarVisible}
          isHeaderVisible={this.props.isHeaderVisible}
          />}
  
        />

          <View style={styles.buttonView}>
            <TouchableOpacity visible={this.props.isTouchableVisible} onPress={this.goToTop} style={styles.goUpTouchable}>
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
    marginBottom: 5,
    fontSize: 30,
    color: 'white'
  },
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