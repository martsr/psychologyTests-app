import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
export default class Timer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            time: 0,
            display: "00:00"
        }
    }
    componentDidMount(){
        this.interval = setInterval(() => {
            this.setState({
                time: this.state.time + 1
            })
            this.formatTime();
        }, 1000);
    }
    stop = () => {
        clearInterval(this.interval);
    }
    reset = () => {
        clearInterval(this.interval);
        this.setState({timer: 0, display: "00:00"})
        this.interval = setInterval(() => {
            this.setState({
                time: this.state.time + 1
            })
            this.formatTime();
        }, 1000);
    }
    
    formatTime() {
        var minutes = Math.floor(this.state.time / 60);
        var seconds = this.state.time % 60;
        if (seconds < 10) {
            if (minutes == 0) {
                this.setState({
                    display: "00:0" + seconds,
                });
            }
            else if (minutes >= 1 && minutes < 10) {
                this.setState({
                    display: "0" + minutes + ":0" + seconds,
                });
            }
            else {
                this.setState({
                    display: minutes + ":0" + seconds,
                });
            }
        }
        else {
            if (minutes == 0) {
                this.setState({
                    display: "00:" + seconds,
                });
            }
            else if (minutes >= 1 && minutes < 10) {
                this.setState({
                    display: "0" + minutes + ":" + seconds,
                });
            }
            else {
                this.setState({
                    display: minutes + ":" + seconds,
                });
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        return (
            <Text style={style.timer}>{this.state.display}</Text>
        )
    }
}

let style = StyleSheet.create({
    timer: {
        color: 'black',
        fontSize: 25,
        backgroundColor: '#dce0dd',
        borderRadius: 15,
        padding: 5,
        width: 100,
        textAlign: 'center'
    }
})