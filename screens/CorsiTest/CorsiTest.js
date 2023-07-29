import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AppButton from '../../components/AppButton';
import DatabaseService from '../../services/DatabaseService';
import Box from './Box';
import boxesData from './boxesData';
import Instructions from './Instructions';
import FinishTestComponent from '../../components/returnButton';

export default function CorsiTest({navigation, route}) {
  const [boxes, setBoxes] = useState(boxesData);
  const [turn, setTurn] = useState(0);
  const [boxOrderToBePressed, setBoxOrderToBePressed] = useState(1);
  const [amountOfBoxesToBePressed, setAmountOfBoxesToBePressed] = useState(2);
  const [invertedBoxOrderToBePressed, setInvertedBoxOrderToBePressed] = useState(amountOfBoxesToBePressed);
  const [numberOfPressedBoxes, setNumberOfPressedBoxes] = useState(0);
  const [numberOfCorrects, setNumberOfCorrects] = useState(0);
  const [results, setResults] = useState([]);
  const [inverted, setInverted] = useState(false);
  const [start, setStart] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [boxesDisabled, setBoxesDisabled] = useState(true);

  const {patientNumber, interviewerNumber} = route.params;

  useEffect(() => {
    setInvertedBoxOrderToBePressed(amountOfBoxesToBePressed);
    setNumberOfPressedBoxes(0);
    setBoxesDisabled(true);
    setTimeout(() => {
      setBoxesDisabled(false);
    }, amountOfBoxesToBePressed * 1000 + 1000);
    setStartTime(new Date());
  }, [start, turn]);

  useEffect(() => {
    if (inverted && turn == boxes[0].invertedSequenceOrder.length) {
      DatabaseService.instance().saveCorsiTestResult(patientNumber, interviewerNumber, results).then(() => {
        navigation.navigate('HomeScreen');
      });
    }
  }, [results.length])

  return start ? (
    <View style={{ width: '100%', height: '100%', backgroundColor: 'black', padding: 16 }}>
      <FinishTestComponent onPress={endTest}></FinishTestComponent>
      <View style={{height: 16, width: 16,  backgroundColor: boxesDisabled? 'yellow' : 'green', marginLeft: 'auto', borderRadius: 16}}></View>
      <View style={{ flexGrow: 1, position: 'relative' }}>
        {
          boxes.map((aBox) => {
            return (
              <Box
              key={aBox.key}
              turn={turn}
              boxKey={aBox.key}
              order={inverted ? aBox.invertedSequenceOrder[turn] : aBox.sequenceOrder[turn]}
              color={aBox.color}
              position={aBox.position}
              disabled = {boxesDisabled}
              onBoxPress={onBoxPress}
              style={{ position: 'absolute', left: aBox.position[0], top: aBox.position[1] }}>
              </Box>
            );
          })
        }
      </View>
      <View style={{ height: 70 }}>
        {numberOfPressedBoxes > 0 ? <AppButton style={{width: 200, marginLeft: 'auto', marginRight: 'auto'}} title='Ok' onPress={nextLevel}></AppButton> : null}
      </View>
    </View>
  ) : (<Instructions inverted={inverted} onStartPress={() => setStart(true)} />);
  
  function onBoxPress(key, order) {
    setNumberOfPressedBoxes((prev) => prev + 1)
    setBoxColorYellow(key);
    if (inverted) {
      checkBoxInvertedOrderIsCorrect(order);
    } else {
      checkBoxOrderIsCorrect(order);
    }
  };

  function endTest() {
    DatabaseService.instance().saveCorsiTestResult(patientNumber, interviewerNumber, results).then(() => {
      navigation.navigate('HomeScreen');
    });
  }

  function saveResult() {
    setResults((prevResults) => {
      prevResults.push({
        amountOfBoxes: amountOfBoxesToBePressed,
        inverted: inverted,
        correct: 
          numberOfCorrects == amountOfBoxesToBePressed
          && numberOfPressedBoxes == amountOfBoxesToBePressed,
        timeInMs: (new Date() - startTime) - amountOfBoxesToBePressed * 1000,
      });
      return prevResults;
    });
  }

  function nextLevel() {
    if (numberOfPressedBoxes == 0) {
      return;
    }
    saveResult();
    setNumberOfCorrects(0);
    setTurn((prevTurn) => prevTurn + 1);
    setBoxOrderToBePressed(1);
    const newAmountOfBoxes = boxes.reduce((amount, box) => {
      if (!inverted) {
        return amount + (box.sequenceOrder[turn + 1] > 0 ? 1 : 0);
      } else {
        return amount + (box.invertedSequenceOrder[turn + 1] > 0 ? 1 : 0);
      }
    }, 0);
    setAmountOfBoxesToBePressed((prev) => newAmountOfBoxes);
    setBoxes((prevBoxes) => {
      return prevBoxes.map((aBox) => {
        aBox.color = 'blue';
        return aBox;
      });
    });
    console.log(results);
    if (!inverted && turn == boxes[0].sequenceOrder.length - 1) {
      setInverted(true);
      showInstructions();
      setTurn(0);
      setAmountOfBoxesToBePressed(2);
    }
  }

  function showInstructions() {
    setStart(false);
  }

  function checkBoxOrderIsCorrect(order) {
    if (boxOrderToBePressed == order) {
      setNumberOfCorrects((prev) => prev + 1);
      if (amountOfBoxesToBePressed > boxOrderToBePressed) {
        setBoxOrderToBePressed((prev) => prev + 1);
      }
    }
  }

  function checkBoxInvertedOrderIsCorrect(order) {
    if (invertedBoxOrderToBePressed == order) {
      setNumberOfCorrects((prev) => prev + 1);
      if (invertedBoxOrderToBePressed > 1) {
        setInvertedBoxOrderToBePressed((prev) => prev - 1);
      }
    }
  }

  function setBoxColorYellow(key) {
    setBoxes((prevBoxes) => {
      return prevBoxes.map((aBox) => {
        if (key == aBox.key)
          aBox.color = 'yellow';
        return aBox;
      });
    });
  }
};
