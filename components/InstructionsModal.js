import { 
    View,
    Modal,
    StyleSheet,
    Text,
} from 'react-native';

import AppButton from './AppButton';
import colors from '../config/colors'

const InstructionsModal = ({instructions='', conditions='', visible, onPressAccept, onPressCancel}) => { 


    return  <Modal style={styles.container} transparent="true" animationType="slide" visible={visible}>
        <View style={styles.textContainer}>
            <Text style={styles.title}>Instrucciones</Text>
            <Text style={styles.text}>{instructions}</Text>
            <Text style={styles.text}>{conditions}</Text>
        </View>
        <View style={styles.buttonContainer}>
            <AppButton title={'Cancelar'} textColor={colors.primary} style={styles.emptyButton} onPress={onPressCancel}></AppButton>
            <AppButton title={'Empezar Tutorial'} style={styles.button} onPress={onPressAccept}></AppButton>
        </View>
    </Modal>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#F6F3F5",
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 60,
        width: "80%",
        marginHorizontal: "10%",
        backgroundColor:"#F6F3F5",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.black
    },
    text: {
        fontSize: 28,
        paddingTop: 15
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#F6F3F5",
        width: "80%",
        marginHorizontal: "10%"
    },
    button: {
        width: 200,
        marginHorizontal: 20
    },
    emptyButton: {
        width: 200,
        backgroundColor: 'transparent',
        marginHorizontal: 20
    }
});

export default InstructionsModal;