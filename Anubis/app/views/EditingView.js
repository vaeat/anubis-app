/*EditingView.js*/
import React, { Component } from "react";
import { Alert, Image, Platform, ScrollView, View, Picker, Dimensions, Modal } from "react-native";
import { Button, Container, Card, CardItem, Left, Tab, Icon, TabHeading, Tabs, Text } from "native-base";

import TextView from "Anubis/app/views/TextView.js"
import EditCardView from "Anubis/app/views/EditCardView";
import EditValidatedModal from '../components/EditValidatedModal'
import { TouchableOpacity } from "react-native-gesture-handler";

export default class EditingView extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      isEditValidatedModalVisible: false,

      locked: this.props.locked,
      presentator: '',
      presentatorData: this.props.navigation.state.params.item.autores.split(','),
      criterias: ['Originalidade e caráter inovador',
        'Consistência e rigor na abordagem teórico-metodológica',
        'Clareza dos resultados alcançados',
        'Relevância para a área',
        'Qualidade visual da apresentação/pôster',
        'Domínio do assunto'],
      evaluation: [
        {
          criteria: 'originality',
          grade: 10,
        },
        {
          criteria: 'consistency',
          grade: 10,
        },
        {
          criteria: 'clarity',
          grade: 10,
        },
        {
          criteria: 'relevance',
          grade: 10,
        },
        {
          criteria: 'quality',
          grade: 10,
        },
        {
          criteria: 'domain',
          grade: 10,
        }
      ]
    };

  }

  updatePresentator = (presentator) => {
    this.setState({ presentator: presentator })
  }

  onUpdateGrade = (index, newValue) => {
    const copied = [...this.state.evaluation]
    copied[index].grade = newValue
    this.setState({ evaluation: copied })
  };

  changeEditValidatedModalVisibility = (bool) => (
    this.setState({ isEditValidatedModalVisible: bool })
  )

  setGrades() {
    let grades = ['7.8', '9.7', '8.2', '6.2', '7.3', '8']
  }
  yesButton() {
    //do the submit part  
    this.changeEditValidatedModalVisibility(true);
    //timeout for modal to not close instantaneously
    setTimeout(() => {
      this.props.navigation.navigate("EventsPage")
    }, 2000); //2000   
    console.log('modal3', this.state.isEditValidatedModalVisible)
  }


  validateButton() {
    Alert.alert(
      '',
      'Você tem certeza de suas mudanças? Você ainda pode editar as notas retornando a esta página',
      [
        {
          text: 'Sim',
          onPress: () => this.yesButton(),
        },
        { text: 'Não', onPress: () => console.log('no pressed') },
      ],
      { cancelable: true },
    );
  }

  cancelButton() {
    Alert.alert(
      'Atenção',
      'Tem certeza de que deseja excluir seu progresso? Você ainda poderá editar a classificação deste papel na aba "Avaliadas"',
      [
        {
          text: 'Sim',
          onPress: () => this.props.navigation.navigate("EventsPage"),
        },
        { text: 'Não', onPress: () => console.log('no pressed') },
      ],
      { cancelable: true },
    );
  }


  render() {
    return (
      <Container>
        <ScrollView>
          <Card>
            <CardItem style={{ marginLeft: -10 }}>
              <Left>
                <Text>Apresentador</Text>
              </Left>
            </CardItem>

            <Picker style={{ marginLeft: 10, marginRight: 5 }} selectedValue={this.state.presentator}
              onValueChange={(value) => { this.updatePresentator(value) }}
              itemStyle={{ backgroundColor: "white", color: "black", widht: '100%' }}>
              {this.state.presentatorData.map((i) => {
                return <Picker.Item key={i} value={i} label={i} />
              })}
            </Picker>

          </Card>

          {this.state.criterias.map((question, questionIndex) => {
            return <EditCardView changeLocked={this.props.changeLocked.bind(this)}
              question={question}
              criteria={this.state.criterias[questionIndex]}
              grade={this.state.evaluation[questionIndex].grade}
              onUpdateGrade={this.onUpdateGrade}
              questionIndex={questionIndex}
              //  grade={this.state.grades} 
              key={questionIndex} />
          })}


          <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'stretch' }}>
            <TouchableOpacity onPress={this.validateButton.bind(this)} style={{ flex: 2, alignItems: 'stretch' }}>
              <Button iconRight success  //style={{ flex: 1 }}
                transparent
              >
                <Text>Validar</Text>
                <Icon type="MaterialIcons" name="done" />

              </Button>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.cancelButton.bind(this)} style={{ flex: 2, alignItems: 'stretch' }}>
              <Button iconRight danger
                transparent
              >
                <Text>Cancelar</Text>
                <Icon type="MaterialIcons" name="cancel" />


              </Button>
            </TouchableOpacity>
          </View>

        </ScrollView>

        <Modal transparent={true} visible={this.state.isEditValidatedModalVisible} onRequestClose={() => this.changeEditValidatedModalVisibility(false)} animationType='fade'>
          <EditValidatedModal changeEditValidatedModalVisibility={this.changeEditValidatedModalVisibility} />
        </Modal>

      </Container>
    );
  }

}
