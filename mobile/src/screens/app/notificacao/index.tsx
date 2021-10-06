import React, { useEffect, useState } from 'react';
import { View, FlatList, SafeAreaView, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

import { NotificationData, useJob, useNotification, useRank } from '~/contexts';

import { LoadComponent, AppHeaderComponent } from '~/components';

import {
  HAS_NOTIFICATION,
  AppRoutes as Routes,
  NOTIFICATIONS_DATA,
} from '~/constants';
import { styles } from './styles';
import { NotifyItem } from './notify';
import { delay } from '~/utils/delay';

export const NotificationScreen: React.FC<DrawerContentComponentProps> = (
  props
) => {
  const { notifications, setVisto, setNotifications } = useNotification();
  const { selectJob } = useJob();
  const { getUserRank } = useRank();
  const [states, setStates] = useState({ fetching: true, shouldGet: false });

  const handleNotification = async (item: NotificationData) => {
    const { data, id } = item;
    ToastAndroid.show('Carregando...', ToastAndroid.SHORT);
    selectJob(data.trampo);

    const updated = [...notifications];
    const i = updated.findIndex(({ data }) => data.id === id);
    updated[i] = { ...updated[i], data: { ...updated[i].data, visto: true } };

    setNotifications(updated);
    await AsyncStorage.setItem(NOTIFICATIONS_DATA, JSON.stringify(updated));

    setVisto(id).then(() => {
      if (data.tipo === 'N') {
        // TODO: Levar a tela de aceitar candidatos
        console.log('TIPO: N');
        delay(1000).then(() =>
          props.navigation.navigate(Routes.CandidatesRouter)
        );
      }

      if (data.tipo === 'F') {
        // TODO: Levar a tela de Avaliação
        console.log('TIPO: F');
        getUserRank(data.notificante).then(() =>
          props.navigation.navigate(Routes.ProfileAvaliationRouter, {
            isAvaliacao: true,
            isContratacao: false,
            isEnable: true,
          })
        );
      }

      if (data.tipo === 'A') {
        // TODO: Levar a tela de detalhes do trampo
        console.log('TIPO: A');
        delay(1000).then(() =>
          props.navigation.navigate(Routes.JobsDetailsRouter, {
            isContratado: true,
            isContratante: false,
            isCandidato: false,
          })
        );
      }

      if (data.tipo === 'C') {
        // TODO: Levar a tela de detalhes do trampo, Sem opção para seleção
        console.log('TIPO: C');
        props.navigation.navigate(Routes.JobsDetailsRouter, {
          isContratado: false,
          isContratante: false,
          isCandidato: false,
        });
      }
    });
  };

  useEffect(() => {
    AsyncStorage.removeItem(HAS_NOTIFICATION);
    const {
      route: { params },
    } = props as any;

    if (params.shouldGet || states.shouldGet) {
      AsyncStorage.getItem(NOTIFICATIONS_DATA).then((data) => {
        if (data) {
          setNotifications(JSON.parse(data));
        }
      });
    }

    delay(2000).then(() => setStates((s) => ({ ...s, fetching: false })));
  }, [props]);

  return (
    <SafeAreaView style={styles.container}>
      <AppHeaderComponent
        {...props}
        text="Notificações"
        fn={() => setStates((s) => ({ ...s, shouldGet: false }))}
      />
      {states.fetching ? (
        <LoadComponent center />
      ) : (
        <FlatList
          data={notifications}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={{ paddingVertical: 10 }} />
          )}
          renderItem={({ item }) => (
            <NotifyItem
              visto={item.data.visto}
              {...props}
              {...item}
              onPress={() => handleNotification(item)}
            />
          )}
          refreshing={false}
          keyExtractor={({ id }) => String(id)}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
          onEndReachedThreshold={0.01}
          decelerationRate="fast"
        />
      )}
    </SafeAreaView>
  );
};
