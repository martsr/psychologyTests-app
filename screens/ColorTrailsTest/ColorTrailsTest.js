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
import { connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    interviewer: state.userReducer.interviewer
  }
}

class ColorTrailsTest extends React.Component {
  
  render(){
  return (
    <View style={{alignItems: "center"}}>
      <FontAwesome name="wrench" size={250} color="#CCCCCC" />
      <Text style={general.textStyle}>Pantalla en desarrollo</Text>
      <Text>user: </Text>
      <Text>{this.props.user}</Text>
      <Text>interviewer: </Text>
      <Text>{this.props.interviewer}</Text>
    </View>
    );
  }
};

export default connect(mapStateToProps)(ColorTrailsTest);