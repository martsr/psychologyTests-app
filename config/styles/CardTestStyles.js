import { StyleSheet } from "react-native"
import colors from "../colors";

const CardsConfig = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    optionsContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap:200
    },
    box: {
      height: 150,
      width: 150,
      backgroundColor: "#ffd966",
      // backgroundColor: "#ffe599",
      borderRadius: 10,
      borderColor: "#a95906",
      borderWidth: 5,
    }
  });

  const instructions = StyleSheet.create({
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
        backgroundColor:"#F6F3F5"
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
    buttonIcon: {
        marginLeft: 15,
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

export {CardsConfig, instructions}
