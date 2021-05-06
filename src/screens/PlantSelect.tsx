import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import EnviromentButtom from "../components/EnviromentButtom";

import Header from "../components/Header";
import PlantCardPrimary from "../components/PlantCardPrimary/index";
import Load from "../components/Load";
import { PlantProps } from '../libs/storage';

import api from "../services/api";

import colors from "../styles/colors";
import fonts from "../styles/font";

interface EnviromentProps {
  key: string;
  title: string;
}



const PlantSelect = ({ navigation }: any) => {
  const [enviroments, setEnvironments] = useState<EnviromentProps[]>();
  const [plants, setPlants] = useState<PlantProps[]>();
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>();
  const [environmentSelected, setEnvironmentSelected] = useState("all");
  
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);

  const handlerEnvironmentSelected = (environment: string) => {
    setEnvironmentSelected(environment);

    if (environment == "all")  console.log(plants);
    if (environment == "all") return setFilteredPlants(plants);

    const filtered = plants?.filter((plant) =>
      plant.environments.includes(environment)
    );
    // console.log(filtered);

    setFilteredPlants(filtered);
  };

  async function fetchPlants() {
    const { data } = await api.get(
      `plants?_sort=name&_order=asc&_page=${page}&_limit=8`
    );

    if (!data) {
      return setLoading(true);
    }

    if (page >= 2) {
      setPlants((oldValue) => [...oldValue as any, ...data]);
      setFilteredPlants((oldValue) => [...oldValue as any, ...data]);
      console.log("ao recarregar page no PlantSelect    "+page); //test
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoadingMore(false);
    setLoading(false);
  }

  const handleFatchMore = (distance: number) => {
    if (distance < 1) return;
    setLoadingMore(true);
    setPage((oldValue) => oldValue + 1);
    fetchPlants();
  };


  const handlePlantSelect =(plant: PlantProps)=>{
    // console.log('rodow');
    navigation.navigate('PlantSave', { plant });
  };

  useEffect(() => {
    async function fetchEnviroment() {
      const { data } = await api.get(
        "plants_environments?_sort=title&_order=asc"
      );
      setEnvironments([
        {
          key: "all",
          title: "Todos",
        },
        ...data,
      ]);
    }
    fetchEnviroment();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  if (loading) return <Load />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <View>
          <Text style={styles.title}>Em qual hambiente </Text>
          <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
        </View>
      </View>
      <View>
        <FlatList
          data={enviroments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnviromentButtom
              key={item.key}
              title={item.title}
              active={item.key === environmentSelected}
              onPress={() => handlerEnvironmentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary 
            data={item} 
            key={item.id}
            onPress={()=>handlePlantSelect(item)}
            />
          )}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFatchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 17,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginTop: 20,
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    color: colors.heading,
  },
  enviromentList: {
    height: 40,
    // justifyContent: "center",
    // paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
  contentContainerStyle: {},
});
export default PlantSelect;
