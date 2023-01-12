import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { FontAwesome, MaterialCommunityIcons  } from '@expo/vector-icons';

import colors from '../../config/colors';
import { general, mainPage } from '../../config/styles/GeneralStyles';

export default class HomeScreen extends React.Component {
  
  render(){
  return (
    <SafeAreaView styles={mainPage.mainStyle}>
      <View style={[mainPage.mainStyle,{marginTop:20}]}>
        <Image style={mainPage.logo} source={require('../../assets/ucaLogo.png')}/>
      </View>
      <View style={{margin:50,marginTop:20,flex:1,justifyContent: "center", alignItems: "center",flexDirection: 'row',flexWrap: "wrap"}}>
        <TouchableOpacity style={[mainPage.button,{flexDirection:"row"}]}  onPress={() => this.props.navigation.navigate('PyramidAndPalmTreesTest')} delayPressIn={0}>
        <MaterialCommunityIcons name="pyramid" size={40} color={"#444444"}/>
          <Text style={general.textStyle}>Pyramid Test</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[mainPage.button,{flexDirection:"row"}]} onPress={() => this.props.navigation.navigate('BellTest')} delayPressIn={0}>
          <FontAwesome name="bell" size={40} color={"#444444"}/>
          <Text style={general.textStyle}>Bell Test</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[mainPage.button,{flexDirection:"row"}]} onPress={() => this.props.navigation.navigate('HanoiTest')} delayPressIn={0}>
          <FontAwesome name="image" size={40} color={"#444444"}/>
          <Text style={general.textStyle}>Hanoi Test</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[mainPage.button,{flexDirection:"row"}]} onPress={() => this.props.navigation.navigate('CorsiTest')} delayPressIn={0}>
          <FontAwesome name="image" size={40} color={"#444444"}/>
          <Text style={general.textStyle}>Corsi Test</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[mainPage.button,{flexDirection:"row"}]} onPress={() => this.props.navigation.navigate('CamelTest')} delayPressIn={0}>
          <FontAwesome name="image" size={40} color={"#444444"}/>
          <Text style={general.textStyle}>Camel Test</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[mainPage.button,{flexDirection:"row"}]} onPress={() => this.props.navigation.navigate('CardTest')} delayPressIn={0}>
        <MaterialCommunityIcons name="cards" size={40} color={"#444444"} />
          <Text style={general.textStyle}>Card Test</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[mainPage.button,{flexDirection:"row"}]} onPress={() => this.props.navigation.navigate('ColorTrailsTest')} delayPressIn={0}>
          <FontAwesome name="image" size={40} color={"#444444"}/>
          <Text style={general.textStyle}>Color Trails Test</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    );
  }
};