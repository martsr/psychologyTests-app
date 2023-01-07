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
      <View>
        <TouchableOpacity onPress={this.pressed} style={{transform: [{ rotate: this.state.direction }]}}>
          <FontAwesome name={this.props.name} size={70} color={this.state.iconColor}/>
        </TouchableOpacity>
      </View>
    );
  }
};