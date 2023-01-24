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
  testApproved = () => {
    this.setState({testApproved: true, testBellColor: "#03c03c"})
  }
  state = {
    bells: 0,
    mistakes: 0,
    visible: true,
    listado: [],
    height: windowHeight/10,
    width: windowWidth/16,
    visibleFinished: false,
    testApproved: false,
    testBellColor: "#000000"
  }
    render(){
    return (
      <>
        <Modal transparent="true" animationType="slide" visible={this.state.visible}>
          <View style={{flex: 1,margin:30,flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}>
          <View style={{flex: 1,flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}>
              <Text style={{fontSize: 30}}>En este test usted deberá encontrar todas las campanas </Text>
              <FontAwesome name={"bell"} color={"#000000"} size={30}/>
          </View>
          <View style={{marginTop: 20, paddingHorizontal: 100,flex: 3,flexDirection: 'column',justifyContent: 'center',alignItems: 'center', borderColor: "#bcbcbc", borderWidth: 2, borderRadius:15, backgroundColor: "#eeeeee"}}>
          <Text style={{fontSize: 30}}>Presione la campana</Text>
            <View style={{flex: 1,flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
              <TouchableOpacity onPress={this.testApproved}>
                <FontAwesome name={"bell"} color={this.state.testBellColor} size={200}/>
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name={"star"} color={"#000000"} size={200}/>
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name={"camera"} color={"#000000"} size={200}/>
              </TouchableOpacity>
            </View>
          </View>
          {this.state.testApproved ?
          <View style={{flex: 3}}>
            <TouchableOpacity style = {{flex:1, flexDirection: "row"}}onPress={this.setInvisible}>
              <Text style={{fontSize: 30, color:"#03c03c"}}> Comenzar test</Text>
              <FontAwesome style={{marginLeft: 15}} name={"forward"} color={"#03c03c"} size={50}/>
            </TouchableOpacity>
          </View>:<View style ={{flex:3}}></View>}
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