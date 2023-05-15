import React from 'react';
import {
  Modal,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
} from 'react-native';
import { general,mainPage } from '../../config/styles/GeneralStyles';
import { instructions } from '../../config/styles/BellTestStyles';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../../config/colors';
import AppButton from '../../components/AppButton';

export default class BellTestInstructions extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        visible: true,
        testBellColor: "#000000",
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
    return (
        <Modal transparent={true} animationType="slide" visible={this.state.visible} >
          <View style={instructions.container}>
            <View style={instructions.textContainer}>
              <Text style={instructions.title}>Instrucciones</Text>
              <View style= {{flexDirection: 'row'}}>
              <Text style={instructions.text}>En este test usted deberá encontrar todas las campanas </Text>
              <FontAwesome name={"bell"} color={"#000000"} size={30}/>
              </View>
              <Text style={instructions.text}>A continuación se muestra una representación ilustrativa de la prueba:</Text>
            </View>
            <View style={instructions.tutorialContainer}>
            <Text style={instructions.tutorialTitle}>Presione la campana</Text>
              <View style={instructions.tutorialInteractiveContainer}>
                <TouchableOpacity style={instructions.tutorialItem} onPress={this.testApproved}>
                  <FontAwesome name={"bell"} color={this.state.testBellColor} size={150}/>
                </TouchableOpacity>
                <TouchableOpacity style={instructions.tutorialItem}>
                  <FontAwesome name={"star"} color={"#000000"} size={150}/>
                </TouchableOpacity>
                <TouchableOpacity style={instructions.tutorialItem}>
                  <FontAwesome name={"camera"} color={"#000000"} size={150}/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={instructions.messageContainer}>
              <Text style={instructions.message}>{this.state.showMessage ? "*Seleccione la campana para continuar" : ""}</Text>
            </View>
            <View style={instructions.buttonContainer}>
              {this.state.testApproved ?
                <AppButton style = {instructions.button} title={'Comenzar'} onPress={this.setInvisible}></AppButton>
              :
              <AppButton textColor={colors.primary} style = {instructions.emptyButton} title={'Comenzar'} onPress={this.showValidationMessage}></AppButton>}
            </View>
          </View>
        </Modal>
          );
        }
};