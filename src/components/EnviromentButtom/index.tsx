import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import colors from "../../styles/colors";
import fonts from "../../styles/font";
import Button from "../button/index";

interface EnviromentButtomProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

const EnviromentButtom = ({
  title,
  active = false,
  ...rest
}: EnviromentButtomProps) => {
  return (
    <RectButton style={[
      styles.container,
      active && styles.containerActive
      ]} {...rest}>
      <Text style={[
        styles.text,
        active && styles.textActive
        ]}>{title}</Text>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    height: 40,
    minWidth: 50,
    // width: 76,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 5,
  },
  containerActive:{
    backgroundColor: colors.green_light,
  },
  text: {
    color: colors.heading,
    fontFamily: fonts.text,
    marginHorizontal: 10,
  },
  textActive:{
    fontFamily: fonts.heading,
    color: colors.green_dark,
  }
});
export default EnviromentButtom;
