import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

export interface PlantProps {
  // hour: string;
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  };
  dateTimeNotification: Date;
  hour: string;
}

interface StoragePlantProps {
  [id: string]: {
    data: PlantProps;
  };
}

export async function savePlant(plant: PlantProps): Promise<void | any> {
  // | any caso de erro adidcionar o tipo any ao lado do void
  try {
    // const deleteData = await AsyncStorage.removeItem("@plantmanager:plants");
    // console.log(deleteData);
    // console.log('deleteData fooooooooooooi');
    const data = await AsyncStorage.getItem("@plantmanager:plants");
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};
    console.log(oldPlants);

    const newPlant = {
      [plant.id]: {
        data: plant,
      },
    };

    await AsyncStorage.setItem(
      "@plantmanager:plants",
      JSON.stringify({
        ...newPlant, // ... Spread Operator
        ...oldPlants,
      })
    );
    return oldPlants;
  } catch {
    (err: Error) => console.log(err);
  }
}

export async function deletePlant(plant: PlantProps): Promise<void> {
  try {
    const data = await AsyncStorage.removeItem("@plantmanager:plants");

    return data;
  } catch {
    (err: Error) => console.log(err);
  }
}

export async function loadPlant(): Promise<PlantProps[] | undefined> {
  try {
    const data = await AsyncStorage.getItem("@plantmanager:plants");
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    // console.log(plants);

    const plantSorted = Object.keys(plants)
      .map((plant) => {
        const val = {
          ...plants[plant].data,
          hour: format(
            new Date(plants[plant].data.dateTimeNotification),
            "HH:mm"
          ),
        };
        return val;
      })
      .sort((a, b) =>
        Math.floor(
          new Date(a.dateTimeNotification).getTime() / 1000 -
            Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
        )
      );

    // return plants;
    return plantSorted; //apagar a linha de cima
  } catch {
    (err: any) => console.log(err);
  }
}
