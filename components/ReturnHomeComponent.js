import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { general,mainPage } from '../config/styles/GeneralStyles';
import { styles } from '../config/styles/ReturnHomeComponentStyles';
import { Entypo } from '@expo/vector-icons';
import colors from '../config/colors';


export default class ReturnHomeComponent extends React.Component {
    constructor(props){
      super(props);
    }

render(){
    return (
        <View style={[general.backgroundStyle, styles.container]}>
            <Text style={styles.text}>El juego ha finalizado. Por favor volver a la pantalla de inicio.</Text>
            <TouchableOpacity style={[mainPage.button,{flexDirection:"row"}]} onPress={() => this.props.navigation.navigate('HomeScreen')}>
                <Entypo name="home" size={60} color={colors.white} />
                <Text style={general.textStyle}> Volver a Inicio</Text>
            </TouchableOpacity>
        </View>
    );
    }
};