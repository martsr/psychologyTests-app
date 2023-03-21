import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useFocusEffect, useIsFocused } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome, MaterialCommunityIcons  } from '@expo/vector-icons';

import PyramidAndPalmTreesTest from './screens/PyramidsAndPalmTreesTest/PyramidsAndPalmTreesScreen';
import HomeScreen from './screens/Home/HomeScreen';
import BellTest from './screens/BellTest/BellTest';
import HanoiTest from './screens/HanoiTest/HanoiTest';
import CorsiTest from './screens/CorsiTest/CorsiTest';
import CardTest from './screens/CardTest/CardTest';
import ColorTrailsTest from './screens/ColorTrailsTest/ColorTrailsTest';
import CamelTest from './screens/CamelTest/CamelTest';
import DatabaseService from './services/DatabaseService';
import { useCallback, useState } from 'react';
import {Provider} from 'react-redux';
import { applyMiddleware } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from 'redux-thunk';
import userReducer from './redux/reducers/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from 'redux-persist/lib/storage';
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

const rootReducer = combineReducers({
  userReducer
});
const store = configureStore({
  reducer: persistReducer(
    {
      key: 'root',
      storage
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

  return (
    <View style={{padding:30}}>
      <Text>Downloads</Text>
      <Text>
        {JSON.stringify(DatabaseService.instance().getResults())}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
