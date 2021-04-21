import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { Header } from '../components/Header';
import { EnvironmentButton } from '../components/EnvironmentButton';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { api } from '../services/api';
import { PlantCardPrimary } from '../components/PlantCardPrimary';

interface EnvironmentProps {
  key: string;
  title: string;
}

interface PlantsProps {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string[];
  frequency: {
    times: number;
    repeat_every: string;
  };
}

export function PlantSelect(): JSX.Element {
  const [environment, setEnvironment] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantsProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantsProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState('all');

  function handleEnvironmentSelected(item: string) {
    setEnvironmentSelected(item);

    if (item === 'all') {
      return setFilteredPlants(plants);
    }

    const filtered = plants.filter(plant => plant.environments.includes(item));

    return setFilteredPlants(filtered);
  }

  useEffect(() => {
    async function fectEnvironment() {
      const { data } = await api.get(
        '/plants_environments?_sort=title&_order=asc'
      );
      setEnvironment([
        {
          key: 'all',
          title: 'Todos',
        },
        ...data,
      ]);
    }

    fectEnvironment();
  }, []);

  useEffect(() => {
    async function fectPlants() {
      const { data } = await api.get('/plants?_sort=name&_order=asc');
      setPlants(data);
    }

    fectPlants();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>Você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          data={environment}
          renderItem={({ item }) => (
            <EnvironmentButton
              key={item.key}
              title={item.title}
              active={item.key === environmentSelected}
              onPress={() => handleEnvironmentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          renderItem={({ item }) => (
            <PlantCardPrimary key={item.id} data={item} />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },

  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
  },

  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
});
