import React from "react";
import {  Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import colors from "../styles/colors";
import PlantSelect from "../screens/PlantSelect";
import MyPlants from "../screens/MyPlants";
import { MaterialIcons } from "@expo/vector-icons";

const TabNavigator = createBottomTabNavigator();

const AuthRoutes = () => {
  return (
    <TabNavigator.Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: "beside-icon",
        style: { paddingVertical: Platform.OS ==='ios' ? 20 : 0, height: 70 },
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
