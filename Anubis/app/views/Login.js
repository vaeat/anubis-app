import React, { Component } from "react";
import {
  Alert,
  AppRegistry,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Text,
  View
} from "react-native";

import { Icon } from "native-base"


export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      visible: true, 
      icon: "eye-off", 
      logging: "false",
      token: ""
    };
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#D95D39",
      elevation: null
    },
    header: null
  };

  changePasswordVisibility (){
    this.setState(prevState =>  ({ 
      icon: prevState.icon === 'eye' ? 'eye-off' : 'eye', 
      visible: !prevState.visible,  
    })); 
  }
  
  async login(responseJson) {
    console.log('login to do')

  };

  async onLoginPress() {
    const email = this.state.email;
    const password = this.state.password;

    console.log(email);
    console.log(password);

    this.props.navigation.navigate("HomePage")

  }

  render() {
    return (
        <View behavior="padding" style={styles.container}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("/home/telessaude/Documentos/anubis-app/Anubis/app/images/icon.png")} />
            <Text style={styles.subtext}>Anubis</Text>
          </View>
          <KeyboardAvoidingView style={styles.keyboard}>

            <View style={styles.window}>
              <TextInput
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
            </View>
            <View style={styles.window}>
             <View style={{ flexDirection: 'row'}}> 
             <TextInput
                style={{flex:3}}
                placeholder="Senha"
                returnKeyType="go"
                secureTextEntry={this.state.visible}
                ref={input => (this.passwordInput = input)}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
              <Icon name={this.state.icon} onPress={() => this.changePasswordVisibility()}/>
             </View> 
             
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.onLoginPress.bind(this)}
            >
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  logoContainer: {
    flexDirection: "column",
    alignItems: "center",
    //flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: '40%',
    height: '40%'
  },
  subtext: {
    color: "black",
    marginTop: 10,
    width: 300,
    textAlign: "center",
    opacity: 0.8,
    fontSize: 50
  },
  keyboard: {
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    alignSelf: "stretch"
  },
  buttonContainer: {
    backgroundColor: "#6013b2",
    paddingVertical: 15
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700"
  },
  button: {
    backgroundColor: "#6013b2",
    paddingVertical: 15
  },
  window: {
    marginBottom: 15
  }
});

AppRegistry.registerComponent("Login", () => Login);
