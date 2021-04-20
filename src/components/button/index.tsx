import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";
import colors from "../../styles/colors";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

const ButtonWelcome = ({ title, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity 
    style={styles.button}
    activeOpacity={0.5}
    {...rest}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 10,
    // width: 60,
    height: 60,
  },
  buttonText: {
    fontSize: 24,
    color: colors.white,
    paddingHorizontal: 10,
  },
});

export default ButtonWelcome;
