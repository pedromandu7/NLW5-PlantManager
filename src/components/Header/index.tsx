import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";

import { Entypo } from "@expo/vector-icons";

import colors from "../../styles/colors";
import fonts from "../../styles/font";
import Button from "../../components/button/index";
import userImg from "../../assets/perfil.jpg"
import { color } from "react-native-reanimated";

const Header = () => {
  return (
    <View style={styles.container}>
      <View >
        <Text style={styles.greeating}>Olá</Text>
        <Text style={styles.userName}>Pedro</Text>
      </View>
      <Image source={userImg} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",
    // marginTop: ,
    // backgroundColor: colors.red,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greeating:{
    fontSize: 32,
    fontFamily: fonts.text,
    color: colors.heading,
  },
  userName:{
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  },
  image:{
width: 70,
height:70,
borderRadius:40,
  },

});
export default Header;
