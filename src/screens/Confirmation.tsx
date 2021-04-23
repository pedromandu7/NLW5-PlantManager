import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import wateringImg from "../assets/watering.png";

import { Entypo } from "@expo/vector-icons";

import colors from "../styles/colors";
import fonts from "../styles/font";
import Button from "../components/button/index";

const Comfirmation = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.emoji}>😁</Text>
        <Text style={styles.title}>Prontinho</Text>
        <Text style={styles.subtitle}> Agora vamos começar a cuidar das suas plantinhas com muito cuidado.</Text>

        <View style={styles.footer}>
          <Button title="Começar" />
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 20,
  },
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  emoji: {
    fontSize: 32,
    color: "black",
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.heading,
    textAlign: "center",
    color: colors.heading,
    marginTop: 15,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    textAlign: "center",
    paddingVertical: 10,
    color: colors.heading,
  },
  footer: {
    width: "100%",
    paddingHorizontal: 50,
    marginTop: 20,
  },
});
export default Comfirmation;
