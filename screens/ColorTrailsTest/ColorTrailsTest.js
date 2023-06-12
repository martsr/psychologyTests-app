import React from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { general } from '../../config/styles/GeneralStyles';
import { FontAwesome } from '@expo/vector-icons';
import Timer from '../../components/Hanoi/Timer.js';
import { connect} from 'react-redux';
import {Dimensions } from "react-native";
import DatabaseService from '../../services/DatabaseService';
import Circle from '../../components/ColorTrails/Circle.js';
import ReturnHomeComponent from '../../components/ReturnHomeComponent';
import ColorTrailInstructions from './ColorTrailInstructions';
import AppButton from '../../components/AppButton';

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    interviewer: state.userReducer.interviewer
  }
}

const WIDTH = Math.round(Dimensions.get('window').width) - 100;
const HEIGHT = Math.round(Dimensions.get('window').height) - 400;
const OFFSET = 10;
const N = 8;
const CIRCLES = Array.from({length: N}, (_, index) => index + 1);

class ColorTrailsTest extends React.Component {
  constructor(props){
    super(props);
    this.stopTimer = React.createRef();
    this.positions = [];
    this.lastValidColor = '';
    this.lastValidNumber = 0;
    this.validMovements = 0;
    this.lastInvalidColor = '';
    this.lastInvalidNumber = 0;
    this.invalidMovements = 0;
    this.state = {
      instructionOneVisible: true,
      instructionTwoVisible: false,
      tutorial: false,
      visibleFinished: false,
      timerVisible: false,
      testVisible: false,
      trail: CIRCLES
    }
  }
  createPosition(){
    var left = Math.floor(Math.random() * (WIDTH-OFFSET) + OFFSET);
    var top = Math.floor(Math.random() * (HEIGHT-OFFSET) + OFFSET);
    while(this.isArroundOther(left, top))
    {
      var left = Math.floor(Math.random() * (WIDTH-OFFSET) + OFFSET);
      var top = Math.floor(Math.random() * (HEIGHT-OFFSET) + OFFSET);
    }
    this.positions.push({"left": left, "top": top});
    return {"left": left, "top": top}
  }
  isArroundOther(left, top) {
    return this.positions.filter(value => 
      left > value.left - 75 && left < value.left + 75 && 
      top > value.top - 75 && top < value.top + 75)
      .length != 0;
  }
  endTutorial = () => {
    this.setState({ 
      tutorial : false, 
      instructionTwoVisible: false,
      timerVisible: true,
      testVisible: true
    });
  }
  updateMovements = (color, number) => {
    if(this.state.tutorial == true){
      color = color == '#ee856f'? 'red': 'yellow';
      if(this.lastValidNumber + 1 == number){
        this.lastValidNumber = number;
        this.validMovements++;
      }
      else{
        this.invalidMovements++;
      }
      if(this.lastInvalidNumber == number){
        this.invalidMovements--;
      }
      else{
        this.lastInvalidNumber = number;
      }
      if(this.validMovements == N){
        console.log("Im about to modify the state");
        this.setState({instructionOneVisible: false, instructionTwoVisible: true, tutorial: false});
        console.log("Done");
      }
    }
    else{
      color = color == '#ee856f'? 'red': 'yellow';
      if(this.lastValidNumber + 1 == number && this.lastValidColor != color){
        this.lastValidColor = color;
        this.lastValidNumber = number;
        this.validMovements++;
      }
      else{
        this.invalidMovements++;
      }
      if(this.lastInvalidColor == color && this.lastInvalidNumber == number){
        this.invalidMovements--;
      }
      else{
        this.lastInvalidColor = color;
        this.lastInvalidNumber = number;
      }
      if(this.validMovements == N){
        var time = this.stopTimer.current.state.time;
        this.stopTimer.current.stop();
        this.setState({testVisible: false, visibleFinished: true});
        results = [{
          "pathLength": N,
          "validMovements": this.validMovements,
          "invalidMovements": this.invalidMovements,
          "timeElapsed": time
        }]
        DatabaseService.instance().saveColorTrailsTestResult(this.props.user, this.props.interviewer, results);
      }
    }
  }
  render(){
    const valuesFromCircle = (color, number) => {
      this.updateMovements(color, number);
    }
    redCircles = this.state.trail.map((num, index) => (
      <Circle 
        key={"r"+num+index} 
        color='#ee856f'
        number={num}
        position={this.createPosition()}
        valuesFromCircle={valuesFromCircle}
        />
    ));
    yellowCircles = this.state.trail.map((num, index) => (
      <Circle 
        key={"y"+num+index} 
        color='#eeec0b'
        number={num}
        position={this.createPosition()}
        valuesFromCircle={valuesFromCircle}
        />
    ));
    return (
      <SafeAreaView style={styles.container}>
        {this.state.instructionOneVisible? (<View style={styles.textContainer}>
          <Text style={styles.title}>Instrucciones</Text>
          <View>
            <Text style={styles.text}>El objetivo de este juego es crear un camino del 1 al 8 presionando los circulos en pantalla.</Text>
            <Text style={styles.text}>¡Presiona los circulos en orden numerico y completa el camino!</Text>
          </View>
        </View>): null}
        {this.state.instructionTwoVisible? (<View style={styles.textContainer}>
          <Text style={styles.title}>¡Excelente!</Text>
          <View>
            <Text style={styles.text}>Ahora el desafio es crear el camino del 1 al 8 pero intercambiando colores</Text>
            <Text style={styles.text}>Si primero eliges Rojo, luego deberas elegir Amarillo y alternar hasta terminar ¡Suerte!</Text>
            <AppButton onPress={() => this.endTutorial()} title="Comenzar" style={{width: 200, marginTop: 30, marginLeft: 75}}></AppButton>
          </View>
        </View>): null}
        <Modal animationType="slide" visible={this.state.visibleFinished}>
          <ReturnHomeComponent navigation={this.props.navigation}/>
        </Modal>
        <View style={styles.timer}>
          {this.state.timerVisible? <Timer ref={this.stopTimer}/>: null}
        </View>
        {this.state.tutorial? (<View>
          {redCircles}
        </View>): null}
        {this.state.testVisible? (<View>
          {redCircles}
          {yellowCircles}
        </View>): null}
      </SafeAreaView>
      );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  timer: {
    marginTop: 15,
    alignItems: 'flex-end',
    paddingTop: 5,
    paddingBottom: 5
  },
  textContainer: {
    zIndex : 1,
    elevation: 1,
    backgroundColor: 'white',
    opacity: 0.9,
    paddingBottom: 10,
    marginLeft: 10,
    marginTop: 30,  
    borderRadius: 5
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 75,
    marginVertical: 20,
    marginRight: 20
  },
  text: {
    fontSize: 20,
    marginLeft: 75,
    marginRight: 20
  },
});
export default connect(mapStateToProps)(ColorTrailsTest);