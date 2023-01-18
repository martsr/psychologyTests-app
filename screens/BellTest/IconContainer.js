import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const directions = ["0deg","30deg","45deg","135deg"]

export default class IconContainer extends React.Component {
  constructor(props){
    super(props)
  }
  state = {
    iconColor: "#000000",
    direction: directions[Math.floor(Math.random() * directions.length)]}

  pressed = () => {
    var event= ""
    if(this.props.name != "bell"){
      event="mistake"
    }
    if(this.props.name == "bell" && this.state.iconColor == "#000000"){
      this.setState({iconColor: "#FF0000"})
      event="bell"
      console.log("Pressed")
    }
    this.props.addEvent(event)
  }

  render(){
  return (
      <View style={{height: this.props.height, width: this.props.width}}>
        <TouchableOpacity onPress={this.pressed} style={{transform: [{ rotate: this.state.direction }]}}>
          <FontAwesome name={this.props.name} color={this.state.iconColor} size={this.props.width}/>
        </TouchableOpacity>
      </View>
    );
  }
};