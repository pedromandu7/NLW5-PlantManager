import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import wateringImg from '../assets/watering.png';
import colors from '../styles/colors.ts';
import ButtonWelcome from '../components/button/index';

const Welcome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gerencie {'\n'}
        suas plantas de{'\n'}
        forma fácil
  </Text>
      <Image source={wateringImg} style={styles.image} />
      <Text style={styles.subtitle}>
        Não esqueça mais de regar suas{'\n'}
      plantas. Nós cuidamos de lembrar você{'\n'}
      sempre que precisar.</Text>
      <ButtonWelcome title={'Start'} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    marginTop: 50,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.heading,
  },
  image: {
  },
  buttonText: {
    fontSize: 24,
    color: colors.white,
  }

})
export default Welcome;