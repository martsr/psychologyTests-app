import React from 'react';
import {View, Image, StyleSheet, Animated, PanResponder, Text} from 'react-native';
import {Dimensions } from "react-native";

export default class HanoiObject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY(),
            opacity: new Animated.Value(1),
        }
        this._val = {x:0, y:0};
        this.state.pan.addListener((value) => this._val = value);
        this.PanResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,

            onPanResponderMove: Animated.event (
                [null, {dx: this.state.pan.x, dy: this.state.pan.y}],
                {useNativeDriver: false}),

            onPanResponderGrant: (e, gesture) => {
                this.state.pan.setOffset({x: this._val.x, y: this._val.y});
                this.state.pan.setValue({x: 0, y: 0})
            },

            onPanResponderRelease: (e, gesture) => {
                if(this.isValid(gesture)){
                    this.removeElementFromOldTower(gesture);
                    this.sendElementToNewTower(gesture);
                }
                else{
                    this.restoreToOriginalPosition();
                }
                this.forceUpdate()
            }
        })
    }
    restoreToOriginalPosition() {
        Animated.spring(
            this.state.pan,
            { toValue: { x: 0, y: 0 }, useNativeDriver: true }
        ).start();
    }

    sendElementToNewTower(gesture) {
        if (gesture.moveX < this.props.window / 3) {
            this.props.sendElementToNewTower('l', this.props.width);
        }
        else if (gesture.moveX >= this.props.window / 3 && gesture.moveX < this.props.window * (2 / 3)) {
            this.props.sendElementToNewTower('c', this.props.width);
        }
        else {
            this.props.sendElementToNewTower('r', this.props.width);
        }
    }

    removeElementFromOldTower(gesture) {
        if (gesture.x0 < this.props.window / 3) {
            this.props.removeElementFromOldTower('l', this.props.width);
        }
        else if (gesture.x0 >= this.props.window / 3 && gesture.x0 < this.props.window * (2 / 3)) {
            this.props.removeElementFromOldTower('c', this.props.width);
        }
        else {
            this.props.removeElementFromOldTower('r', this.props.width);
        }
    }

    isValid(gesture) {
        var isTopOfStack = this.isTopOfStack(gesture);
        var isThinerThanPrevious = this.isThinerThanPreviousElement(gesture);

        return isTopOfStack && isThinerThanPrevious;
    }

    isThinerThanPreviousElement(gesture) {
        var validMove = false;
        const targetLeft = gesture.moveX < this.props.window / 3;
        const targetCenter = gesture.moveX >= this.props.window / 3 && gesture.moveX < this.props.window * (2 / 3);
        const targetRight = gesture.moveX >= this.props.window * (2 / 3);
        var lastElementWidth = 0;

        if (targetLeft) {
            lastElementWidth = this.props.towers.leftTower.find(element => element != 0);
        }
        if (targetCenter) {
            lastElementWidth = this.props.towers.centerTower.find(element => element != 0);
        }
        if (targetRight) {
            lastElementWidth = this.props.towers.rightTower.find(element => element != 0);
        }
        validMove = (lastElementWidth != undefined) ? (lastElementWidth > this.props.width ? true : false) : true;
        return validMove;
    }

    isTopOfStack(gesture) {
        const originLeft = gesture.x0 < this.props.window / 3;
        const originCenter = gesture.x0 >= this.props.window / 3 && gesture.x0 < this.props.window * (2 / 3);
        const originRight = gesture.x0 >= this.props.window * (2 / 3);
        var lastEmptyPosition = 0;
        var elementPosition = 0;
        var validMove = false;
        if (originLeft) {
            lastEmptyPosition = this.props.towers.leftTower.lastIndexOf(0);
            elementPosition = this.props.towers.leftTower.lastIndexOf(this.props.width);
        }
        if (originCenter) {
            lastEmptyPosition = this.props.towers.centerTower.lastIndexOf(0);
            elementPosition = this.props.towers.centerTower.lastIndexOf(this.props.width);
        }
        if (originRight) {
            lastEmptyPosition = this.props.towers.rightTower.lastIndexOf(0);
            elementPosition = this.props.towers.rightTower.lastIndexOf(this.props.width);
        }
        validMove = (elementPosition - lastEmptyPosition == 1) ? true : false;
        return validMove;
    }

    componentWillUnmount(){
        this.setState = (state,callback)=>{
            return;
        };
    }
    render() {
        const panStyle = {
            transform: this.state.pan.getTranslateTransform(),
            opacity: this.state.opacity,
            width: this.props.width,
            height: 50,
            margin: 2
        }
        return (
            <Animated.View {...this.PanResponder.panHandlers} style={panStyle}>
                <View style={style.object}/>
            </Animated.View>
        )
    }
}


let style = StyleSheet.create({
  object: {
      width: '100%',
      height: '100%',
      backgroundColor: 'blue',
      borderRadius: 20
  },
})