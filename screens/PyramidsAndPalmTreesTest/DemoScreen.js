import React, { useState } from "react";
import { View, Modal, StyleSheet } from "react-native";

import AppButton from '../../components/Button';
import Text from "../../components/Text";
import colors from "../../config/colors";
import CardSetTest from "../../components/pyramidAndPalmTrees/CardsSetTest";
import { TouchableOpacity } from "react-native-web";
import demoTest from "../../components/pyramidAndPalmTrees/evaluationTests/DemoTest";

function DemoScreen({ onStartPress }) {
  const [startButton, setStartButton] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setmodalMessage] = useState("");
  const [showCross, setShowCross] = useState(false);

  const showTest = () => {
    return (
      <CardSetTest
        cards={demoTest.cards}
        numberOfColumns={demoTest.columns}
        handleOnSelect={handleOnSelect}
      />
    );
  };

  const handleOnSelect = (card) => {
	setModalVisible(true)
    if (card.isCorrect) {
      setStartButton(true);
      setmodalMessage("Correcto, ya puede empezar");
    } else {
      setmodalMessage("Incorrecto, prueba otra opción");
    }
  };

  const onStart = () => {
    setShowCross(true);
    setTimeout(() => {
      setShowCross(false);
      onStartPress();
    }, 3000);
  };

  return !showCross ? (
    <View style={styles.detailsContainer}>
      {showTest()}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modal}>
          <View style={styles.modal.modalView}>
            <Text style={styles.modal.title}>{modalMessage}</Text>
            <View style={styles.modal.buttons}>
              <AppButton color={colors.secondary} title={"Aceptar"} onPress={() => setModalVisible(!modalVisible)}></AppButton>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.navigation}>
        {startButton ? (
          <View style={styles.buttonsContainer}>
            <Text style={styles.text}>
              Ahora aparecerá una cruz en el centro de la pantalla. Por favor,
              preste atención a la cruz.
            </Text>
            <TouchableOpacity style={styles.button} onPress={onStart}>
              <Text style={styles.buttonText}>{"START"}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          ""
        )}
      </View>
    </View>
  ) : (
    <View style={styles.crossView}>
      <Text style={{ color: colors.white, fontSize: "10rem" }}>✕</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    margin: 10,
  },
  navigation: {
    position: "absolute",
    bottom: 0,
    height: 50,
    width: "100%",
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 10,
  },
  button: {
    backgroundColor: colors.button,
    height: 50,
    width: 200,
    borderRadius: 15,
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
    margin: 15,
    fontWeight: "bold",
  },
  crossView: {
    flex: 1,
    backgroundColor: "black",
    padding: "2em",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  text: {
    fontSize: "1.2rem",
    color: "black",
  },
  modal: {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	marginTop: 22,
	modalView: {
	  margin: 20,
	  backgroundColor: 'white',
	  borderRadius: 20,
	  padding: 35,
	  alignItems: 'center',
	  shadowColor: '#000',
	  shadowOffset: {
		width: 0,
		height: 2,
	  },
	  shadowOpacity: 0.25,
	  shadowRadius: 4,
	  elevation: 5,
	},
	title: {
	  fontSize: '1.2rem',
	  fontWeight: 700,
	  marginBottom: 20,
	},
	input: {
	  width: '100%',
	  fontSize: '1rem',
	  lineHeight: '150%',
	  padding: 10,
	  border: 'solid 1px grey',
	  marginBottom: 10,
	},
	buttons: {
	  display: 'flex',
	  flexDirection: 'row',
	  flexWrap: 'wrap',
	},
  },
});

export default DemoScreen;
