import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { SvgFromUri } from "react-native-svg";
import { useRoute } from "@react-navigation/core";
import DateTimePicker, { Event }from "@react-native-community/datetimepicker";
import { format, isBefore } from "date-fns";

import waterdrop from "../assets/waterdrop.png";
import Button from "../components/button";
import { loadPlant, PlantProps, savePlant } from "../libs/storage";
import colors from "../styles/colors";
import fonts from "../styles/font";

interface Params {
  plant: PlantProps;
}

const PlantSave = ({navigation}: any) => {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios");

  const route = useRoute();
  const { plant } = route.params as Params;

  async function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === "android") {
      setShowDatePicker((oldState) => !oldState);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert("Escolha uma hora no futuro!");
    }

    if (dateTime) {
     setSelectedDateTime(dateTime);
      console.log(dateTime);
    }
  }

  function handleOpenDateTimePickerForAndroid() {
    setShowDatePicker((oldState) => !oldState);
  }

  async function handleSave() {
   try {
     
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime,
      });

      navigation.navigate("Confirmation",  {
        title: "Tudo certo",
        subtitle:
          "Fique tranquilo que vamos lembrar você de cuidar da sua plantinha com muito cuidado.",
        buttonTitle: "Muito Obrigado :D",
        icon: "hug",
        nextScreen: "MyPlants",
      })

    } catch (error) {
      Alert.alert("Não foi possivel salvar! ");
    }
  }
  return (
    // <ScrollView style={styles.scroll}>
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri uri={plant.photo} height={150} width={150} />

        <Text style={styles.plantName}>
          {plant.name}
        </Text>

        <Text style={styles.plantAbout}>
          {plant.about}
        </Text>
      </View>

      <View style={styles.controller}>
        <View style={styles.tipController}>
          <Image 
            source={waterdrop} 
            style={styles.tipImage} 
          />
          <Text style={styles.tipText}>
            {plant.water_tips}
          </Text>
        </View>
        <Text style={styles.alertLabel}>
          Escolha o melhor horário para ser lembrado:
        </Text>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDateTime}
            mode="time"
            display="spinner"
            // onChange={ () => handleChangeTime}
            onChange={handleChangeTime}
          />
        )}
        {Platform.OS === "android" && (
          <TouchableOpacity
            style={styles.dateTimePickerButton}
            onPress={handleOpenDateTimePickerForAndroid}
          >
            <Text style={styles.dateTimePicker}>{`Alarme: ${format(
              selectedDateTime,
              "HH:mm"
            )}`}</Text>
          </TouchableOpacity>
        )}

        <Button title="Cadastrar planta" onPress={handleSave} />
      </View>
    </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    // justifyContent: "space-between",
    backgroundColor: colors.shape,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.shape,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 20, //30
    paddingVertical: 50,
    // paddingBottom:50,
    paddingTop:30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.shape,
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 1,
  },
  plantAbout: {
    textAlign: "center",
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    // marginTop: 20,
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 0,//20
    paddingBottom: 10,//20
  },
  tipController: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.blue_light,
    padding: 15,//20
    borderRadius: 20,
    position: "relative",
    bottom: 60,
  },
  tipImage: {
    width: 54,
    height: 54,
  },
  tipText: {
    flex: 1,
    marginLeft: 15,//20
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: "justify",
  },
  alertLabel: {
    textAlign: "center",
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginTop:-30,
    marginBottom:-10,//5
    position: 'relative',
  },
  dateTimePickerButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,//40
  },
  dateTimePicker: {
    // marginTop: 0,
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  },
});
export default PlantSave;