import React from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { RectButtonProps, RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { SvgFromUri } from "react-native-svg";
import { Feather } from "@expo/vector-icons";
// import { Entypo } from "@expo/vector-icons";
import colors from "../../styles/colors";
import fonts from "../../styles/font";

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
  handleRemove: () => void;
}

const PlantCardSecondary = ({ data, handleRemove, ...rest }: PlantProps) => {

  return (
    <Swipeable 
    friction={2}
    // rightThreshold={41}
    overshootRight={false} 
    renderRightActions={() => (
      <Animated.View>
        <View>
          <RectButton
            style={styles.buttonRemove}
            onPress={handleRemove}
          >

            <Feather name="trash" size={32} color={colors.white}/>
            
          </RectButton>
        </View>
      </Animated.View>
    )}
    
    >
      <RectButton style={styles.container} {...rest}>
        <SvgFromUri uri={data.photo} width={50} height={50} />
        <Text style={styles.title}>{data.name}</Text>

        <View style={styles.details}>
          <View style={styles.detailsCenter}>
            <Text style={styles.timeLabel}>Regar às</Text>

            <Text style={styles.time}>{data.hour}</Text>
          </View>
        </View>
      </RectButton>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.shape,
    marginVertical: 5,
  },
  title: {
    flex: 1,
    marginLeft: 3,
    marginRight: 10,
    fontFamily: fonts.heading,
    fontSize: 16,
    color: colors.heading,
  },
  details: {
    justifyContent: "flex-end",
  },
  detailsCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  timeLabel: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.body_dark,
  },
  time: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonRemove: {
    width: 100,
    height: 85,
    backgroundColor: colors.red,
    margin: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    right: 25,
    padding: 5, 
  },
});
export default PlantCardSecondary;
