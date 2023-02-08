import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Image,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { FontAwesome, MaterialCommunityIcons  } from '@expo/vector-icons';

import colors from '../../config/colors';
import { general, mainPage } from '../../config/styles/GeneralStyles';
import AppButton from '../../components/Button';

export default function HomeScreen({navigation}) {

  const [selectedTest, setSelectedTest] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [patientNumber, setPatientNumber] = useState(undefined);
  const [error, setError] = useState(null);
  
  return (
    <SafeAreaView styles={mainPage.mainStyle}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
       <View style={styles.patientModal}>
          <View style={styles.patientModal.modalView}>
            <Text style={styles.patientModal.title}>Número de paciente</Text>
            <TextInput
              style={styles.patientModal.input}
              onChangeText={setPatientNumber}
              placeholder='Número de paciente'
              keyboardType='numeric'
            ></TextInput>
            <Text>{error}</Text>
            <View style={styles.patientModal.buttons}>
              <AppButton title={'Cancelar'} onPress={() => cancel()}></AppButton>
              <AppButton title={'Comenzar'} onPress={() => openTest()}></AppButton>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <View style={{flex: 1, marginLeft: 75}}>
          <Text style={styles.headerText}>Seleccione una prueba para comenzar</Text>
        </View>
        <View style={{justifyContent:"flex-end", height:120, width: 160, marginRight: 75} }>
          <Image style={styles.logo} source={require('../../assets/logoUca.png')}/> 
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <TouchableOpacity style={[mainPage.button,{flexDirection:"row"}]}  onPress={() => selectTest('PyramidAndPalmTreesTest')} delayPressIn={0}>
          <MaterialCommunityIcons name="pyramid" size={60} color={colors.white}/>
          <Text style={general.textStyle}>Pyramid Test</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[mainPage.button,{flexDirection:"row"}]} onPress={() => selectTest('BellTest')} delayPressIn={0}>
          <FontAwesome name="bell-o" size={60} color={colors.white}/>
          <Text style={general.textStyle}>Bell Test</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[mainPage.button,{flexDirection:"row"}]} onPress={() => selectTest('HanoiTest')} delayPressIn={0}>
          <FontAwesome name="image" size={60} color={colors.white}/>
          <Text style={general.textStyle}>Hanoi Test</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[mainPage.button,{flexDirection:"row"}]} onPress={() => selectTest('CorsiTest')} delayPressIn={0}>
          <FontAwesome name="cube" size={60} color={colors.white}/>
          <Text style={general.textStyle}>Corsi Test</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[mainPage.button,{flexDirection:"row"}]} onPress={() => selectTest('CamelTest')} delayPressIn={0}>
          <FontAwesome name="image" size={60} color={colors.white}/>
          <Text style={general.textStyle}>Camel Test</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[mainPage.button,{flexDirection:"row"}]} onPress={() => selectTest('CardTest')} delayPressIn={0}>
        <MaterialCommunityIcons name="cards" size={60} color={colors.white}/>
          <Text style={general.textStyle}>Card Test</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[mainPage.button,{flexDirection:"row"}]} onPress={() => selectTest('ColorTrailsTest')} delayPressIn={0}>
          <FontAwesome name="image" size={60} color={colors.white}/>
          <Text style={general.textStyle}>Color Trails Test</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
    );

    function selectTest(testName) {
      setPatientNumber(null);
      setError(null);
      setSelectedTest(testName);
      setModalVisible(!modalVisible);
    }

    function cancel() {
      setPatientNumber(null);
      setSelectedTest(null);
      setModalVisible(!modalVisible);
    }

    function openTest() {
      if (!patientNumber) {
        setError('Por favor ingresa un número de paciente.');
        return;
      }
      setModalVisible(!modalVisible);
      navigation.navigate(selectedTest, {patientNumber});
    }
  };
  
  const styles = StyleSheet.create({
    patientModal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      title: {
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      input: {
        width: '100%',
        fontSize: 16,
        padding: 10,
        borderWidth: 1,
        minWidth: 250,
        borderColor: 'grey',
        marginBottom: 10,
      },
      buttons: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
    },
    itemsContainer: {
      margin:60,
      marginTop:100,
      flex:1,
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: 'row',
      flexWrap: "wrap",
    },
    header:{
      alignItems: 'center',
      flexDirection: "row",
      width: "100%",
    },
    logo: {
      flex: 1,
      borderBottomStartRadius: 15,
      borderBottomEndRadius: 15,
    },
    headerItem: {
      flex: 1,
    },
    headerText: {
      color: colors.title,
      fontSize: 30,
      fontWeight: 'bold'
    }
  });