import React, { useEffect, useState } from "react";
import { StyleSheet, 
  View, 
  Text, 
  Image, 
  FlatList } from "react-native";
  import { formatDistance } from "date-fns";
  import { pt } from "date-fns/locale";

import Header from "../components/Header/index";
import { loadPlant, PlantProps  } from "../libs/storage";
import PlantCardSecondary from "../components/PlantCardSecondary";
import colors from "../styles/colors";
import font from "../styles/font";
import waterdrop from "../assets/waterdrop.png";

const MyPlants = ({ navigation }: any) => {
  const [myPlants, setMyPlants] = useState<PlantProps []>([]);
  const [loading, setLoading] = useState(true);
  const [nextWaterd, setNextWaterd] = useState<string>();

  useEffect(() => {
    async function loadStorageData() {
      // const plantsStoraged = await loadPlant();
      // console.log(plantsStoraged); 
      // console.log( 'acima temos o plantsStorage do MyPlants'); 
      const plantsStoraged = await loadPlant();
      
      // plantsStoraged as PlantProps [];
      if (plantsStoraged === undefined) {
          setNextWaterd(
          `Não há plantas salvas!.`
        );
        return
      }
      
      console.log('abaixo esta o plantsStorage in MyPlants');
      console.log(plantsStoraged[0].dateTimeNotification);
      console.log('acima esta o plantsStorage in MyPlants');

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

       setNextWaterd(
        `Regue a sua ${plantsStoraged[0].name} daqui à ${nextTime}.`
      );

      setMyPlants(plantsStoraged);
      setLoading(false);
    }
    loadStorageData()
  },[]);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.spotlight}>
        <Image 
          source={waterdrop} 
          style={styles.image} 
        />
       
        <Text style={styles.spotlightText}>
          {nextWaterd}
        </Text>
        
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantTitle}>Próximas regas</Text>

        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            // <Text> aqui foi tio e reperte hehe</Text>
          <View>
            <PlantCardSecondary data={item} key={item.id}/>
            </View>
          )
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal:10,
    borderRadius:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width:60,
    height:60
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  plants: {
    flex:1,
    width: '100%',

  },
  plantTitle: {
    fontSize: 24,
    fontFamily: font.heading,
    color: colors.heading,
    marginVertical: 20,
  },
});

export default MyPlants;
