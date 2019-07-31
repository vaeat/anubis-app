import React, { PureComponent } from "react";

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


import { TouchableOpacity } from "react-native-gesture-handler";


export default class RenderList extends PureComponent {
    render() {
        const item= this.props.item; 
        console.log('je suis dans le render', 'data', this.props.data.length)
        const isSearchBarVisible =  this.props.isSearchBarVisible;
        const isHeaderVisible = this.props.isHeaderVisible;
        const Evaluated = this.props.Evaluated; 
        const ToEvaluate = this.props.ToEvaluate
        return (

            <Card>
                <TouchableOpacity
                    onPress={() => this.props.displayDetailForPaper(item, Evaluated, ToEvaluate, isSearchBarVisible, isHeaderVisible)}>
                    <Text
                        style={{ marginBottom: 10, fontWeight: 'bold', fontSize: 15 }}
                    >
                        {item.title.toString()}
                    </Text>
                    <Text
                        style={{ marginBottom: 10, fontStyle: 'italic' }}
                    >
                        {item.cateName}
                    </Text>
                    <Text
                        style={{ marginBottom: 10 }}
                    >
                        {item.time.toString()}
                    </Text>
                </TouchableOpacity>

            </Card>

        )

    }
}
