import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import loadAnimation from "../../assets/loadRegar.json";
import colors from "../../styles/colors";
import fonts from "../../styles/font";

const Load = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={loadAnimation}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    backgroundColor: 'transparent',
    width: 200,
    height: 200,
  },
});
export default Load;
