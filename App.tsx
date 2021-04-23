import React from "react";
import { View, Text } from "react-native";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";
import Welcome from "./src/screens/Welcome";
import UserIndentification from "./src/screens/UserIndentification";
import Routes from './src/routes';
export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return <Routes/>;
  }
}