import { StyleSheet } from "react-native"
import colors from "../colors";

const instructions = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
        marginBottom: 60,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.black,
    },
    text: {
        fontSize: 28,
    },
    tutorialContainer: {
        marginTop: 20,
        paddingHorizontal: 100,
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "#bcbcbc",
        borderWidth: 2,
        borderRadius:15,
        backgroundColor: "#eeeeee"
    },
    tutorialTitle: {
        fontSize: 28,
    },
    tutorialInteractiveContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tutorialItem: {
        paddingHorizontal: 10,
        fontSize: 150
    },
    buttonContainer: {
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 200
    },
    buttonText: {
        fontSize: 30,
        color: colors.white
    },
    buttonIcon: {
        marginLeft: 15,
    },
    emptyButton: {
        width: 200,
        color: colors.primary,
        backgroundColor: 'transparent'
    },
    emptyButtonText: {
        paddingTop: 15,
        paddingBottom: 15,
        color: colors.black,
        fontSize: 30,
    },
    messageContainer: {
        flex: 0.5,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    message: {
        color: "#EE5555",
        fontSize: 28,
    },
    timer: {
        marginTop: 15,
        alignItems: 'flex-end',
        paddingTop: 5,
        paddingBottom: 5
      }
});

export {instructions}