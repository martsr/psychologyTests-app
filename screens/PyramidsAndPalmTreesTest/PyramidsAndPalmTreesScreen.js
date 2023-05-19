import React, { useEffect, useState } from "react";
import { Modal, View, StyleSheet } from "react-native";

import Text from "../../components/Text";
import colors from "../../config/colors";
import DemoScreen from "./DemoScreen";
import CardSetTest from "../../components/pyramidAndPalmTrees/CardsSetTest";
import { TouchableOpacity } from "react-native";
import { tests } from "../../components/pyramidAndPalmTrees/evaluationTests/Tests";
import InstructionsModal from "../../components/InstructionsModal";
import ReturnHomeComponent from "../../components/ReturnHomeComponent";
import DatabaseService from '../../services/DatabaseService';

function PyramidAndPalmTreesTest({navigation, route}) {
  const [testId, setTestId] = useState(0);
  // const [backButtonDisable, setbackButtonDisable] = useState(false);
  const [nextButtonDisable, setNextButtonDisable] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [start, setStart] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [testCompleted, setTestCompleted] = useState(false)
  const [testResults, setTestResults] = useState([])
  const [testsExercies, setTestsExercies] = useState(tests)
  //TODO: enable and disable back and next buttons
  const {patientNumber, interviewerNumber} = route.params;

  const showTest = ()=> {
    return(
      <CardSetTest
        cards={tests[testId].cards}
        numberOfColumns={tests[testId].columns}
        handleOnSelect={handleOnSelect}
      />
    )
  }

  const handleNextButton = () =>{
    setNextButtonDisable(true)
    console.log("## # ADDING RESULT: ", tests[testId].results)
    setTestResults([...testResults, tests[testId].results])
    
    testResults.forEach(test => console.log(testResults.indexOf(test)," (",tests.length - 1, "): " ,test))
    
    if( tests.length === (testId + 1) ){ //check if you are in the last test
      setTestCompleted(true)
      DatabaseService.instance().savePyramidsAndPalmtreesTestResult(patientNumber, interviewerNumber, testResults)
        .then(() => alert('Datos guardados'))
    } else {
      setTestId(testId+1)
      setStartTime(Date.now())
    }
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

  const isTheLastTest = ()=> (tests.length === testId + 1)
  
  return ( start
    ? <View style={styles.detailsContainer}>
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
          instructions={"En la parte superior de la pantalla aparecerá una figura. Deberá seleccionar una de las cuatro imagenes que aparecen en la parte inferior de la pantalla y que comparta alguna reclación"}
          onPressAccept={ () => setShowInstructions(!showInstructions)}
          visible={showInstructions}
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
    margin:15,
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
});

export default PyramidAndPalmTreesTest;
