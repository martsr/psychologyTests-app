import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import colors from '../config/colors';

export default class FinishTestComponent extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <>
            <TouchableOpacity style={styles.button} onPress={this.props.onPress()}>
                <Text style={styles.text}>Terminar</Text>
            </TouchableOpacity>
            </>
        )
    }
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: "transparent",
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      width: 200,
      borderColor: colors.primary,
      borderWidth: 2,
    },
    text: {
      fontSize: 16,
      color: colors.primary,
      textTransform: "uppercase",
      fontWeight: "500",
    },
  });