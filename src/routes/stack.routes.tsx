import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Welcome from "../screens/Welcome";
import UserIndentification from "../screens/UserIndentification";
import Confirmation from "../screens/Confirmation";

import colors from "../styles/colors";
import PlantSelect from '../screens/PlantSelect';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <stackRoutes.Navigator
      headerMode="none"
      initialRouteName="Welcome"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <stackRoutes.Screen 
      name="Welcome" 
      component={Welcome} 
      />
      <stackRoutes.Screen
        name="UserIndentification"
        component={UserIndentification}
      />
      <stackRoutes.Screen 
      name="Confirmation" 
      component={Confirmation} 
      />
      <stackRoutes.Screen 
      name="PlantSelect" 
      component={PlantSelect} 
      />

    </stackRoutes.Navigator>
  );
};

export default AppRoutes;
