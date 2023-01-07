import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { general } from '../../config/styles/GeneralStyles';
import { FontAwesome } from '@expo/vector-icons';


export default class HanoiTest extends React.Component {
  
  render(){
  return (
    <View style={{alignItems: "center"}}>
      <FontAwesome name="wrench" size={250} color="#CCCCCC" />
      <Text style={general.textStyle}>Pantalla en desarrollo</Text>
    </View>
    );
  }
};