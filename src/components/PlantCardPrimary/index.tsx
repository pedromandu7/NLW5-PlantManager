import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { SvgFromUri } from "react-native-svg";
import { Entypo } from "@expo/vector-icons";

import colors from "../../styles/colors";
import fonts from "../../styles/font";
import EnviromentButtom from "../../components/EnviromentButtom";
import { RectButtonProps, RectButton } from "react-native-gesture-handler";

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  };
}

const PlantCardPrimary = ({ data, ...rest }: PlantProps) => {
  return (
    <RectButton style={styles.container}>
      <SvgFromUri uri={data.photo} width={100} height={100} />
      <Text style={styles.text}>{data.name}</Text>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: "45%",
    backgroundColor: colors.shape,
    margin: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
    marginVertical: 16,
    marginHorizontal: 10,
  },
});
export default PlantCardPrimary;
