import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';

import colors from '../config/colors';

export default class HomeScreen extends React.Component {
  
  render(){
  return (
      <SafeAreaView style={styles.main}>
          <View style={styles.main}>
          <Image style={styles.logo} source={require('../assets/ucaLogo.png')}/>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('PyramidAndPalmTreesTest')} delayPressIn={0}>
              <View style={styles.button}>
                <Image style={styles.image} source={require('../assets/PyramidsAndPalmTreesTestIcon.png')}/>
              </View>
          </TouchableOpacity>
          </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.homeButton,
    borderRadius: 15,
    height: 110,
    width: 155,
    marginTop: 25,
  },
  logo: {
    width: 390,
    height: 120
  },
  main:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 100
  },
  image: {
    width: 155,
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '000',
    alignItems:'center',
    alignContent: 'center',
    borderRadius: 15,
  },
});

