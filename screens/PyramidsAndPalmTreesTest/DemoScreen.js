import React, { useEffect, useState } from "react";
import { View, Modal, StyleSheet } from "react-native";

import Text from "../../components/Text";
import colors from "../../config/colors";
import CardSetTest from "../../components/pyramidAndPalmTrees/CardsSetTest";
import { TouchableOpacity } from "react-native";
import { demoTest, resetTests } from "../../components/pyramidAndPalmTrees/evaluationTests/Tests";
import AnswerFeedbackModal from "../../components/AnswerFeedbackModal";

function DemoScreen({ onStartPress }) {
  const [testId, setTestId] = useState(0);
  const [start, setStart] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setmodalMessage] = useState("");
  const [showButton, setShowButton]  = useState(false);
  const [showCross, setShowCross] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    resetTests();
  }, []);

  const showTest = () => {
    return (
      <CardSetTest
        cards={demoTest[testId].cards}
        numberOfColumns={demoTest[testId].columns}
        handleOnSelect={handleOnSelect}
      />
    );
  };

  const handleOnSelect = (card) => {
	  setModalVisible(true)
    setIsCorrect(card.isCorrect)
    const isLastTest = (demoTest.length === (testId + 1))

    if (card.isCorrect) {
      isLastTest? setStart(true): setShowButton(true);
      const modalMessage = isLastTest? "Correcto! Ahora aparecerá una cruz en el centro de la pantalla. Por favor, preste atención a la cruz.": "Correcto!";
      setmodalMessage(modalMessage)
    } else {
      setmodalMessage("Incorrecto, intente nuevamente");
    }
  };
  
  const onNextButton = () => {
    setShowButton(false)
    if( !(demoTest.length === (testId + 1)) ){ //check if you are in the last test of the demo
      setTestId(testId+1)
    }
  }

  const onStart = () => {
    setShowCross(true);
    setTimeout(() => {
      setShowCross(false);
      onStartPress();
    }, 3000);
  };

  const handleModalOnPress = () => {
    setModalVisible(!modalVisible)
    if(start){
      onStart();
    }
  }

  return !showCross ? (
    <View style={styles.detailsContainer}>
      {showTest()}
      <AnswerFeedbackModal
        correctAnswer={isCorrect}
        visible={modalVisible}
        onPressAccept={handleModalOnPress}
        answerText={modalMessage}
      >
      </AnswerFeedbackModal>
      <View style={styles.navigation}>
        { showButton?
        (<View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={onNextButton}>
            <Text style={styles.buttonText}>{"NEXT"}</Text>
          </TouchableOpacity>
        </View>)
        : ''}
      </View>
    </View>
        
  ) : (
    <View style={styles.crossView}>
      <Text style={{ color: colors.white, fontSize: 100 }}>✕</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
  },
  navigation: {
    position: "absolute",
    bottom: 10,
    right: 0,
    height: 50,
    width: 200,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  button: {
    backgroundColor: colors.button,
    height: 50,
    width: 200,
    borderRadius: 15,
    margin: 15,
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
    padding: 2,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  text: {
    fontSize: 1.2,
    color: "black",
  },
});

export default DemoScreen;
