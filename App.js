import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import PyramidAndPalmTreesTest from './screens/PyramidsAndPalmTree/PyramidsAndPalmTreesScreen';
import HomeScreen from './screens/Home/HomeScreen';
import BellTest from './screens/BellTest/BellTest';
import HanoiTest from './screens/HanoiTest/HanoiTest';
import CorsiTest from './screens/CorsiTest/CorsiTest';
import CardTest from './screens/CardTest/CardTest';
import ColorTrailsTest from './screens/ColorTrailsTest/ColorTrailsTest';
import CamelTest from './screens/CamelTest/CamelTest';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen
            name='HomeScreen'
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name='PyramidAndPalmTreesTest'
            component={PyramidAndPalmTreesTest}
          />
          <Stack.Screen
            name='BellTest'
            component={BellTest}
          />
          <Stack.Screen
            name='HanoiTest'
            component={HanoiTest}
          />
          <Stack.Screen
            name='CorsiTest'
            component={CorsiTest}
          />
          <Stack.Screen
            name='CamelTest'
            component={CamelTest}
          />
          <Stack.Screen
            name='CardTest'
            component={CardTest}
          />
          <Stack.Screen
            name='ColorTrailsTest'
            component={ColorTrailsTest}
          />
        </Stack.Navigator>
    </NavigationContainer>
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
