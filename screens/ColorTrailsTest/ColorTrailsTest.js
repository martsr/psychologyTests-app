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
import Circle from '../../components/ColorTrails/Circle.js';
import ReturnHomeComponent from '../../components/ReturnHomeComponent';

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    interviewer: state.userReducer.interviewer
  }
}

const WIDTH = Math.round(Dimensions.get('window').width) - 100;
const HEIGHT = Math.round(Dimensions.get('window').height) - 250;
const OFFSET = 100;
const N = 8;
const circles = Array.from({length: N}, (_, index) => index + 1);
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
      visibleFinished: false,
      timerVisible: true
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

  render(){
    const valuesFromCircle = (color, number) => {
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
      response = {"pathLength": N, "validMovements": this.validMovements, "invalidMovements": this.invalidMovements};
      console.log(response);
      if(this.validMovements == N){
        var time = this.stopTimer.current.state.time;
        this.stopTimer.current.stop();
        this.setState({visibleFinished: true});
        console.log("INFORMATION TO DB:")
        console.log({"pathLength": N, "validMovements": this.validMovements, "invalidMovements": this.invalidMovements, "timeElapsed": time});
      }
    }
    redCircles = circles.map((num, index) => (
      <Circle 
        key={"r"+num+index} 
        color='#ee856f'
        number={num}
        position={this.createPosition()}
        valuesFromCircle={valuesFromCircle}
        />
    ));
    yellowCircles = circles.map((num, index) => (
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
        <Modal animationType="slide" visible={this.state.visibleFinished}>
          <ReturnHomeComponent navigation={this.props.navigation}/>
        </Modal>
        <View style={styles.timer}>
          {this.state.timerVisible? <Timer ref={this.stopTimer}/>: null}
        </View>
        <View>
          {redCircles}
          {yellowCircles}
        </View>
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
  }
});
export default connect(mapStateToProps)(ColorTrailsTest);