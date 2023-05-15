import React from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert
} from 'react-native';
import { general } from '../../config/styles/GeneralStyles';
import { FontAwesome } from '@expo/vector-icons';
import Timer from '../../components/Hanoi/Timer.js';
import HanoiObject from '../../components/Hanoi/HanoiObject.js'
import {Dimensions } from "react-native";
import ReturnHomeComponent from '../../components/ReturnHomeComponent'
import { connect } from 'react-redux';
import reactDom from 'react-dom';
import DatabaseService from '../../services/DatabaseService';
import AppButton from '../../components/AppButton';

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    interviewer: state.userReducer.interviewer
  }
}

const WIDTH = Math.round(Dimensions.get('window').width);
class HanoiTest extends React.Component {
  
  constructor(props){
    super(props);
    this.stopTimer = React.createRef();
    this.validMovements = 0;
    this.invalidMovements = 0;
    this.state = {
        leftTower: [0.05*WIDTH, 0.08*WIDTH, 0.15*WIDTH, 0.23*WIDTH, 0.3*WIDTH],
        centerTower: [0, 0, 0, 0, 0],
        rightTower: [0, 0, 0, 0, 0],
        visibleFinished: false,
        instructionOneVisible: true,
        instructionTwoVisible: false,
        instructionThreeVisible: false,
        tutorial: true,
        timerVisible: false
    }
  }
hideComponent = () => {
  this.setState({ instructionOneVisible : false, instructionTwoVisible: true});
}
endTutorial = () => {
  this.setState({ 
    leftTower: [0.05*WIDTH, 0.08*WIDTH, 0.15*WIDTH, 0.23*WIDTH, 0.3*WIDTH],
    centerTower: [0, 0, 0, 0, 0],
    rightTower: [0, 0, 0, 0, 0],
    tutorial : false, 
    instructionThreeVisible: false,
    timerVisible: true});
}
render(){
    const stopTimer = false;
    const sendElementToNewTower = (tower, width) => {
      if(tower == 'l'){
        //If element width is bigger than the last in the stack, return to original position
        //We need to find where is the last 0, so thats the place where are object should go (queue)
        const newTower = this.state.leftTower
        const lastElementIndex = this.state.leftTower.lastIndexOf(0);
        newTower.splice(lastElementIndex, 1, width)
        this.setState({leftTower: newTower})
        this.forceUpdate();
      }
      else if(tower == 'c'){
        //We need to find where is the last 0, so thats the place where are object should go (queue)
        const newTower = this.state.centerTower
        const lastElementIndex = this.state.centerTower.lastIndexOf(0);
        newTower.splice(lastElementIndex, 1, width)
        this.setState({centerTower: newTower})
        if(this.state.tutorial == true){
          this.setState({instructionTwoVisible: false, instructionThreeVisible: true})
        }
      }
      else{
        //We need to find where is the last 0, so thats the place where are object should go (queue)
        const newTower = this.state.rightTower
        const lastElementIndex = this.state.rightTower.lastIndexOf(0);
        newTower.splice(lastElementIndex, 1, width)
        this.setState({rightTower: newTower})
        if(this.state.tutorial == true){
          this.setState({instructionTwoVisible: false, instructionThreeVisible: true})
        }
      }
      if(this.state.centerTower.lastIndexOf(0) == -1 || this.state.rightTower.lastIndexOf(0) == -1){
        var time = this.stopTimer.current.state.time;
        this.stopTimer.current.stop();
        this.setState({visibleFinished: true});
        results = [{
          "validMovements": this.validMovements,
          "invalidMovements": this.invalidMovements,
          "timeElapsed": time
        }]
        DatabaseService.instance().saveHanoiTestResult(this.props.user, this.props.interviewer, results);
      }
    }
    console.log(this.props.user);
    console.log(this.props.interviewer);
    const removeElementFromOldTower = (tower, width) => {
      if(tower == 'l'){
        //We need to find where is the element to be removed
        const newTower = this.state.leftTower
        const lastElementIndex = this.state.leftTower.indexOf(width);
        newTower.splice(lastElementIndex, 1, 0)
        this.setState({leftTower: newTower})
      }
      else if(tower == 'c'){
        //We need to find where is the element to be removed
        const newTower = this.state.centerTower
        const lastElementIndex = this.state.centerTower.lastIndexOf(width);
        newTower.splice(lastElementIndex, 1, 0)
        this.setState({centerTower: newTower})
      }
      else{
        //We need to find where is the element to be removed
        const newTower = this.state.rightTower
        const lastElementIndex = this.state.rightTower.lastIndexOf(width);
        newTower.splice(lastElementIndex, 1, 0)
        this.setState({rightTower: newTower})
      }
    }
    const increaseValidMovement = () => {
      this.validMovements++;
    }
    const increaseInvalidMovement = () => {
      this.invalidMovements++;
    }
    leftObjects = this.state.leftTower.map((w, index) => (
      <HanoiObject 
        key={"l"+w+index} 
        width={w}
        window={WIDTH} 
        sendElementToNewTower={sendElementToNewTower}
        increaseValidMovement={increaseValidMovement}
        increaseInvalidMovement={increaseInvalidMovement} 
        removeElementFromOldTower={removeElementFromOldTower}
        towers={this.state}
        id={index}/>
    ));
    centerObjects = this.state.centerTower.map((w, index) => (
      <HanoiObject 
        key={"c"+w+index} 
        width={w} 
        sendElementToNewTower={sendElementToNewTower}
        increaseValidMovement={increaseValidMovement}
        increaseInvalidMovement={increaseInvalidMovement} 
        window={WIDTH}
        removeElementFromOldTower={removeElementFromOldTower}
        towers={this.state}
        id={index}/>
    ));
    rightObjects = this.state.rightTower.map((w, index) => (
      <HanoiObject 
        key={"r"+w+index} 
        width={w}
        window={WIDTH} 
        sendElementToNewTower={sendElementToNewTower}
        increaseValidMovement={increaseValidMovement}
        increaseInvalidMovement={increaseInvalidMovement} 
        removeElementFromOldTower={removeElementFromOldTower}
        towers={this.state}
        id={index}/>
    ));
  
    return (
        <SafeAreaView style={styles.container}>
            {this.state.instructionOneVisible? (<View style={styles.textContainer}>
              <Text style={styles.title}>Instrucciones</Text>
              <View>
                <Text style={styles.text}>En este test deberás trasladar la pila azul al otro lado siguiendo ciertas reglas:</Text>
                <Text style={styles.text}>1. Solo se puede mover un disco cada vez</Text>
                <Text style={styles.text}>2. Un disco de mayor tamaño no puede estar sobre uno más pequeño que él mismo.</Text>
                <Text style={styles.text}>3. Solo se puede desplazar el disco que se encuentre arriba en cada region.</Text>
                <AppButton onPress={this.hideComponent} title="Entendido" style={{width: 200, marginTop: 30, marginLeft: 75}}></AppButton>
              </View>
            </View>): null}
            {this.state.instructionTwoVisible? (<View style={styles.textContainer}>
              <Text style={styles.title}>¡Intentemos!</Text>
              <View>
                <Text style={styles.text}>Traslada la pieza ubicada en el extremo superior de la pila hacia alguna de las pilas vacias</Text>
              </View>
            </View>): null}
            {this.state.instructionThreeVisible? (<View style={styles.textContainer}>
              <Text style={styles.title}>¡Excelente!</Text>
              <View>
                <Text style={styles.text}>Es ahora tu turno de trasladar toda la pila hacia otra de las zonas</Text>
                <Text style={styles.text}>¡No existe una sola solucion!</Text>
                <AppButton onPress={this.endTutorial} title="Comenzar" style={{width: 200, marginTop: 30, marginLeft: 75}}></AppButton>
              </View>
            </View>): null}

            <Modal animationType="slide" visible={this.state.visibleFinished}>
              <ReturnHomeComponent navigation={this.props.navigation}/>
            </Modal>
            <View style={styles.timer}>
              {this.state.timerVisible? <Timer ref={this.stopTimer}/>: null}
            </View>
            <View style={styles.main}>
              <View style={styles.stackedObjects}>
                  {leftObjects}
              </View>
              <View style={styles.stackedObjects}>
                  {centerObjects}
              </View>
              <View style={styles.stackedObjects}>
                  {rightObjects}
              </View>
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
  main:{
    flex: 1,
    flexDirection: 'row'
  },
  stackedObjects: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'flex-end'
  },
  timer: {
    marginTop: 15,
    alignItems: 'flex-end',
    paddingTop: 5,
    paddingBottom: 5
  },
  textContainer: {
    position: "absolute",
    flex: 1,
    zIndex : 1,
    elevation: 1
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 75,
    marginVertical: 30
  },
  text: {
    fontSize: 24,
    marginLeft: 75
  },
  button: {
    marginTop: 20,
    flex:1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: "grey",
    padding: 10,
    width: 200
  }
});
export default connect(mapStateToProps)(HanoiTest);