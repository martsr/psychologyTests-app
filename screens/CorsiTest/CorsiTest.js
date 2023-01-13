import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AppButton from '../../components/Button';
import Box from './Box';
import boxesData from './boxesData';
import Instructions from './Instructions';

export default function CorsiTest() {
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

  useEffect(() => {
    setInvertedBoxOrderToBePressed(amountOfBoxesToBePressed);
    setNumberOfPressedBoxes(0);
  }, [amountOfBoxesToBePressed])

  useEffect(() => {
    setStartTime(new Date());
  }, [start, turn]);

  
  return start ? (
    <View style={{ width: '100%', height: '100%', backgroundColor: 'black', padding: '2em' }}>
      <Text>{inverted ? 'Invertido' : ''}</Text>
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
              onBoxPress={onBoxPress}
              style={{ position: 'absolute', left: aBox.position[0], top: aBox.position[1] }}>
              </Box>
            );
          })
        }
      </View>
      <View style={{ height: '60px' }}>
        {numberOfPressedBoxes > 0 ? <AppButton title='✔' onPress={nextLevel}></AppButton> : null}
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
    if (inverted && turn == boxes.length - 2) {
      alert('END');
    }
    saveResult();
    setNumberOfCorrects(0);
    setTurn((prevTurn) => prevTurn + 1);
    setBoxOrderToBePressed(1);
    setAmountOfBoxesToBePressed((prev) => prev + 1);
    setBoxes((prevBoxes) => {
      return prevBoxes.map((aBox) => {
        aBox.color = 'blue';
        return aBox;
      });
    });
    console.log(results);
    if (!inverted && turn == boxes.length - 2) {
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
