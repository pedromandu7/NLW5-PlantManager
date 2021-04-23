import React, { useState } from "react";
import {
  StatusBar,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import wateringImg from "../assets/watering.png";
import colors from "../styles/colors";
import fonts from "../styles/font";
import Button from "../components/button/index";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const UserIndentification = ({ navigation }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();

  const handleInputBlur = () => {
    setIsFocused(false);
  };
  const handleInputFocus = () => {
    setIsFocused(true);
  };
  const handleInputChange = (value: string) => {
    setIsFilled(!!value);
    setName(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <Text style={styles.emoji}>{!isFilled ? "😀" : "😄"}</Text>
              {/* <Text style={styles.emoji}>😁</Text> */}
              <Text style={styles.title}>
                Como podemos{"\n"}
                chamar você?
              </Text>
              <TextInput
                style={[
                  styles.input,
                  (isFilled || isFocused) && { borderColor: colors.green },
                ]}
                placeholder="Digite seu nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />
              <View style={styles.button}>
                <Button
                  title="Confirmar"
                  onPress={() => navigation.navigate("Confirmation")}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    width: "100%",
  },
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  emoji: {
    fontSize: 44,
    color: "black",
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.heading,
    textAlign: "center",
    color: colors.heading,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "gray",
    color: colors.heading,
    width: "100%",
    fontSize: 17,
    textAlign: "center",
    fontFamily: fonts.text,
    marginBottom: 30,
    marginTop: 30,
    padding: 10,
  },
  button: {
    marginTop: 20,
    width: "100%",
  },
});
export default UserIndentification;
