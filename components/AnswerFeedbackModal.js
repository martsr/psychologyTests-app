

import { 
    View,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import colors from '../config/colors'

const AnswerFeedbackModal = ({correctAnswer , visible, onPressAccept, correctAnswerText="Jugada correcta", incorrectAnswerText="Incorrecto, intente nuevamente"}) => { 

    return <Modal transparent="true" visible={visible}>
        <View style={styles.popupModalContainer}>
            { correctAnswer ?
                <View style ={styles.popupModalCorrectContainer}>
                    <Text style={[styles.buttonText,{alignSelf:"center"}]}>{correctAnswerText}</Text>
                    <View style={{alignSelf:"center"}}>
                        <FontAwesome name="check-circle" size={50} color={colors.homeButton} />
                    </View>
                    <View style={styles.buttonModalContainer}>
                        <TouchableOpacity style={ {...styles.emptyButton, alignSelf:"center"}} onPress={onPressAccept}>
                            <Text style={styles.emptyButtonText}> Continuar </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                :
                <View style ={styles.popupModalIncorrectContainer}>
                <Text style={{...styles.buttonText, alignSelf:"center"}}>{incorrectAnswerText}</Text>
                <View style={{alignSelf:"center"}}>
                    <FontAwesome name="times-circle" size={50} color={colors.danger} />
                </View>
                <View style={[styles.buttonModalContainer,{flexDirection:'row'}]}>
                    <TouchableOpacity style={[styles.emptyDangerButton,{alignSelf:"center"}]} onPress={onPressAccept}>
                        <FontAwesome name="repeat" size={30} color={"#444444"} />
                        <Text style={styles.emptyDangerButtonText}> Reintentar</Text>
                    </TouchableOpacity>
                </View>
                </View>
            }
        </View>
    </Modal>
}

const styles = StyleSheet.create({
    button: {
        flex:1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: colors.button,
        padding: 8,
        width: "80%",
        marginHorizontal: "10%"
    },
    buttonText: {
        fontSize: 25,
        color: colors.white,
        paddingVertical: 10,
    },
    emptyButton: {
        flex:1,
        borderRadius: 20,
        borderColor: colors.button,
        borderWidth: 4,
        boorderStyle: 'solid',
        padding: 8,
        backgroundColor: colors.white,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        width: "80%",
        marginHorizontal: "10%"
    },
    emptyButtonText: {
        paddingVertical: 10,
        color: "#444444",
        fontSize: 25,
    },
    tutorialContainer: {
      marginTop: 60
    },
    popupModalContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    popupModalCorrectContainer: {
      backgroundColor: "#6dbeff", 
      opacity:0.9, 
      width:500, 
      height:200, 
      borderRadius:15
    },
    buttonModalContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: "80%",
      marginHorizontal: "10%"
  },
  popupModalIncorrectContainer: {
    backgroundColor: "#ff8787", 
    opacity:0.9, 
    width:500, 
    height:200, 
    borderRadius:15
  },
  emptyDangerButton: {
    flex:1,
    borderRadius: 20,
    borderColor: colors.danger,
    borderWidth: 4,
    boorderStyle: 'solid',
    padding: 8,
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    width: "80%",
    marginHorizontal: "10%"
  },
  emptyDangerButtonText: {
    paddingVertical: 10,
    color: "#444444",
    fontSize: 25,
  }
});

export default AnswerFeedbackModal;