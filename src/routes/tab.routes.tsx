import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Welcome from "../screens/Welcome";
import UserIndentification from "../screens/UserIndentification";
import Confirmation from "../screens/Confirmation";

import colors from "../styles/colors";
import PlantSelect from "../screens/PlantSelect";
import PlantSave from "../screens/PlantSave";
import MyPlants from "../screens/MyPlants";
import { ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const TabNavigator = createBottomTabNavigator();

const AuthRoutes = () => {
  return (
    <TabNavigator.Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: "beside-icon",
        style: { paddingVertical: 20, height: 88 },
      }}
    >
      <TabNavigator.Screen
        name="Nova planta"
        component={PlantSelect}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <TabNavigator.Screen
        name="Minha planta"
        component={MyPlants}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </TabNavigator.Navigator>
  );
};

export default AuthRoutes;
