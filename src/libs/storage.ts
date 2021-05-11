import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
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

export interface StoragePlantProps {
  [id: string]: {
    data: PlantProps;
    notificationId: string; 
  };
}

export async function savePlant(plant: PlantProps): Promise<void | any> {
  // | any caso de erro adidcionar o tipo any ao lado do void
  try {
    const nextTime =new Date(plant.dateTimeNotification);
    const now = new Date();

    const { times, repeat_every } = plant.frequency;
    if (repeat_every === 'week') {
      const interval = Math.trunc( 7 / times );
      nextTime.setDate(now.getDate() + interval);
    } 
    else{
      nextTime.setDate(nextTime.getDate() + 1)
    }
    const seconds = Math.abs(
      Math.ceil(now.getTime() - nextTime.getTime()) / 1000);
    

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title:'Heeey, 🌱',
        body: `Está na hora de cuidar da sua ${plant.name}`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data:{
          plant
        },
      },
      trigger: {
        seconds: seconds < 60 ? 60 : seconds,
        repeats: true 
      }
    })
  

    const data = await AsyncStorage.getItem("@plantmanager:plants");
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};
    // console.log(oldPlants);

    const newPlant = {
      [plant.id]: {
        data: plant,
        notificationId,
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

export async function removePlant(id: string): Promise<void> {
  const data = await AsyncStorage.getItem("@plantmanager:plants");
  const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

  await Notifications.cancelScheduledNotificationAsync(plants[id].notificationId);
  delete plants[id];

  await AsyncStorage.setItem(
    "@plantmanager:plants",
   JSON.stringify(plants)
  );
}
