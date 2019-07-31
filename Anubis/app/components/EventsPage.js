/*EventsPage.js*/
import React, { Component } from "react";
import { Image, Platform, ScrollView, View, Dimensions } from "react-native";
import { Container, Button, Icon, Tab, TabHeading, Tabs, Text } from "native-base";
import {
  SearchBar
} from "react-native-elements";

import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from "Anubis/app/components/PageHeader.js";
import Papers from "Anubis/app/views/Papers.js";
import NumberBadge from "./NumberBadge";
//import Home from "../components/Home";

export default class EventsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      headerName: 'Papers',
      PapersList:  this.props.navigation.state.params.PapersList,


      //to pass header props
      isSearchBarVisible: false,
      isHeaderVisible: true,
      backgroundColor: "#6013b2",
      isLoading: false,
      isSearchIconVisible: true,


      dataToEvaluate:this.props.navigation.state.params.dataToEvaluate,
      dataEvaluated: this.props.navigation.state.params.dataEvaluated,
      search: ''
    };
  }


  static navigationOptions = {
    header: null,

  };


  SearchBarVisible = () => {
    this.setState({ isSearchBarVisible: true })
    this.setState({ isHeaderVisible: false })
    this.setState({ backgroundColor: "transparent" })
  }


  SearchBarInvisible = () => {
    this.searchFilterFunction('')
    this.setState({ search : ''})
    this.setState({ isSearchBarVisible: false, isHeaderVisible: true })
    this.setState({ backgroundColor: "#6013b2" })
  }


  changeSearch = (e) => {
    this.setState({ search: e })
    this.searchFilterFunction(e)
  }


  searchFilterFunction = (text) => {
    //for ToEvaluate list
      const newDataToEval = this.props.navigation.state.params.ToEvaluate.filter(item => {
      const itemData = `${item.title.toString().toUpperCase()}   
       ${item.time.toString().toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    this.props.navigation.setParams({ dataToEvaluate: newDataToEval });

    //for evaluated list
    const newDataEval = this.props.navigation.state.params.Evaluated.filter(item => {
      const itemData = `${item.title.toString().toUpperCase()}   
       ${item.time.toString().toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.props.navigation.setParams({ dataEvaluated: newDataEval });

    console.log('search function works')
  };

  render() {

    if (this.state.isSearchBarVisible) {
      Header =
        <View style={{ flexDirection: 'row', width: Dimensions.get('window').width, height:56, backgroundColor: "#6013b2" }}>
          <View style={{ flex: 4 }}>
            <SearchBar
              style={{ justifyContent: 'flex-end' }}
              round
              containerStyle={{
                backgroundColor: "#6013b2",
                shadowColor: 'white', borderBottomColor: 'transparent', borderTopColor: 'transparent'
              }}

              lightTheme={true}
              onChangeText={this.changeSearch.bind(this)}
              searchIcon={null}
              showLoading={this.state.isLoading}
              clearIcon={true}
              placeholder="Pesquisar..."
              value={this.state.search}
            />
          </View>
          <Button style={{ justifyContent: 'center', marginTop:5, backgroundColor: "#6013b2" }}
            transparent
            onPress={this.SearchBarInvisible}
          >
            <View>
              <Icon type="MaterialIcons" name="arrow-back" style={{ color: "white" }} />
            </View>
          </Button>
          

        </View>

    } else if (this.state.isHeaderVisible) {
      Header =
        <PageHeader navigation={this.props.navigation} name={this.state.headerName}
          isSearchBarVisible={this.state.isSearchBarVisible}
          isHeaderVisible={this.state.isHeaderVisible}
          backgroundColor={this.state.backgroundColor}
          isLoading={this.state.isLoading}
          isSearchIconVisible={this.state.isSearchIconVisible}
          SearchBarVisible={this.SearchBarVisible.bind(this)}
          SearchBarInvisible={this.SearchBarInvisible.bind(this)}
          search={this.state.search}
        />
    }
    return (
      <Container>

        {Header}

        <Tabs style={Platform.OS === 'android' ? { overflow: 'hidden' } : null} >
          <Tab heading={
            <TabHeading style={{ backgroundColor: "#8f2fd8" }}>
              <Text>Avaliar</Text>
              <NumberBadge 
               /*props for the badge */
                name={'ToEvaluate'} 
                number={this.props.navigation.state.params.ToEvaluate.length}
              />
            </TabHeading>
          }>

            {/*flatlist being rendered */}
            <Papers navigation={this.props.navigation} tab='ToEvaluate'
              PapersList={this.props.navigation.state.params.ToEvaluate}

              isActivityVisible={this.state.isActivityVisible}

              isSearchBarVisible={this.state.isSearchBarVisible}
              isHeaderVisible={this.state.isHeaderVisible}
              search={this.state.search}

              data={this.props.navigation.state.params.dataToEvaluate}
            />
          </Tab>

          <Tab heading={
            <TabHeading style={{ backgroundColor: "#8f2fd8" }} >
              <Text>Avaliadas</Text>
              <NumberBadge name={'Evaluated'} number={this.props.navigation.state.params.Evaluated.length}/>
            </TabHeading>}>
            <Papers navigation={this.props.navigation} tab='Evaluated'
              PapersList={this.props.navigation.state.params.Evaluated}

              isActivityVisible={this.state.isActivityVisible}
              isSearchBarVisible={this.state.isSearchBarVisible}
              isHeaderVisible={this.state.isHeaderVisible}

              data={this.props.navigation.state.params.dataEvaluated} />
          </Tab>
        </Tabs>

      </Container>
    );
  }

}
