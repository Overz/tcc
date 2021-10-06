import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, ToastAndroid } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useJob, useRank } from '~/contexts';
import { LoadComponent } from '~/components/load';
import { AppHeaderComponent } from '~/components/header/app';
import { CardCandidate } from './item';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { AppRoutes as Routes } from '~/constants';

export const CandidatosScreen: React.FC<DrawerContentComponentProps> = (
  props
) => {
  const { candidatosList, findCandidates, job, selectCandidate } = useJob();
  const { getUserRank } = useRank();
  const [states, setStates] = useState({
    fetching: true,
    retries: 3,
  });

  useEffect(() => {
    findCandidates(job?.id as number).then(() =>
      setStates((s) => ({ ...s, fetching: false }))
    );
  }, [job]);

  return (
    <SafeAreaView style={styles.container}>
      <AppHeaderComponent {...props} text="Candidatos">
        <MaterialIcons
          name="dashboard-customize"
          size={24}
          color="black"
          onPress={() => props.navigation.navigate(Routes.DashboardRouter)}
        />
      </AppHeaderComponent>

      {states.fetching ? (
        <LoadComponent center />
      ) : (
        <FlatList
          data={candidatosList}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={{ paddingVertical: 10 }} />
          )}
          renderItem={({ item }) => (
            <CardCandidate
              {...item}
              key={item.id}
              onPress={() => {
                ToastAndroid.show('Carregando...', ToastAndroid.SHORT);
                selectCandidate(item);
                getUserRank(item.id).then(() =>
                  props.navigation.navigate(Routes.ProfileAvaliationRouter, {
                    isContratacao: true,
                    isAvaliacao: false,
                  })
                );
              }}
            />
          )}
          keyExtractor={({ id }) => String(id)}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
          refreshing={false}
          decelerationRate="fast"
        />
      )}
    </SafeAreaView>
  );
};
