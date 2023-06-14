import React, { useEffect, useState } from "react";
import { Modal, View, StyleSheet } from "react-native";

import Text from "../../components/Text";
import colors from "../../config/colors";
import DemoScreen from "./DemoScreen";
import CardSetTest from "../../components/pyramidAndPalmTrees/CardsSetTest";
import { TouchableOpacity } from "react-native";
import { tests } from "../../components/pyramidAndPalmTrees/evaluationTests/Tests";
import InstructionsModal from "../../components/InstructionsModal";
import DatabaseService from '../../services/DatabaseService';
import FinishTestComponent from "../../components/returnButton";
import ReturnHomeComponent from "../../components/ReturnHomeComponent";

function PyramidAndPalmTreesTest({navigation, route}) {
  const [testId, setTestId] = useState(0);
  // const [backButtonDisable, setbackButtonDisable] = useState(false);
  const [nextButtonDisable, setNextButtonDisable] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [start, setStart] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [testResults, setTestResults] = useState([])
  const [testCompleted, setTestCompleted] = useState(false)
  //TODO: enable and disable back and next buttons
  const {patientNumber, interviewerNumber} = route.params;

  /**
   * handleNextButton setTestResults async effect
   */
  useEffect( ()=> {
    if( (testResults.length) == tests.length ){ //check if you were in the last test
      // setTestCompleted(true)
      DatabaseService.instance().savePyramidsAndPalmtreesTestResult(patientNumber, interviewerNumber, testResults)
        .then(() => {navigation.navigate('HomeScreen')})
    } 
    // testResults.forEach(test => console.log(testResults.indexOf(test)," (",tests.length - 1, "): " ,test))
  }, [testResults])

  const showTest = ()=> {
    return(
      <CardSetTest
        cards={tests[testId].cards}
        numberOfColumns={tests[testId].columns}
        handleOnSelect={handleOnSelect}
      />
    )
  }

  const handleNextButton = () => {
    setNextButtonDisable(true)
    setTestResults([...testResults, tests[testId].results])
    setStartTime(Date.now())
    if( (testId + 1) < tests.length) { //check you are not in the last test
      setTestId(testId+1)
    }
  }

  const endTest = () => {
    DatabaseService.instance().savePyramidsAndPalmtreesTestResult(patientNumber, interviewerNumber, testResults)
      .then(() => {setTestCompleted(true)})
  }

  // const hadleBackButton = () =>{
  //   if( testId > 0){
  //     setTestId(testId-1)
  //   } else {
  //     //TODO: disable back button
  //   }
  // }

  const handleOnSelect = (card) =>{
    const now = Date.now()
    const totalTimeSpend = (now - startTime)
    setNextButtonDisable(false)

    tests[testId].results = {testName: tests[testId].name, timeSpend: totalTimeSpend, isCorrect: card.isCorrect, isAnimated: tests[testId].isAnimated}
    // console.log("TEST NUM "+ testId + ": ", tests[testId].results )
  }

  const initiateTest = () =>{
    setStart(true);
    setStartTime(Date.now())
  }

  const navigateToHomeScreen = () => {
    navigation.navigate('HomeScreen');
  }

  const isTheLastTest = ()=> (tests.length === testId + 1)
  
  return ( start
    ? <View style={styles.detailsContainer}>
        <View style={styles.exitButtonContainer}>
          <FinishTestComponent onPress={endTest}></FinishTestComponent>
          {/* <TouchableOpacity style={styles.exitButton} onPress={endTest}><Text style={styles.exitButtonText}>save and exit</Text></TouchableOpacity> */}
        </View>
          {showTest()}
        <Modal animationType="slide" visible={testCompleted}>
          <ReturnHomeComponent navigation={navigation}/>
        </Modal>
        <View style={styles.navigation}>
          <View style={styles.buttonsContainer}>
            {/* {(testId > 0) && <TouchableOpacity style={styles.button} Text={"BACK"} onPress={hadleBackButton} disabled={backButtonDisable}>
                <Text style={styles.buttonText}>BACK</Text>
              </TouchableOpacity>
            } */}
            {!nextButtonDisable? <TouchableOpacity style={styles.button} onPress={handleNextButton}>
              <Text style={styles.buttonText}>{isTheLastTest()? 'FINISH':'NEXT'}</Text>
            </TouchableOpacity> : null}
          </View>
        </View>
      </View>
    : <>
        <InstructionsModal
          instructions={"En la parte superior de la pantalla aparecerá una figura. Deberá seleccionar una de las cuatro imágenes que aparecen en la parte inferior de la pantalla y que comparta alguna relación."}
          onPressAccept={ () => setShowInstructions(!showInstructions)}
          visible={showInstructions}
          onPressCancel={navigateToHomeScreen}
        />
        <DemoScreen onStartPress={() => initiateTest()}/>
      </>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
  },
  navigation: {
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 50,
    width: 200,
  },
  buttonsContainer:{
    flexDirection: 'row',
    justifyContent:"flex-end",
  },
  button: {
    backgroundColor: colors.button,
    height: 50,
    width: 200,
    borderRadius: 15,
  },
  buttonText: {
    textAlign: "center",
    margin:12,
    fontWeight:"bold",
    flex: 1,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
  exitButtonContainer: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 1,
  },
  exitButton: {
    backgroundColor: colors.danger,
    height: 25,
    width: 70,
    borderColor: colors.black,
    borderRadius: 15,
  },
  exitButtonText: {
    textAlign: "center",
    margin: 5,
    fontSize: 10,
  },
});

export default PyramidAndPalmTreesTest;
