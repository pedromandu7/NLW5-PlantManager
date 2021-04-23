import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/font";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

const Button = ({ title, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity 
    style={styles.button}
    activeOpacity={0.5}
    {...rest}
    >

      <Text style={styles.buttonText}>
        {title}
      </Text>
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    width: "100%",
    height: 56,
  },
  buttonText: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading,
  },
});
export default Button;
