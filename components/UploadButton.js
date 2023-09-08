import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function UploadButton({
  title,
  disabled,
  onPress,
  textColor = colors.white,
  color = colors.primary,
  borderColor,
  style = {},
}) {
  if (!disabled)
    return (
      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: color,
          borderColor: borderColor ?? color,
          ...style,
        }}
        onPress={onPress}
      >
        <Text style={{ ...styles.text, color: textColor }}>{title}</Text>
      </TouchableOpacity>
    );
  return;
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
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "500",
  },
});

export default UploadButton;
