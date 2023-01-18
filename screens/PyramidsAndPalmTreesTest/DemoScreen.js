import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import Text from "../../components/Text";
import colors from "../../config/colors";
import CardSetTest from "../../components/pyramidAndPalmTrees/CardsSetTest";
import { TouchableOpacity } from "react-native-web";
import demoTest from "../../components/pyramidAndPalmTrees/evaluationTests/DemoTest";

function DemoScreen({ onStartPress }) {
  const [startButton, setStartButton] = useState(false);
  const [done, setDone] = useState(false);
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

  const hadleBackButton = () => {
    if (testId > 0) {
      setTestId(testId - 1);
    } else {
      //TODO: disable back button
    }
  };

  const handleOnSelect = (card) => {
    if (card.isCorrect) {
      setStartButton(true);
      alert("CORRECT, YOU CAN START THE TEST");
    } else {
      alert("INCORRECT, TRY ANOTHER");
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
});

export default DemoScreen;
