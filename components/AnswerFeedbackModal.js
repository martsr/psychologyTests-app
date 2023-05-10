

import { 
    View,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import colors from '../config/colors'

const AnswerFeedbackModal = ({correctAnswer , visible, onPressAccept, answerText}) => { 
    return <Modal transparent={true} visible={visible}>
        <View style={styles.modal}>
            { correctAnswer ?
                <View style ={{...styles.answerModalContainer, backgroundColor: "#6dbeff" }}>
                    <Text style={{...styles.buttonText,alignSelf:"center"}}>{answerText ?? "Opción correcta"}</Text>
                    <View style={{alignSelf:"center", margin:10}}>
                        <FontAwesome name="check-circle" size={50} color={colors.homeButton} />
                    </View>
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity style={ {...styles.emptyButton, alignSelf:"center"}} onPress={onPressAccept}>
                            <Text style={styles.emptyButtonText}> Continuar </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                :
                <View style ={{...styles.answerModalContainer, backgroundColor: "#ff8787" }}>
                    <Text style={{...styles.buttonText, alignSelf:"center"}}>{answerText ?? "Incorrecto, intente nuevamente"}</Text>
                    <View style={{alignSelf:"center", margin:10}}>
                        <FontAwesome name="times-circle" size={50} color={colors.danger} />
                    </View>
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity style={{...styles.emptyButton, borderColor: colors.danger, alignSelf:"center"}} onPress={onPressAccept}>
                            <FontAwesome name="repeat" size={25} color={"#444444"} />
                            <Text style={styles.emptyDangerButtonText}> Reintentar </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    </Modal>
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
    answerModalContainer: {
      opacity:0.9, 
      minWidth:300, 
      maxWidth:700,
      minHeight:200,
      borderRadius:15,
      marginBottom: 15,
      height: 220
    },
    modalButtonContainer: {
      flex: 1,
      flexDirection: 'row',
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
