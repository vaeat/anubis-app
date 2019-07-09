
/*PaperCardView.js*/

import React, { Component } from "react";

import {
    View,
    ScrollView,
    FlatList,
    Alert
} from 'react-native';

import {
    Card,
    Icon,
    Text,
    ThemeProvider
} from "react-native-elements";


import AsyncStorage from '@react-native-community/async-storage';
import { Container, Tab, TabHeading, Tabs } from "native-base";

import MainHeader from "Anubis/app/components/MainHeader.js";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class PaperCardView extends Component {
    static navigationOptions = {
        header: null,

    };

    render() {

        const paper  = this.props.paper
        const displayDetailForPaper = this.props.displayDetailForPaper

        return (
            <Container>

<TouchableOpacity
                //onPress={() => { Alert.alert('You tapped the button!')  }}
                //onPress={() => console.log(this.props.navigation)}
                //onPress={() => {navigation.navigate("New Evaluation", {PapersList})}}
                onPress={displayDetailForPaper(paper.title.toString())}
            >
                <Card>
                    <Text
                        style={{ marginBottom: 10 }}
                    //onPress={() => this.props.navigation.navigate("Question", {item})}
                    >
                        {paper.title.toString()}
                    </Text>
                    <Text
                        style={{ marginBottom: 10 }}
                    //onPress={() => this.props.navigation.navigate("Question", {item})}   
                    >
                        {paper.cateName}
                    </Text>
                    <Text
                        style={{ marginBottom: 10 }}
                    //onPress={() => this.props.navigation.navigate("Question", {item})}   
                    >
                        {paper.time.toString()}
                    </Text>
                </Card>

            </TouchableOpacity>



            </Container>
          
        );
    }
}
