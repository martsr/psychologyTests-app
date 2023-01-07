import React from 'react';
import {
  Modal,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { general,mainPage } from '../../config/styles/GeneralStyles';

import IconContainer from './IconContainer'

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function generateIcons(addEvent){
  const inconsList = ["star","book","camera", "video-camera", "gift","plane","heart","bolt","coffee"]
  var list = []
  for (let index = 0; index < 163; index++) {
    const random = Math.floor(Math.random() * inconsList.length);
    list.push(<IconContainer key = {index} name={inconsList[random]} addEvent={addEvent}></IconContainer>)
  }
  for (let index = 0; index < 10; index++) {
    list.push(<IconContainer key = {163+index} name={"bell"} addEvent={addEvent}></IconContainer>)
  }
  return shuffle(list)
}

export default class BellTest extends React.Component {
  constructor(props){
    super(props)
  }

  addEvent=(event)=>{
    if(event == "bell"){
      this.addBell()
    }
    else{
      this.addMistake()
    }
  }
  addBell = () => {
    this.setState({bells: this.state.bells + 1})
    if(this.state.bells == 9){
      alert("You win")
    }
  }

  addMistake = () => {
    this.setState({mistakes: this.state.mistakes + 1})
    console.log("Mistake")
  }
  setInvisible =()=>{
    this.setState({visible: false, listado: generateIcons(this.addEvent)})
  }
  state = {
    bells: 0,
    mistakes: 0,
    visible: true,
    listado: []
  }
    render(){
    return (
      <>
        <Modal style = {{flex:1,alignItems:"center",justifyContent:"center",flexDirection: "row",backgroundColor: '#F6F3F5', width: 400, opacity:0.5}} animationType="slide" visible={this.state.visible}>
          <Text style={general.textStyle}>Presione la campana</Text>
            <TouchableOpacity style={mainPage.button} onPress={this.setInvisible}>
              <Text style={general.textStyle}> Comenzar test</Text>
            </TouchableOpacity>
        </Modal>
        <View style={{flex:1, flexDirection: "row", flexWrap:"wrap", margin:20,alignItems: "center",justifyContent: "center"}}>
            {this.state.listado}
        </View>
      </>
      );
  }
};