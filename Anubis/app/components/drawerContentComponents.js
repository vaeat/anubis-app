import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import { Text, View, StyleSheet, ImageBackground } from 'react-native'


export default class drawerContentComponents extends Component {

    navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <ImageBackground source={require('/home/telessaude/Documentos/anubis-app/Anubis/app/images/icon.png')} style={{flex: 1, width: 280, justifyContent: 'center'}} >
                    <Text style={styles.headerText}>Avaliador</Text>
                    <Text style={styles.headerText}>cpf</Text>
                </ImageBackground>
            </View>
            <View style={styles.screenContainer}>
                <View style={[styles.screenStyle, (this.props.activeItemKey=='HomePage') ? styles.activeBackgroundColor : null]}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='HomePage') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('HomePage')}>Eventos</Text>
                </View>
                <View style={[styles.screenStyle, (this.props.activeItemKey=='EventsPage') ? styles.activeBackgroundColor : null]}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='EventsPage') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('EventsPage')}>Papers</Text>
                </View>
                <View style={[styles.screenStyle, (this.props.activeItemKey=='Login') ? styles.activeBackgroundColor : null]}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Login') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('Login')}>Desconectar se</Text>
                </View>
            </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    headerContainer: {
        height: 150,
    },
    headerText: {
        color: 'white',
        alignItems: 'center',
        textAlign: 'center'
    },
    screenContainer: { 
        paddingTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    screenStyle: {
        height: 30,
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%'
    },
    screenTextStyle:{
        fontSize: 20,
        marginLeft: 20, 
        textAlign: 'center'
    },
    selectedTextStyle: {
        fontWeight: 'bold',
        color: 'white'
    },
    activeBackgroundColor: {
        backgroundColor: '#6013b2'
    }
});