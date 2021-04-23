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

import api from "../services/api";

import colors from "../styles/colors";
import fonts from "../styles/font";

interface EnviromentProps {
  key: string;
  title: string;
}

interface PlantProps {
  id: 1;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  };
}

const PlantSelect = () => {
  const [enviroments, setEnvironments] = useState<EnviromentProps[]>();
  const [plants, setPlants] = useState<PlantProps[]>();
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>();
  const [environmentSelected, setEnvironmentSelected] = useState("all");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(true);
  const [loadedAll, setLoadedAll] = useState(true);

  const handlerEnvironmentSelected = (environment: string) => {
    setEnvironmentSelected(environment);
    if (environment == "all") return setFilteredPlants(plants);

    const filtered = plants?.filter((plant) =>
      plant.environments.includes(environment)
    );
    console.log(filtered);

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
      setPlants((oldValue) => [...oldValue, ...data]);
      setFilteredPlants((oldValue) => [...oldValue, ...data]);
      console.log(page); //test
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
          renderItem={({ item }) => (
            <EnviromentButtom
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
          renderItem={({ item }) => <PlantCardPrimary data={item} />}
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
