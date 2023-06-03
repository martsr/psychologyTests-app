import React from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';

import { CardsConfig } from '../../config/styles/CardTestStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const deltaX = 100 + (150/2) //gap + (width of box /2)
const deltaY = (Dimensions.get('window').height-115-140-45) /2

export default class CardContainer extends React.Component {
    constructor(props){
        super(props)
      }
    pan = new Animated.ValueXY();
    panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            this.pan.setOffset({
            x: this.pan.x._value,
            y: this.pan.y._value
            });
        },
        onPanResponderMove: Animated.event([
            null,
            { dx: this.pan.x, dy: this.pan.y },
        ],{useNativeDriver: false}),
        onPanResponderRelease: () => {
            this.pan.flattenOffset();
        },
        onPanResponderRelease: (e,movement) => {
            if(movement.dx<-100 && movement.dy>5){
                Animated.spring(this.pan, { toValue: { x: -deltaX, y: deltaY },useNativeDriver: false }).start();
                this.props.addEvent(this.props.id,this.props.name,this.props.color,"rabbit")
            }
            else if(movement.dx>100 && movement.dy>5){
                Animated.spring(this.pan, { toValue: { x: deltaX, y: deltaY},useNativeDriver: false }).start();
                this.props.addEvent(this.props.id,this.props.name,this.props.color,"ship")
            }
            else{
                Animated.spring(this.pan, { toValue: { x: 0, y: 0},useNativeDriver: false }).start();
            }
        }
    });
    render(){
        return (
            <Animated.View style={[CardsConfig.optionsContainer,{ transform: [{ translateX: this.pan.x }, { translateY: this.pan.y }]}]} {...this.panResponder.panHandlers}>
                {this.props.name== "rabbit"?
                    <View style={CardsConfig.box}>
                        <MaterialCommunityIcons style={{alignSelf: "center"}} name={this.props.name} size={150} color={this.props.color} />
                    </View>:
                    <View style={CardsConfig.box}>
                        <Fontisto style={{alignSelf: "center"}}name={this.props.name} size={120} color={this.props.color} />
                    </View>}
            </Animated.View>
        );
    }
};