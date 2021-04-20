import React from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Welcome(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {'\n'} suas plantas de {'\n'} forma fácil
        </Text>

        <Image style={styles.image} source={wateringImg} resizeMode="contain" />

        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
          sempre que precisar
        </Text>

        <TouchableOpacity style={styles.button} activeOpacity={0.7}>
          <Feather style={styles.buttonIcon} name="chevron-right" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 34,
    marginTop: 38,
  },

  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fonts.text,
    paddingHorizontal: 20,
    color: colors.heading,
  },

  image: {
    height: Dimensions.get('window').width * 0.7,
  },

  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },

  buttonIcon: {
    color: colors.white,
    fontSize: 32,
  },
});
