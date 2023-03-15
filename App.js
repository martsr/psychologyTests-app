import { NavigationContainer, useIsFocused } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Button } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';

import PyramidAndPalmTreesTest from './screens/PyramidsAndPalmTreesTest/PyramidsAndPalmTreesScreen';
import HomeScreen from './screens/Home/HomeScreen';
import BellTest from './screens/BellTest/BellTest';
import HanoiTest from './screens/HanoiTest/HanoiTest';
import CorsiTest from './screens/CorsiTest/CorsiTest';
import CardTest from './screens/CardTest/CardTest';
import ColorTrailsTest from './screens/ColorTrailsTest/ColorTrailsTest';
import CamelTest from './screens/CamelTest/CamelTest';
import DatabaseService from './services/DatabaseService';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from '@react-native-community/datetimepicker';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen 
          name='Tests' 
          component={TestsTab}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="test-tube-empty" color={color} size={size} />
            ),
          }}
        ></Tab.Screen>
        <Tab.Screen 
          name='Descargas' 
          component={DownloadsTab}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="download" color={color} size={size} />
            ),
          }}
        ></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function TestsTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='pyramidAndPalmTreesTest'
        component={PyramidAndPalmTreesTest}
      />
      <Stack.Screen
        name='bellTest'
        component={BellTest}
      />
      <Stack.Screen
        name='hanoiTest'
        component={HanoiTest}
      />
      <Stack.Screen
        name='corsiTest'
        component={CorsiTest}
      />
      <Stack.Screen
        name='camelTest'
        component={CamelTest}
      />
      <Stack.Screen
        name='cardTest'
        component={CardTest}
      />
      <Stack.Screen
        name='colorTrailsTest'
        component={ColorTrailsTest}
      />
    </Stack.Navigator>
  );
}

function DownloadsTab() {
  const isFocused = useIsFocused();

  const [testsDropdownOpen, setTestsDropdownOpen] = useState(false);
  const [selectedTestValue, setSelectedTestValue] = useState(null);

  async function saveFile(data) {
    let directoryUri = FileSystem.documentDirectory;
    let fileUri = directoryUri + "corsi.csv";
    await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.UTF8 });
    return fileUri;
  };
    
  async function shareFile(fileUri){
    const canShare = await Sharing.isAvailableAsync();
    // Check if permission granted
    if (canShare) {
      try{
        const res = await Sharing.shareAsync(fileUri);
        console.log('shareAsync', res);
        return true;
      } catch {
        return false;
      }
    } else {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        // Permisos otorgados, puedes utilizar el método shareAsync
        const res = await Sharing.shareAsync(fileUri);
        console.log('shareAsync', res);
      } else {
        // El usuario no otorgó permisos, muestra un mensaje o solicita los permisos nuevamente
        alert('no se otorgaron permisos')
      }
    }};

  function subtractMonths(date, months) {
    date.setMonth(date.getMonth() - months);
    return date;
  }

  const [fromDate, setFromDate] = useState(subtractMonths(new Date(), 1));
  const [fromDateShow, setFromDateShow] = useState(false);
  const onChangeFromDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setFromDateShow(false);
    setFromDate(currentDate);
  };

  const [toDate, setToDate] = useState(new Date());
  const [toDateShow, setToDateShow] = useState(false);
  const onChangeToDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setToDateShow(false);
    setToDate(currentDate);
  };

  return (
    <View 
      style={{
        padding:30, 
        display: 'flex',
        alignItems: 'center',
      }}>
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        alignSelf: 'flex-start'
      }}>Descargas</Text>
      <Text>Prueba</Text>
      <DropDownPicker
          containerStyle={{
            marginTop: 15,
            marginBottom:30,
            width: 300
          }}
          open={testsDropdownOpen}
          value={selectedTestValue}
          items={[
            {label: 'Pirámides y palmeras', value: 'piramides'},
            {label: 'Campanas', value: 'campanas'},
            {label: 'Hanoi', value: 'hanoi'},
            {label: 'Corsi', value: 'corsi'},
            {label: 'Camellos', value: 'camellos'},
            {label: 'Cartas', value: 'cartas'},
            {label: 'Prueba de color', value: 'color'},
          ]}
          setOpen={setTestsDropdownOpen}
          setValue={setSelectedTestValue}
          placeholder='Seleccione una prueba'
      />
      <Text>Desde</Text>
      <DateTimePicker
          style={{
            height: 60
          }}
          maximumDate={new Date()}
          value={fromDate}
          mode={'date'}
          onChange={onChangeFromDate}
        />
      <Text>Hasta</Text>
      <DateTimePicker
          style={{
            height: 60,
            marginBottom: 20
          }}
          maximumDate={new Date()}
          value={toDate}
          mode={'date'}
          onChange={onChangeToDate}
        />
      <Button 
        style={{
          width: 300,
        }}
        title="Descargar"
        onPress={download}
        />
    </View>
  );

  async function download() {
    const csvResult = await DatabaseService.instance().getCSVResults(selectedTestValue, fromDate, toDate);
    try {
      saveFile(csvResult).then((fileUri) => shareFile(fileUri));
    } catch(e) {
      alert(e.message)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
