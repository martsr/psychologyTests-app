import React from 'react';
import {
  Modal,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { general,mainPage } from '../../config/styles/GeneralStyles';
import { instructions } from '../../config/styles/BellTestStyles';
import { FontAwesome } from '@expo/vector-icons';
import HanoiObject from '../../components/Hanoi/HanoiObject.js'
import colors from '../../config/colors';

const WIDTH = Math.round(Dimensions.get('window').width);

export default class HanoiTestInstructions extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        visible: true,
        leftTower: [0.06*WIDTH, 0.09*WIDTH, 0.12*WIDTH],
        centerTower: [0, 0, 0],
        rightTower: [0, 0, 0],
        testApproved: false,
        showMessage: false
      }
    }

    testApproved = () => {
      this.setState({testApproved: true, testBellColor: "#0060B0"})
    }

    setInvisible =()=>{
      this.setState({ visible : false});
      this.props.callback();
    }

    showValidationMessage = () => {
      this.setState({showMessage: true});
    }

render(){
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
        }
        else{
          //We need to find where is the last 0, so thats the place where are object should go (queue)
          const newTower = this.state.rightTower
          const lastElementIndex = this.state.rightTower.lastIndexOf(0);
          newTower.splice(lastElementIndex, 1, width)
          this.setState({rightTower: newTower})
        }
        if(this.state.centerTower.lastIndexOf(0) == -1 || this.state.rightTower.lastIndexOf(0) == -1){
          this.stopTimer.current.stop();
          this.setState({visibleFinished: true});
        }
      }
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
    leftObjects = this.state.leftTower.map((w, index) => (
        <HanoiObject 
          key={"l"+w+index} 
          width={w}
          window={WIDTH*0.7} 
          sendElementToNewTower={sendElementToNewTower} 
          removeElementFromOldTower={removeElementFromOldTower}
          towers={this.state}
          id={index}/>
      ));
      centerObjects = this.state.centerTower.map((w, index) => (
        <HanoiObject 
          key={"c"+w+index} 
          width={w}
          window={WIDTH*0.7}  
          sendElementToNewTower={sendElementToNewTower}
          removeElementFromOldTower={removeElementFromOldTower}
          towers={this.state}
          id={index}/>
      ));
      rightObjects = this.state.rightTower.map((w, index) => (
        <HanoiObject 
          key={"r"+w+index} 
          width={w} 
          window={WIDTH*0.7} 
          sendElementToNewTower={sendElementToNewTower}
          removeElementFromOldTower={removeElementFromOldTower}
          towers={this.state}
          id={index}/>
      ));
    return (
        <Modal animationType="slide" visible={this.state.visible} >
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Instrucciones</Text>
              <View>
                <Text style={styles.text}>En este test deberás trasladar la pila azul al otro lado siguiendo ciertas reglas:</Text>
                <Text style={styles.text}>1. Solo se puede mover un disco cada vez</Text>
                <Text style={styles.text}>2. Un disco de mayor tamaño no puede estar sobre uno más pequeño que él mismo.</Text>
                <Text style={styles.text}>3. Solo se puede desplazar el disco que se encuentre arriba en cada region.</Text>
              </View>
            </View>
            <View style={styles.tutorialContainer}>
                <Text style={styles.tutorialTitle}>Presione la campana</Text>
                <View style={styles.tutorialInteractiveContainer}>
                    <View style={[styles.stackedObjects, backgroundColor="red"]}>
                        {leftObjects}
                    </View>
                    <View style={[styles.stackedObjects, backgroundColor="blue"]}>
                        {centerObjects}
                    </View>
                    <View style={[styles.stackedObjects, backgroundColor="green"]}>
                        {rightObjects}
                    </View>
                </View>
            </View>
            <View style={styles.messageContainer}>
              <Text style={styles.message}>{this.state.showMessage ? "*Seleccione la campana para continuar" : ""}</Text>
            </View>
            <View style={styles.buttonContainer}>
              {this.state.testApproved ?
                <TouchableOpacity style = {styles.button} onPress={this.setInvisible}>
                  <Text style={styles.buttonText}>Comenzar test</Text>
                  <FontAwesome style={styles.buttonIcon} name={"forward"} color={"#ffffff"} size={50}/>
                </TouchableOpacity>
              :
              <TouchableOpacity style = {styles.emptyButton} onPress={this.showValidationMessage}>
                <Text style={styles.emptyButtonText}>Comenzar test</Text>
              </TouchableOpacity>}
            </View>
          </View>
        </Modal>
          );
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
        marginBottom: 60,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.black,
    },
    text: {
        fontSize: 28,
    },
    tutorialContainer: {
        marginTop: 20,
        width: WIDTH*0.7,
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "#bcbcbc",
        borderWidth: 2,
        borderRadius:15,
        backgroundColor: "#eeeeee"
    },
    tutorialTitle: {
        fontSize: 28,
    },
    tutorialInteractiveContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    tutorialItem: {
        paddingHorizontal: 10,
        fontSize: 150
    },
    buttonContainer: {
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        flex:1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: colors.button,
        padding: 10
    },
    buttonText: {
        fontSize: 30,
        color: colors.white
    },
    buttonIcon: {
        marginLeft: 15,
    },
    emptyButton: {
        flex:1,
        borderRadius: 15,
        borderColor: colors.button,
        borderWidth: 2,
        boorderStyle: 'solid',
        padding: 10,
    },
    emptyButtonText: {
        paddingTop: 15,
        paddingBottom: 15,
        color: colors.black,
        fontSize: 30,
    },
    messageContainer: {
        flex: 0.5,
        justifyContent: 'end',
        alignItems: 'center'
    },
    message: {
        color: "#EE5555",
        fontSize: 28,
    },
    stackedObjects: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'flex-end'
    }
});