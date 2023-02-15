import React from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
} from 'react-native';

import { CardsConfig, instructions } from '../../config/styles/CardTestStyles';
import { Fontisto, AntDesign, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import CardContainer from './CardContainer';
import { general, mainPage } from '../../config/styles/GeneralStyles';
import colors from '../../config/colors';

function generateCards(){
    const iconsList=['rabbit','ship']
    const colors =["#a95906","#ffffff"]
    const cards=[]
    for (let index = 0; index < 10; index++) {
        const random = Math.floor(Math.random() * iconsList.length);
        const color = colors[Math.floor(Math.random() * 2)]
        cards.push({id:index, name: iconsList[random], color: color})
        //cards.push(<CardContainer key = {index} name={iconsList[random]} color={color}></CardContainer>)
      }
    return cards
}

export default class CardTest extends React.Component {
    state={
        rabbitColor: "#a95906",
        shipColor: "#ffffff",
        evaluation: 'shape',
        cards: [{'id':0,'name':'rabbit','color':'#a95906'},{'id':1,'name':'ship','color':'#ffffff'},{'id':2,'name':'rabbit','color':'#a95906'},{'id':3,'name':'ship','color':'#ffffff'}],
        visible: true,
        mistakes:0,
        catches:0,
        responseModalVisible: false,
        idToDelete: 0,
        lastEvent: "",
        totalEvents:0,
        nextStepVisible: false,
        endVisible: false,
        direction: "135deg",
        startedTutorial: false,
    }

    addEvent=(id,name,color,side)=>{
        if(this.state.evaluation == "color"){
            if(side =="rabbit"){
                this.state.rabbitColor == color ? this.addCatch() : this.addMistake()
            }
            else{
                this.state.shipColor == color ? this.addCatch() : this.addMistake()
            }
        }
        else{
            name == side ? this.addCatch() : this.addMistake()
        }
        this.setState({responseModalVisible: true, idToDelete: id, totalEvents: this.state.totalEvents+1})
        
    }
    addCatch = () => {
        this.setState({catches: this.state.catches + 1, lastEvent: "catch"})
    }
    
    addMistake = () => {
        this.setState({mistakes: this.state.mistakes + 1,lastEvent: "mistake"})
    }

    setInvisible =()=>{
        this.setState({visible: false, cards: generateCards()})
    }

    setNextStepModalInvisible =()=>{
        console.log("entra")
        this.setState({nextStepVisible: false})

    }

    setendInvisible =()=>{
        this.setState({endVisible: false})
        this.props.finishTutorial()
    }

    setResponseModalInvisible =()=>{
        const cardToDelete = this.state.cards.find( item => item.id == this.state.idToDelete)
        if(this.state.lastEvent == "catch"){
            var result = this.state.cards.filter( item=> item.id != this.state.idToDelete);
            const color = ["#a95906","#ffffff"][Math.floor(Math.random() * 2)]
            var anotherColor = ""
            var nextDirection = ""
            if((cardToDelete.name == "rabbit" && this.state.evaluation == "shape") ||(cardToDelete.name= "ship" && this.state.evaluation == "shape")){
                nextDirection = "45deg"
            }
            else{
                nextDirection = "135deg"
            }
            if(color == "#a95906"){
                anotherColor = "#ffffff"
            }
            else{
                anotherColor = "#a95906"
            }
            this.setState({cards: result, responseModalVisible: false, direction: nextDirection});
            if(this.state.catches == 2){
                const newColor= this.state.rabbitColor
                const anotherColor = this.state.shipColor
                this.setState({rabbitColor: anotherColor, shipColor: newColor, evaluation: "color", nextStepVisible: true})
            }
            if(this.state.catches == 4){
                console.log("termino")
                this.setState({endVisible: true})
            }
        }
        else{
            var result = this.state.cards.filter( item=> item.id != this.state.idToDelete);
            const cardToInsert = {id:this.state.idToDelete+10, name: cardToDelete.name, color: cardToDelete.color}
            result = [cardToInsert ].concat(result)
            console.log(result)
            this.setState({cards: result, responseModalVisible: false});
        }
    }

    render(){
        const listado = this.state.cards.map( (item) => <CardContainer key={item.id} id={item.id} name={item.name} color={item.color} addEvent={this.addEvent}/> );
        return (
            <>
            <Modal style={instructions.container} transparent="true" animationType="slide" visible={!this.state.startedTutorial}>
            <View style={instructions.textContainer}>
                <Text style={instructions.title}>Instrucciones</Text>
                <Text style={instructions.text}>En este test usted deberá agrupar las cartas por forma o por color,
                    este criterio de agrupación cambiará en cada prueba. </Text>
                <Text style={instructions.text}>Comencemos agrupando por {this.state.evaluation}.</Text>
            </View>
            <View style={instructions.buttonContainer}>
                <TouchableOpacity style={instructions.emptyButton}>
                    <Text style={instructions.emptyButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={instructions.button} onPress={() => this.setState({ startedTutorial : true })}>
                    <Text style={instructions.buttonText}>Empezar tutorial</Text>
                </TouchableOpacity>
            </View>
            </Modal>
            <Modal transparent="true" visible={this.state.responseModalVisible}>
                <View style={instructions.popupModalContainer}>
                    {this.state.lastEvent == "catch" ?
                        <View style ={instructions.popupModalCorrectContainer}>
                            <Text style={[instructions.buttonText,{alignSelf:"center"}]}>Jugada correcta {this.state.lastEvent}</Text>
                            <View style={{alignSelf:"center"}}>
                                <FontAwesome name="check-circle" size={50} color={colors.homeButton} />
                            </View>
                            <View style={instructions.buttonModalContainer}>
                                <TouchableOpacity style={[instructions.emptyButton,{alignSelf:"center"}]} onPress={this.setResponseModalInvisible}>
                                    <Text style={instructions.emptyButtonText}> Siguiente carta</Text>
                                </TouchableOpacity>
                            </View>
                        </View>:
                        <View style ={instructions.popupModalIncorrectContainer}>
                        <Text style={[instructions.buttonText,{alignSelf:"center"}]}>Jugada incorrecta, intente nuevamente</Text>
                        <View style={{alignSelf:"center"}}>
                            <FontAwesome name="times-circle" size={50} color={colors.danger} />
                        </View>
                        <View style={[instructions.buttonModalContainer,{flexDirection:'row'}]}>
                            <TouchableOpacity style={[instructions.emptyDangerButton,{alignSelf:"center"}]} onPress={this.setResponseModalInvisible}>
                                <FontAwesome name="repeat" size={30} color={"#444444"} />
                                <Text style={instructions.emptyDangerButtonText}> Reintentar</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    }
                </View>
            </Modal>
            <Modal transparent="true" visible={this.state.nextStepVisible}>
                <View style={{flex: 1,flexDirection: 'column',justifyContent: 'center',alignItems: 'center', backgroundColor:"#F6F3F5"}}>
                    <Text style={instructions.text}>Excelente!! ahora vamos a agrupar por color</Text>
                    <TouchableOpacity style={[mainPage.button,{alignSelf:"center"}]} onPress={this.setNextStepModalInvisible}>
                        <FontAwesome name="thumbs-o-up" size={50} color={colors.white} />
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal transparent="true" visible={this.state.endVisible}>
                <View style={{flex: 1,flexDirection: 'column',justifyContent: 'center',alignItems: 'center', backgroundColor:"#F6F3F5"}}>
                    <Text style={instructions.text}>Tutorial terminado</Text>
                    <TouchableOpacity style={[mainPage.button,{alignSelf:"center"}]} onPress={this.setendInvisible}>
                        <FontAwesome name="thumbs-o-up" size={50} color={colors.white} />
                    </TouchableOpacity>
                </View>
            </Modal>
            <View style={[CardsConfig.container, instructions.tutorialContainer]}>
                <View style={{flex:1, alignItems: "center",justifyContent: "center",flexDirection: "row"}}>
                    {listado[0]}
                </View>
                <AntDesign style={{transform: [{ rotate: this.state.direction }]}} name="arrowright" size={50} color="green" />
                <View style={{flex:1, alignItems: "center",justifyContent: "center",flexDirection: "row"}}>
                    <View style={CardsConfig.optionsContainer}>
                        <View style={CardsConfig.box}>
                            <MaterialCommunityIcons style={{alignSelf: "center"}} name="rabbit" size={150} color={this.state.rabbitColor} />
                        </View>
                        <View style={CardsConfig.box}>
                            <Fontisto style={{alignSelf: "center"}}name="ship" size={130} color={this.state.shipColor} />
                        </View>
                    </View>
                </View>
            </View>
            </>
        );
    }
};

 /*<>
        <Modal transparent="true" visible={this.state.responseModalVisible}>
            <View style={{flex: 1,flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}>
                {this.state.lastEvent == "catch" ?
                    <View style ={{backgroundColor: "#b5d7c4", opacity:0.7, width:500, height:200, borderRadius:15}}>
                        <Text style={[general.textStyle,{alignSelf:"center"}]}>Jugada completada {this.state.lastEvent}</Text>
                        <View style={{alignSelf:"center"}}>
                            <FontAwesome name="check-circle" size={50} color="#4b9b7f" />
                        </View>
                        <TouchableOpacity style={[mainPage.button,{alignSelf:"center"}]} onPress={this.setResponseModalInvisible}>
                            <Text style={general.textStyle}> Siguiente carta</Text>
                        </TouchableOpacity>
                    </View>:
                    <View style ={{backgroundColor: "#dab89d", opacity:0.7, width:500, height:200, borderRadius:15}}>
                    <Text style={[general.textStyle,{alignSelf:"center"}]}>Jugada completada {this.state.lastEvent}</Text>
                    <View style={{alignSelf:"center"}}>
                        <FontAwesome name="times-circle" size={50} color="#e04d44" />
                    </View>
                    <TouchableOpacity style={[mainPage.button,{alignSelf:"center"}]} onPress={this.setResponseModalInvisible}>
                        <Text style={general.textStyle}> Siguiente carta</Text>
                    </TouchableOpacity>
                    </View>
                }
            </View>
        </Modal>
        </>*/