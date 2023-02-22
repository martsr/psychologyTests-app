import { NavigationContainer, useIsFocused } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
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
  const [results, setResults] = useState(null);

  useEffect(() => {
    DatabaseService.instance().getResults().then( res => setResults(res)).catch(err => alert(err.message))
  }, []);

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

  return (
    <View style={{padding:30}}>
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
      }}>Downloads</Text>
      <TouchableOpacity
        style={{height: 50, padding:10, backgroundColor: 'blue'}}
        onPress={refresh}>
        <Text>Actualizar</Text>  
      </TouchableOpacity>
      <Text>
        {JSON.stringify(results)}
      </Text>
    </View>
  );
    
  function refresh() {
    DatabaseService.instance().getResults().then( res => {
      setResults(res)
      const header = 'patientNumber,professionalNumber,date,inverted,amountOfBoxes,correct,timeInMs\n';
      const data = res.corsiTest.rows.map((row) => {
        return `${row.patientNumber},${row.professionalNumber},${row.date},${row.inverted},${row.amountOfBoxes},${row.correct},${row.timeInMs}\n`
      }).join('');
      saveFile(`${header}${data}`).then((fileUri) => shareFile(fileUri));
    }).catch(err => alert(err.message))
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
