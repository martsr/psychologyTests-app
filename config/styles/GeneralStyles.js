import { StyleSheet } from "react-native"

import colors from "../colors";

const general = StyleSheet.create({
    backgroundStyle: {
        flex:1,
        backgroundColor: '#F6F3F5',
    },
    textStyle:{
        fontSize: 20,
        marginLeft: 15,
        color: colors.white,
    }
});

const mainPage = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.homeButton,
    color: colors.white,
    paddingHorizontal: 25,
    height: 100,
    width: '30%',
    marginBottom: 30,
    marginLeft: 30,
    borderRadius: 15,
    overflow: "hidden"
  },
  image: {
    width: 40,
    height:40,
    overflow: 'hidden',
    backgroundColor: '#000',
    alignItems:'center',
    alignContent: 'center',
    borderRadius: 15,
  },
  logo: {
    width: 390,
    height: 120
  },
});

export {general, mainPage}
