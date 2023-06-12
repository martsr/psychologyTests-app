import React from 'react';
import {View, Image, StyleSheet, Animated, PanResponder, Text, TouchableOpacity} from 'react-native';
import {Dimensions } from "react-native";

export default class Circle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pressed: false
        }
    }
    onPressButton(){
        this.setState({pressed: !this.state.pressed});
        this.props.valuesFromCircle(this.props.color, this.props.number);
    }
    shouldComponentUpdate(nextProps, nextState){
        if(nextState.pressed != this.state.pressed){
            return true;
        }
        return false;
    }
    render() {
        return (
            <TouchableOpacity
                style={this.state.pressed == false? 
                    style(this.props.color, 1, this.props.position, this.props.number).object: 
                    style(this.props.color, 0.5, this.props.position, this.props.number).object }
                onPress={()=> this.onPressButton()}
            >
                <Text style={style(this.props.color, 1, this.props.position, this.props.number).number}>{this.props.number}</Text>
            </TouchableOpacity>
        )
    }
}
export const style = (color, opacity, position, number) => StyleSheet.create({
  object: {
      width: 50,
      height: 50,
      backgroundColor: color,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'black',
      borderWidth: 1,
      opacity: opacity,
      top: position.top - 50*(number-1),
      left: position.left
  },
  number: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
  }
})