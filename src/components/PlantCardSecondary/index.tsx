import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { SvgFromUri } from "react-native-svg";
import { Entypo } from "@expo/vector-icons";

import colors from "../../styles/colors";
import fonts from "../../styles/font";
import EnviromentButtom from "../EnviromentButtom";
import { RectButtonProps, RectButton } from "react-native-gesture-handler";

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
}

const PlantCardSecondary = ({ data, ...rest }: PlantProps) => {
  return (
    <RectButton style={styles.container} {...rest}>
      <SvgFromUri uri={data.photo} width={50} height={50} />
      <Text style={styles.title}>{data.name}</Text>
      <View style={styles.details}>
        <View style={styles.detailsCenter}>
          <Text style={styles.timeLabel}>Regar às</Text>

          <Text style={styles.time}>{data.hour}</Text>
        </View>
      </View>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.shape,
    marginVertical: 5,
  },
  title: {
    fontFamily: fonts.heading,
    marginLeft: 10,
    fontSize: 16,
    color: colors.heading,
  },
  details: {
    alignItems: "flex-end",
    // justifyContent: "center",
  },
  detailsCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  timeLabel: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.body_dark,
  },
  time: {
    alignItems: "center",
    justifyContent: "center",
  },
});
export default PlantCardSecondary;
