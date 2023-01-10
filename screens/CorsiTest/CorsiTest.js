import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import AppButton from '../../components/Button';


export default function CorsiTest() {

  const [boxes, setBoxes] = useState([
    {
      key: 0,
      color: 'blue',
      position: ['0%', '0%'],
      sequenceOrder: [1, 2, 4, 1, 1, 1],
      invertedSequenceOrder: [0, 3, 2, 0, 0, 9]
    },
    {
      key: 1,
      color: 'blue',
      position: ['25%', '15%'],
      sequenceOrder: [2, 1, 1, 2, 2, 2],
      invertedSequenceOrder: [0, 0, 3, 0, 0, 8] 
    },
    {
      key: 2,
      color: 'blue',
      position: ['50%', '5%'],
      sequenceOrder: [0, 3, 2, 3, 3, 3],
      invertedSequenceOrder: [1, 2, 4, 0, 0, 7]
    },
    {
      key: 3,
      color: 'blue',
      position: ['82%', '12%'],
      sequenceOrder: [0, 0, 3, 4, 4, 4],
      invertedSequenceOrder: [2, 1, 1, 0, 6, 6]
    },
    {
      key: 4,
      color: 'blue',
      position: ['12%', '42%'],
      sequenceOrder: [0, 0, 0, 5, 5, 5],
      invertedSequenceOrder: [0, 0, 3, 5, 5, 5] 
    },
    {
      key: 5,
      color: 'blue',
      position: ['44%', '38%'],
      sequenceOrder: [0, 0, 0, 0, 6, 6],
      invertedSequenceOrder: [1, 2, 4, 4, 4, 4]
    },
    {
      key: 6,
      color: 'blue',
      position: ['70%', '38%'],
      sequenceOrder: [0, 0, 0, 0, 0, 7],
      invertedSequenceOrder: [2, 1, 1, 3, 3, 3]
    },
    {
      key: 7,
      color: 'blue',
      position: ['27%', '68%'],
      sequenceOrder: [0, 0, 0, 0, 0, 8],
      invertedSequenceOrder: [1, 2, 4, 2, 2, 2]
    },
    {
      key: 8,
      color: 'blue',
      position: ['60%', '68%'],
      sequenceOrder: [0, 0, 0, 0, 0, 9],
      invertedSequenceOrder: [2, 1, 1, 1, 1, 1]
    },
  ]);

  const [turn, setTurn] = useState(0);

  const [boxOrderToBePressed, setBoxOrderToBePressed] = useState(1);
  const [amountOfBoxesToBePressed, setAmountOfBoxesToBePressed] = useState(2);
  const [invertedBoxOrderToBePressed, setInvertedBoxOrderToBePressed] = useState(amountOfBoxesToBePressed);
  const [numberOfPressedBoxes, setNumberOfPressedBoxes] = useState(0);

  useEffect(() => {
    setInvertedBoxOrderToBePressed(amountOfBoxesToBePressed);
    setNumberOfPressedBoxes(0);
  }, [amountOfBoxesToBePressed])

  const [numberOfCorrects, setNumberOfCorrects] = useState(0);
  const [results, setResults] = useState([]);
  const [inverted, setInverted] = useState(false);
  const [start, setStart] = useState(false);

  const onBoxPress = (key, order) => {
    setNumberOfPressedBoxes((prev) => prev + 1)
    setBoxColorYellow(key);
    if (inverted) {
      checkBoxInvertedOrderIsCorrect(order);
    } else {
      checkBoxOrderIsCorrect(order);
    }
  };

  const saveResult = () => {
    setResults((prevResults) => {
      prevResults.push({
        inverted: inverted,
        correct: numberOfCorrects == amountOfBoxesToBePressed && numberOfPressedBoxes == amountOfBoxesToBePressed,
        timeInMs: 10, 
      });
      return prevResults;
    });
  }

  const nextLevel = () => {
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
  
  return start? (
    <View style={{width: '100%', height: '100%', backgroundColor: 'black', padding: '2em'}}>
      <Text>{inverted? 'Invertido' : ''}</Text>
      <View style={{flexGrow: 1, position: 'relative'}}>
        {
          boxes.map((aBox) => {
            return (
              <Box
                key={aBox.key}
                turn={turn}
                boxKey={aBox.key}
                order={inverted? aBox.invertedSequenceOrder[turn] : aBox.sequenceOrder[turn]} 
                color={aBox.color}
                position = {aBox.position}
                onBoxPress={onBoxPress}
                style={{position: 'absolute', left: aBox.position[0], top: aBox.position[1]}}>
              </Box>
            );
          })
        }
      </View>
      <View style={{height: '60px'}}>
        { numberOfPressedBoxes > 0? <AppButton title='✔' onPress={nextLevel}></AppButton> : null }
      </View>
    </View>
  ) : (<TestInstructions inverted={inverted} onStartPress={()=>setStart(true)}/>);

  function checkBoxOrderIsCorrect(order) {
    console.log('order:', order);
    console.log('boxOrderToBePressed', boxOrderToBePressed);
    if (boxOrderToBePressed == order) {
      console.log('OK');
      setNumberOfCorrects((prev) => prev + 1);
      if (amountOfBoxesToBePressed > boxOrderToBePressed) {
        setBoxOrderToBePressed((prev) => prev + 1);
      }
    }
  }

  function checkBoxInvertedOrderIsCorrect(order) {
    console.log('order:', order);
    console.log('invertedBoxOrderToBePressed:', invertedBoxOrderToBePressed);
    if (invertedBoxOrderToBePressed == order) {
      console.log('OK');
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

function Box({boxKey, order, color, position, onBoxPress, turn}) {

  const [boxColor, setBoxColor] = useState(color);

  const flash = () => {
      setTimeout(() => {
        setBoxColor('yellow');
      }, (order-1)*1000+1000);
      setTimeout(() => {
        setBoxColor('blue');
      }, order*1000+1000)
  }
  useEffect(() => {
    if (order > 0) {
      flash();
    }
  }, [turn])
  
  useEffect(() => {
    setBoxColor(color);
  }, [color]);

  const onPress = () => {
    if (boxColor == 'yellow') return;
    onBoxPress(boxKey, order);
  };

  return (
    <TouchableOpacity 
      style={{height: position? '20%' : '100px', aspectRatio: 1, margin:'10px', backgroundColor: boxColor, position: position? 'absolute' : 'relative', top: position? position[1] : '', left: position? position[0] : ''}}
      onPress={onPress}>
      <Text>{boxKey}</Text>  
    </TouchableOpacity>
  );
};

function TestInstructions({onStartPress, inverted}) {
  const [boxOrderToBePressed, setBoxOrderToBePressed] = useState(1);
  const [numberOfCorrects, setNumberOfCorrects] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const [showCross, setShowCross] = useState(false);
  function onBoxPress(key, order) {
    // debugger
    if (boxOrderToBePressed == order) {
      console.log('OK');
      setNumberOfCorrects((prev) => prev + 1);
    }
    if (boxOrderToBePressed < 2) {
      setBoxOrderToBePressed((prev) => prev + 1);
    } else {
      if (numberOfCorrects == 1) {
        setDone(true);
        setCorrect(true);
      }
      else {
        setNumberOfCorrects(0);
        setBoxOrderToBePressed(1);
        setDone(true);
        setCorrect(false);
      }
    }
  }
  function restart() {
    setDone(false);
  }
  function crossAndStart() {
    setShowCross(true);
    setTimeout(() => {
      setShowCross(false);
      onStartPress();
    },3000)
  }
  return (
    !showCross?
    (<View style={{width: '100%', height: '100%', backgroundColor: 'black', padding: '2em', alignItems: 'center', justifyContent: 'space-evenly'}}>
      <Text style={{color: 'white', fontSize: '2rem'}}>Instrucciones</Text>
      <Text style={{color: 'white', fontSize: '1.5rem', textAlign: 'center'}}>Verá 9 cuadrados azules en la pantalla y se irán encendiendo en amarillo en determinado orden. Preste atención y repita el orden de la secuencia una vez que se hayan apagado. Hagamos una prueba {inverted? '(Ahora invertido)': ''}</Text>
      {!done? <View style={{flexDirection: 'row'}}>
        <Box order={1} boxKey={1} color='blue' onBoxPress={onBoxPress}></Box>
        <Box order={2} boxKey={2} color='blue' onBoxPress={onBoxPress}></Box>
      </View> : null}
      <Text style={{fontSize: '5rem', color: correct? 'green': 'red'}}>{done? correct? '✔' : '✖' : ''}</Text>
      {done? <AppButton title={correct? 'Comenzar' : 'Reintentar'} onPress={correct? crossAndStart : restart}></AppButton> : null}
      {(done && correct)? <Text style={{color: 'white', fontSize: '1.2rem'}}>Ahora aparecerá una cruz en el centro de la pantalla. Por favor, preste atención a la cruz.</Text> : null}
    </View>) :
    (<View style={{width: '100%', height: '100%', backgroundColor: 'black', padding: '2em', alignItems: 'center', justifyContent: 'space-evenly'}}>
      <Text style={{fontSize: '10rem', color: 'white'}}>✖</Text>
    </View>)
  );
}
