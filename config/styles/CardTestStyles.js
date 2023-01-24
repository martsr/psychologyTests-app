import { StyleSheet } from "react-native"

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

  export {CardsConfig}