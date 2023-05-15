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
import { useState } from 'react';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import {Provider} from 'react-redux';
import { applyMiddleware } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from 'redux-thunk';
import userReducer from './redux/reducers/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import colors from './config/colors';
import AppButton from './components/AppButton';
import TestsNames from './Helpers/TestsNames';

const rootReducer = combineReducers({
  userReducer
});
const store = configureStore({
  reducer: persistReducer(
    {
      key: 'root',
      storage: AsyncStorage
    },
    rootReducer
  ),
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
      serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
  }),
});
let persistor = persistStore(store);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <PersistGate persistor={persistor}>
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
    </PersistGate>
    </Provider>
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
        options={{ title: TestsNames.pyramidAndPalmTreesTest }}
      />
      <Stack.Screen
        name='bellTest'
        component={BellTest}
        options={{ title: TestsNames.bellTest }}
      />
      <Stack.Screen
        name='hanoiTest'
        component={HanoiTest}
        options={{ title: TestsNames.hanoiTest }}
      />
      <Stack.Screen
        name='corsiTest'
        component={CorsiTest}
        options={{ title: TestsNames.corsiTest }}
      />
      <Stack.Screen
        name='camelTest'
        component={CamelTest}
        options={{ title: TestsNames.camelTest }}
      />
      <Stack.Screen
        name='cardTest'
        component={CardTest}
        options={{ title: TestsNames.cardTest }}
      />
      <Stack.Screen
        name='colorTrailsTest'
        component={ColorTrailsTest}
        options={{ title: TestsNames.colorTrailsTest }}
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
  const showFromDate = () => {
    setFromDateShow(true)
  }

  const [toDate, setToDate] = useState(new Date());
  const [toDateShow, setToDateShow] = useState(false);
  const onChangeToDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setToDateShow(false);
    setToDate(currentDate);
  };
  const showToDate = () => {
    setToDateShow(true)
  }

  return (
    <View 
      style={{
        paddingHorizontal:75,
        paddingTop: 30
      }}>
      <Text style={{
        marginTop: 10,
        alignSelf: 'flex-start',
        color: colors.title,
        fontSize: 30,
        fontWeight: 'bold'
      }}>Descargas</Text>
      <View style={{
        alignSelf: 'center',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: colors.white,
        width: 600,
        paddingVertical: 40,
        borderRadius: 20,
        marginTop: 20
      }}>
        <Text>Seleccione la prueba</Text>
        <DropDownPicker
            containerStyle={{
              marginTop: 15,
              marginBottom:30,
              width: 300,
              zIndex: 999
            }}
            open={testsDropdownOpen}
            value={selectedTestValue}
            items={[
              {label: 'Pirámides y palmeras', value: 'piramides'},
              {label: 'Campanas', value: 'campanas'},
              {label: 'Hanoi', value: 'hanoi'},
              {label: 'Corsi', value: 'corsi'},
              {label: 'Cartas', value: 'cartas'},
              {label: 'Prueba de color', value: 'color'},
            ]}
            setOpen={setTestsDropdownOpen}
            setValue={setSelectedTestValue}
            placeholder='Seleccione una prueba'
        />
        <Text style={{textDecorationLine:"underline", color:"blue"}} onPress={showFromDate}>Seleccionar fecha desde</Text>
        <Text>{fromDate.toLocaleString("es-ES").split(',')[0]}</Text>
        {fromDateShow && <DateTimePicker
            style={{
              height: 60
            }}
            maximumDate={new Date()}
            value={fromDate}
            mode={'date'}
            onChange={onChangeFromDate}
          />}
        <Text style={{textDecorationLine:"underline", color:"blue"}} onPress={showToDate}>Seleccionar fecha hasta</Text>
        <Text>{toDate.toLocaleString("es-ES").split(',')[0]}</Text>
        {toDateShow && <DateTimePicker
            style={{
              height: 60,
              marginBottom: 20
            }}
            maximumDate={new Date()}
            value={toDate}
            mode={'date'}
            onChange={onChangeToDate}
          />}
        <AppButton 
          style={{
            width: 300,
            marginTop: 20
          }}
          color={colors.button}
          title="Descargar"
          onPress={download}
          />
      </View>
    </View>
  );

  async function download() {
    const csvResult = await DatabaseService.instance().getCSVResults(selectedTestValue, fromDate, toDate);
    console.log(selectedTestValue)
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
