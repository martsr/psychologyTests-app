import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function AppButton({ title, onPress, textColor=colors.white, color=colors.primary, borderColor, style={}}) {
  return (
    <TouchableOpacity
      style={{...styles.button, backgroundColor: color, borderColor: borderColor ?? color, ...style}}
      onPress={onPress}
    >
      <Text style={{...styles.text, color: textColor}}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
    borderWidth: 2,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "500",
  },
});

export default AppButton;
