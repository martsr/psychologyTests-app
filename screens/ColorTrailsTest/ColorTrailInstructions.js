import React from 'react';
import {
  Modal,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TextInput
} from 'react-native';
import { general,mainPage } from '../../config/styles/GeneralStyles';
import { instructions } from '../../config/styles/BellTestStyles';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../../config/colors';
import Circle from '../../components/ColorTrails/Circle.js';
import DummyCircle from '../../components/ColorTrails/DummyCircle.js';
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
      <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Instrucciones</Text>
            <Text style={styles.text}>En este test deberas conectar los circulos numerados del 1 al maximo disponible</Text>
            <Text style={styles.text}>Deberas tener en cuenta que tienes que conectar los circulos alternando colores</Text>
          </View>
          <View style={instructions.tutorialContainer}>
          <Text style={styles.title}>Asi se veran los circulos. Puedes presionarlos para probar</Text>
            <View style={instructions.tutorialInteractiveContainer}>
              <DummyCircle 
                color='#ee856f'
                position={{"left": -100, "top": 20}}
                number='1'
              />
              <DummyCircle 
                color='#eeec0b'
                position={{"left": 100, "top": 20}}
                number='2'
              />
            </View>
            <Text style={styles.bottomLine}>No hay problema si te equivocas.</Text>
            <Text style={styles.bottomLine}>Presiona el circulo nuevamente para desactivarlo.</Text>
          </View>
          <View style={instructions.buttonContainer}>
            <AppButton textColor={colors.primary} style = {instructions.emptyButton} title={'Comenzar'} onPress={this.setInvisible}></AppButton>
          </View>
        </View>
      </Modal>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#F6F3F5",
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRigth: 20,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: "80%",
    marginHorizontal: "10%",
    backgroundColor:"#F6F3F5",
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black
  },
  text: {
    fontSize: 18,
    paddingTop: 15
  },
  bottomLine: {
    fontSize: 18,
  },
  textInput: {
    fontSize: 16,
    marginLeft: 75,
    marginRight: 20,
    padding: 8,
    borderRadius: 15,
    borderWidth: 1,
    marginRight: 40,
  }
});