import React from 'react';
import {
  Modal,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
} from 'react-native';
import { general,mainPage } from '../../config/styles/GeneralStyles';
import { FontAwesome } from '@expo/vector-icons';

import IconContainer from './IconContainer'

const windowWidth = Dimensions.get('window').width-20;
const windowHeight = Dimensions.get('window').height-20;

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

function generateIcons(addEvent,height,width){
  console.log(windowHeight, windowWidth)
  const inconsList = ["star","book","camera", "video-camera", "gift","legal","trophy","heart","coffee"]
  var list = []
  console.log(height)
  console.log(width)
  console.log("Area: ", (windowHeight*windowWidth)/160)
  console.log("Box Area:", height*width)
  for (let index = 0; index < 150; index++) {
    const random = Math.floor(Math.random() * inconsList.length);
    list.push(<IconContainer key = {index} height={height} width={width} name={inconsList[random]} addEvent={addEvent}></IconContainer>)
  }
  for (let index = 0; index < 10; index++) {
    list.push(<IconContainer key = {154+index} height={height} width={width} name={"bell"} addEvent={addEvent}></IconContainer>)
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
      this.setState({visibleFinished: true})
    }
  }

  addMistake = () => {
    this.setState({mistakes: this.state.mistakes + 1})
    console.log("Mistake")
  }
  setInvisible =()=>{
    this.setState({visible: false, listado: generateIcons(this.addEvent, this.state.height, this.state.width)})
  }
  state = {
    bells: 0,
    mistakes: 0,
    visible: true,
    listado: [],
    height: windowHeight/10,
    width: windowWidth/16,
    visibleFinished: false
  }
    render(){
    return (
      <>
        <Modal transparent="true" animationType="slide" visible={this.state.visible}>
          <View style={{flex: 1,flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}>
          <View style={{flex: 1,flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
            <Text style={general.textStyle}>En este test usted deberá presionar todas las campanas </Text>
              <FontAwesome name={"bell"} color={"#000000"} size={20}/>
            <Text style={general.textStyle}>que encuentre </Text>
          </View>
          <View style={{flex: 3,flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
            <FontAwesome name={"bell"} color={"#000000"} size={70}/>
            <FontAwesome name={"star"} color={"#000000"} size={70}/>
            <FontAwesome name={"camera"} color={"#000000"} size={70}/>
          </View>
          <View style={{flex: 3}}>
            <TouchableOpacity style={mainPage.button} onPress={this.setInvisible}>
              <Text style={general.textStyle}> Comenzar test</Text>
            </TouchableOpacity>
          </View>
          </View>
        </Modal>
        <Modal animationType="slide" visible={this.state.visibleFinished}>
          <View style={[general.backgroundStyle,{flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}]}>
          <Text style={general.textStyle}>Juego terminado</Text>
            <TouchableOpacity style={mainPage.button} onPress={() => this.props.navigation.navigate('HomeScreen')}>
              <Text style={general.textStyle}> Volver a Inicio</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={{flex:1, flexDirection: "row",margin:10, flexWrap:"wrap",alignItems: "center",justifyContent: "center"}}>
            {this.state.listado}
        </View>
      </>
      );
  }
};