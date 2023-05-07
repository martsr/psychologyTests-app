import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import colors from "../../config/colors";

function Card({ image, isMain, onPress, selected }) {
  const [selectedStyle, setSelectedStyle] = useState({opacity: 1});
  
  useEffect( ()=> {
    if(selected){
      setSelectedStyle({opacity:0.5});
    }
    else {
      setSelectedStyle({opacity:1});
    }
  }, [selected])

  return (
    <View style={isMain? styles.mainCard : styles.card}>
      {isMain
      ? <Image style={styles.mainImage} source={image} />
      : <TouchableOpacity style={selectedStyle} onPress={onPress} activeOpacity={0.5}>
          <Image style={styles.image} source={image} />
        </TouchableOpacity>
    }
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 100,
    width: undefined,
    borderRadius: 15,
    marginBottom: 10,
    overflow: "hidden",
    backgroundColor: colors.black,
    margin: 20,
    // flex: 1,
    flexDirection: "row",
    overflow: "hidden",
    justifyContent:'center',
    aspectRatio: 1/1,
  },
  mainCard: {
    height: '100%',
    width: undefined,
    borderRadius: 15,
    backgroundColor: colors.white,
    margin: 10,
    flex: 1,
    flexDirection: "row", 
    overflow: "hidden",
    justifyContent:'center',
    aspectRatio: 1/1,
  },
  image: {
    width: 100,
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#000',
    alignItems:'center',
    alignContent: 'center',
  },
  mainImage: {
    flex: 1,
    height: '100%',
    width: undefined,
    overflow: 'hidden',
    backgroundColor: '#000',
    alignItems:'center',
    alignContent: 'center',
  },
});

export default Card;
