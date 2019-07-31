/*EvaluationView.js*/
import React, { Component } from "react";
import { Alert, Image, Platform, ScrollView, View, Picker, Dimensions, Modal } from "react-native";
import { Button, Container, Card, CardItem, Left, Tab, Icon, TabHeading, Tabs, Text } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";

import EvaluateCardView from "Anubis/app/views/EvaluateCardView";
import EvaluateValidatedModal from '../components/EvaluateValidatedModal'

export default class EvaluationView extends Component {
  static navigationOptions = {
    header: null

  };

  constructor(props) {
    super(props);
    this.onUpdateGrade.bind(this)
    this.state = {
      isEvaluateValidatedModalVisible: false,

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
          grade: '',
        },
        {
          criteria: 'consistency',
          grade: '',
        },
        {
          criteria: 'clarity',
          grade: '',
        },
        {
          criteria: 'relevance',
          grade: '',
        },
        {
          criteria: 'quality',
          grade: '',
        },
        {
          criteria: 'domain',
          grade: '',
        }
      ]
    };
  }

  deleteItemToEvaluate = (item) => {
    const data = this.props.navigation.state.params.ToEvaluate;
    const filteredItems = data.filter(data => data !== item)
    console.log('removing')
    this.props.navigation.setParams({ ToEvaluate: filteredItems })
    return this.props.navigation.state.params.ToEvaluate;
  }

  addItemEvaluated = (item) => {
    const data = this.props.navigation.state.params.Evaluated;
    console.log('concating')
    this.props.navigation.setParams({
      //in this case, otherData is the Evaluated list
      Evaluated: [...data, item]
    });
    return this.props.navigation.state.params.Evaluated;
  }


  submit() {
    let evaluation = {};
    evaluation.cpf = 1;
    evaluation.paper = this.props.navigation.state.params.item.code;
    evaluation.originality = this.state.evaluation[0].grade
    evaluation.consistency = this.state.evaluation[1].grade
    evaluation.clarity = this.state.evaluation[2].grade
    evaluation.relevance = this.state.evaluation[3].grade
    evaluation.quality = this.state.evaluation[4].grade
    evaluation.domain = this.state.evaluation[5].grade
    console.log('submit', evaluation)

    //push the evaluation to API 

    /*  var url = 'http://159.65.104.138/api/papers/'+this.props.navigation.state.params.item.code; 

    fetch(url, { 
      method: 'POST', 
      body: JSON.stringify(evaluation),
       headers: new Headers({
         'Content-Type': 'application/json'
       })
    }).then(res => res.json())
    .catch(error => console.error('Error', error))
    .then(response => console.log('success', response)); 
   
   */

    //Remove the item from ToEvaluate and add it to Evaluated
    console.log('Evaluated before', this.props.navigation.state.params.Evaluated.length)
    console.log('To Evaluate before', this.props.navigation.state.params.ToEvaluate.length)
    this.deleteItemToEvaluate(this.props.navigation.state.params.item)
    this.addItemEvaluated(this.props.navigation.state.params.item)
    console.log('Evaluated after', this.props.navigation.state.params.Evaluated.length)
    console.log('To Evaluate after', this.props.navigation.state.params.ToEvaluate.length)
    this.props.navigation.state.params.updateLists(this.props.navigation.state.params.ToEvaluate, this.props.navigation.state.params.Evaluated)

    this.props.navigation.setParams({ isHeaderVisible: !this.props.navigation.state.params.isHeaderVisible, isSearchBarVisible: !this.props.navigation.state.params.isSearchBarVisible })
  }


  changeEvaluateValidatedModalVisibility = (bool) => (
    this.setState({ isEvaluateValidatedModalVisible: bool })
  )


  onUpdateGrade = (index, newValue) => {
    const copied = [...this.state.evaluation]
    copied[index].grade = newValue
    this.setState({ evaluation: copied })
  };


  updatePresentator = (selection) => {
    console.log('state view', this.state)
    this.setState({ presentator: selection })
  }

  yesButton() {
    //!!! when submit, move the paper to the other list working but list does not update
    this.submit()

    this.changeEvaluateValidatedModalVisibility(true);
    //timeout for modal to not close after 2 seconds
    setTimeout(() => {
      this.props.navigation.navigate("EventsPage")
    }, 2000); //2000   
  }



  validateButton() {
    Alert.alert(
      '',
      'Você tem certeza de suas mudanças? Você sempre pode editar os trabalhos acessando a aba "Avaliadas"',
      [
        {
          text: 'Sim', onPress: () => this.yesButton(),
        },
        { text: 'Não', onPress: () => console.log('no pressed') },
      ],
      { cancelable: true },
    );

  }

  cancelButton() {
    Alert.alert(
      'Atenção',
      'Tem certeza de que deseja excluir seu progresso? Você ainda poderá classificar este papel na aba "Avaliar"',
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
            return <EvaluateCardView changeLocked={this.props.changeLocked.bind(this)}
              question={question}
              criteria={this.state.criterias[questionIndex]}
              grade={this.state.evaluation[questionIndex].grade}
              onUpdateGrade={this.onUpdateGrade}
              questionIndex={questionIndex}
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

        <Modal transparent={true} visible={this.state.isEvaluateValidatedModalVisible} onRequestClose={() => this.changeEvaluateValidatedModalVisibility(false)} animationType='fade'>
          <EvaluateValidatedModal changeEvaluateValidatedModalVisibility={this.changeEvaluateValidatedModalVisibility} />
        </Modal>

      </Container>
    );
  }

}
