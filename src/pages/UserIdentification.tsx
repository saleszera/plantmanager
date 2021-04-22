import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification(): JSX.Element {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isFieldEmpty, setIsFieldEmpty] = useState(false);
  const [name, setName] = useState<string>();
  const { navigate } = useNavigation();

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!name);
    setIsFieldEmpty(false);
  }

  function handleInputFocus() {
    setIsFocused(true);
    setIsFieldEmpty(false);
  }

  function handleInputChange(value: string) {
    setIsFilled(!isFilled);
    setName(value);
  }

  async function handleSubmit() {
    if (!name) {
      setIsFieldEmpty(true);

      ToastAndroid.showWithGravity(
        'Me diga como devo chamar você 😢️',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else {
      setIsFieldEmpty(false);

      try {
        await AsyncStorage.setItem('@plantmanager:user', name);
        navigate('Confirmation');
      } catch {
        ToastAndroid.showWithGravity(
          'Não foi possível salvar o seu nome. 😢️',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>{isFilled ? '😄️' : '😀️'}</Text>
                <Text style={styles.title}>
                  Como podemos {'\n'} chamar você?
                </Text>

                <TextInput
                  style={[
                    styles.input,
                    (isFocused || isFilled) && { borderColor: colors.green },
                    isFieldEmpty && {
                      borderColor: colors.red,
                    },
                  ]}
                  placeholder="Digite um nome"
                  onBlur={handleInputBlur}
                  onFocus={handleInputFocus}
                  onChangeText={handleInputChange}
                />
              </View>

              <View style={styles.footer}>
                <Button title="Confirmar" onPress={handleSubmit} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  content: {
    flex: 1,
    width: '100%',
  },

  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center',
  },

  header: {
    alignItems: 'center',
    width: '100%',
  },

  emoji: {
    fontSize: 44,
  },

  title: {
    fontSize: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 32,
    marginTop: 20,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
  },

  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20,
  },
});
