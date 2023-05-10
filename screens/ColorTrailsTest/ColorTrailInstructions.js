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
import Circle from '../../components/ColorTrails/Circle.js';
import AppButton from '../../components/AppButton';

export default class ColorTrailInstructions extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        visible: true,
      }
    }
    setInvisible =()=>{
      this.setState({ visible : false});
    }

render(){
    return (
      <Modal animationType="slide" visible={this.state.visible} >
      <View style={instructions.container}>
          <View style={instructions.textContainer}>
            <Text style={instructions.title}>Instrucciones</Text>
            <Text style={instructions.text}>En este test deberas conectar los circulos numerados del 1 al maximo disponible</Text>
            <Text style={instructions.text}>Deberas tener en cuenta que tienes que conectar los circulos alternando colores</Text>
          </View>
          <View style={instructions.tutorialContainer}>
          <Text style={instructions.tutorialTitle}>Asi se veran los circulos. Puedes presionarlos para probar</Text>
            <View style={instructions.tutorialInteractiveContainer}>
              <Circle 
                color='#ee856f'
                position={{"left": -100, "top": 50}}
                number='1'
              />
              <Circle 
                color='#eeec0b'
                position={{"left": 100, "top": 50}}
                number='2'
              />
            </View>
            <Text style={instructions.tutorialTitle}>No hay problema si te equivocas</Text>
            <Text style={instructions.tutorialTitle}>Presiona el circulo nuevamente para desactivarlo</Text>
          </View>
          <View style={instructions.buttonContainer}>
            <AppButton textColor={colors.primary} style = {instructions.emptyButton} title={'Comenzar'} onPress={this.setInvisible}></AppButton>
          </View>
        </View>
      </Modal>
    );
  }
};