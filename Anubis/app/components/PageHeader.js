/*PageHeader.js*/

import React, { Component } from "react";

import {
  Container,
  Image,
  Alert,
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";

import {
  Body,
  Button,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title,
} from "native-base";

import {DrawerActions} from 'react-navigation'

import {
  SearchBar
} from "react-native-elements";



export default class PageHeader extends Component {

  constructor(props) {
    super(props);
    //setting default state
    this.state = {
      search: '',
      isSearchBarVisible: this.props.isSearchBarVisible,
      isHeaderVisible: this.props.isHeaderVisible,
      backgroundColor: this.props.backgroundColor,
      isLoading: this.props.isLoading,
      isSearchIconVisible: this.props.isSearchIconVisible,
    };
  }

 


   SearchBarVisible = () => {
    this.props.SearchBarVisible(); 
  } 

  toggleDrawer = () => {
    console.log('pressed')
   this.props.navigation.dispatch(DrawerActions.toggleDrawer());
  }


  editCancelButton() {
    Alert.alert( 
    'Atenção',
    'Tem certeza de que deseja excluir seu progresso? Você ainda poderá editar a classificação deste papel na aba "Avaliadas"',
    [
      {
        text: 'Sim',
        onPress:  () => this.props.navigation.navigate("EventsPage"),
        // this.props.navigation.navigate("EventsPage", {isSearchBarVisible:false, isHeaderVisible:true}),
      },
      {text: 'Não', onPress: () => console.log('no pressed') },
    ],
    {cancelable: true},
  );
  }



  evaluateCancelButton() {
    Alert.alert(
    'Atenção',
    'Tem certeza de que deseja excluir seu progresso? Você ainda poderá classificar este papel na aba "Avaliar"',
    [
      {
        text: 'Sim',
        onPress:  () =>  this.props.navigation.navigate("EventsPage"),
      },
      {text: 'Não', onPress: () => console.log('no pressed') },
    ],
    {cancelable: true},
  );
  }
  
  

  goToPreviousPage () { 
    console.log('previous pressed')
    if (this.props.name == 'Papers'){
      this.props.navigation.navigate("HomePage")
    } 
  if (this.props.name == 'Editar Avaliação'){ 
    this.editCancelButton(); 
  } 
  else if (this.props.name == 'Nova Avaliação' ) {  
    console.log('je enter else if')
    console.log('resetheader de  else if', this.state.backgroundColor, this.state.isHeaderVisible, this.state.isSearchBarVisible, this.state.search)
    this.props.SearchBarInvisible; 
    this.evaluateCancelButton();  
    console.log('resetheader de  else if après', this.state.backgroundColor, this.state.isHeaderVisible, this.state.isSearchBarVisible, this.state.search)
  }   
    
  }

  changeSearch = (e) => {
    this.setState({ search: e })
  }
  render() {
    return (

      <Header hasTabs androidStatusBarColor="#6013b2" style={{ backgroundColor: this.state.backgroundColor }}>

          <Left>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button
                transparent
              //  onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}
              onPress={this.toggleDrawer}
              >
        
         
                <Icon type="MaterialIcons" name="account-circle" />
                       
      
              </Button>
            </View>
          </Left>

          
          <Body style={{ flex: 2 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button style={{ justifyContent: 'flex-end' }}
                  transparent
                  
         
                >
                  <View>
                    <TouchableOpacity onPress={this.goToPreviousPage.bind(this)}>
                    <Icon type="MaterialIcons" name="arrow-back" style={{ color: "white" }} />
                    </TouchableOpacity>
                    
                  </View>
                </Button>

             <Button style={{ flex: 1, justifyContent: 'center' }}
                  transparent
                  onPress={() => {
                    Alert.alert('You tapped the button!');
                  }}
                >
                  <View>
                    <Title>{this.props.name}</Title>
                  </View>
                </Button>


            </View>

          </Body>

          <Right>
            {(this.props.name == 'Papers')&&  
            <Button
            transparent
            onPress={this.SearchBarVisible.bind(this)}
          >
            <Icon type="MaterialIcons" name="search" />
          </Button>
           }
   
            <Button
              transparent
            
            >
            <TouchableOpacity   onPress={() => this.props.navigation.navigate("HomePage")}>
            <Icon type="MaterialIcons" name="home" />
            </TouchableOpacity>
       
            </Button>
  
          

          </Right>

      </Header>


    );
  }

}

