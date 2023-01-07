import { StyleSheet } from "react-native"
const general = StyleSheet.create({
    backgroundStyle: {
        flex:1,
        backgroundColor: '#F6F3F5',
    },
    textStyle:{
        fontSize: 20,
    }
});

const mainPage = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 200,
    marginTop: 25,
    marginLeft: 10,
    borderRadius: 15
  },
  image: {
    width: 50,
    height:50,
    overflow: 'hidden',
    backgroundColor: '000',
    alignItems:'center',
    alignContent: 'center',
    borderRadius: 15,
  },
  logo: {
    width: 390,
    height: 120
  },
  mainStyle:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});

export {general, mainPage}
