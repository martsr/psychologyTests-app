import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, ScrollView, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNetInfo } from "@react-native-community/netinfo";

import PyramidAndPalmTreesTest from "./screens/PyramidsAndPalmTreesTest/PyramidsAndPalmTreesScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import BellTest from "./screens/BellTest/BellTest";
import HanoiTest from "./screens/HanoiTest/HanoiTest";
import CorsiTest from "./screens/CorsiTest/CorsiTest";
import CardTest from "./screens/CardTest/CardTest";
import ColorTrailsTest from "./screens/ColorTrailsTest/ColorTrailsTest";
import { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
DropDownPicker.setListMode("SCROLLVIEW");
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "./redux/reducers/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import colors from "./config/colors";
import UploadButton from "./components/UploadButton";
import TestsNames from "./Helpers/TestsNames";
import RedcapService from "./services/RedcapService";

const rootReducer = combineReducers({
  userReducer,
});
const store = configureStore({
  reducer: persistReducer(
    {
      key: "root",
      storage: AsyncStorage,
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
              name="Tests"
              component={TestsTab}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="test-tube-empty"
                    color={color}
                    size={size}
                  />
                ),
              }}
            ></Tab.Screen>
            <Tab.Screen
              name="Subir a RedCap"
              component={UploadToRedCap}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="upload"
                    color={color}
                    size={size}
                  />
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
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="pyramidAndPalmTreesTest"
        component={PyramidAndPalmTreesTest}
        options={{
          headerShown: false,
          title: TestsNames.pyramidAndPalmTreesTest,
        }}
      />
      <Stack.Screen
        name="bellTest"
        component={BellTest}
        options={{ headerShown: false, title: TestsNames.bellTest }}
      />
      <Stack.Screen
        name="hanoiTest"
        component={HanoiTest}
        options={{ headerShown: false, title: TestsNames.hanoiTest }}
      />
      <Stack.Screen
        name="corsiTest"
        component={CorsiTest}
        options={{ headerShown: false, title: TestsNames.corsiTest }}
      />
      <Stack.Screen
        name="cardTest"
        component={CardTest}
        options={{ headerShown: false, title: TestsNames.cardTest }}
      />
      <Stack.Screen
        name="colorTrailsTest"
        component={ColorTrailsTest}
        options={{ headerShown: false, title: TestsNames.colorTrailsTest }}
      />
    </Stack.Navigator>
  );
}

function UploadToRedCap() {
  const [disabled, setDisabled] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const netInfo = useNetInfo();
  useEffect(() => {
    setIsConnected(netInfo.isConnected);
  });
  useEffect(() => {
    if (isConnected) {
      setDisabled(false);
    } else setDisabled(true);
  });

  return (
    <ScrollView
      style={{
        paddingHorizontal: 75,
        paddingTop: 30,
      }}
    >
      <View style={{ height: 1000 }}>
        <Text
          style={{
            marginTop: 10,
            alignSelf: "flex-start",
            color: colors.title,
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          RedCap
        </Text>
        <View
          style={{
            alignSelf: "center",
            display: "flex",
            alignItems: "center",
            backgroundColor: colors.white,
            width: 600,
            paddingVertical: 40,
            borderRadius: 20,
            marginTop: 20,
            marginBottom: 80,
          }}
        >
          <Text>
            {disabled
              ? "No hay internet, por favor compruebe su conexión"
              : "Por favor aprete el botón Subir para continuar"}
          </Text>

          <UploadButton
            style={{
              width: 300,
              marginTop: 20,
            }}
            disabled={disabled}
            color={colors.button}
            title="Subir"
            onPress={upload}
          />
        </View>
      </View>
    </ScrollView>
  );

  async function upload() {
    const upload = await RedcapService.instance().getTestResults();

    if (upload == true) {
      Alert.alert("Datos subidos de manera exitosa");
    } else if (upload == false) Alert.alert("No hay datos para cargar");
    else
      Alert.alert(
        "Error en conexion con Red Cap, verifique que el servidor este prendido."
      );
  }
}
