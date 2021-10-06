import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';
import { JobCardComponent } from '~/components/job/card';
import { LoadComponent } from '~/components/load';
import { ListItem, useJob } from '~/contexts';
import { delay } from '~/utils/delay';
import { styles } from './styles';
import { AppRoutes as Routes } from '~/constants';

export const RequestsJobsScreen: React.FC<DrawerContentComponentProps> = ({
  navigation,
}) => {
  const { requestsList, selectJob, getRequests } = useJob();

  const [states, setStates] = useState({
    page: 1,
    fetching: true,
    refreshing: false,
    loading: false,
    retries: 3,
  });

  const entryPoint = async () => {
    getRequests({}).then(() =>
      delay(1500).then(() => setStates((s) => ({ ...s, fetching: false })))
    );
  };

  const onRefresh = async () => {
    setStates((s) => ({ ...s, refreshing: true, page: 1, retries: 3 }));
    getRequests({}).then(() => setStates((s) => ({ ...s, refreshing: false })));
  };

  const onEndReached = async () => {
    if (states.retries <= 0) {
      setTimeout(() => {
        console.log('Reseting Requests Retries');
        setStates((s) => ({ ...s, retries: 3 }));
      }, 5000);
    }

    const start = new Date().getTime();
    if (states.retries > 0) {
      setStates((s) => ({ ...s, loading: true, page: s.page + 1 }));
      getRequests({ add: true, page: states.page }).then(() => {
        const end = new Date().getTime();

        const diff = new Date(end - start).getMilliseconds();
        if (diff < 750) {
          setStates((s) => ({ ...s, retries: s.retries - 1 }));
        }

        setStates((s) => ({ ...s, loading: false }));
      });
    }
  };

  const onOpenJob = async (item: ListItem) => {
    setStates((s) => ({ ...s, fetching: true }));
    ToastAndroid.show('Carregando...', ToastAndroid.SHORT);

    selectJob(item.id);

    delay(1500).then(() => {
      navigation.navigate(Routes.JobsDetailsRouter, {
        isContratante: true,
        isContratado: false,
        isCandidato: false,
      });
      setStates((s) => ({ ...s, fetching: false }));
    });
  };

  useEffect(() => {
    entryPoint();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {states.fetching ? (
        <LoadComponent center />
      ) : (
        <FlatList
          data={requestsList}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={{ paddingVertical: 10 }} />
          )}
          renderItem={({ item }) => (
            <JobCardComponent
              {...item}
              key={item.id}
              onPress={() => onOpenJob(item)}
            />
          )}
          keyExtractor={({ id }) => String(id)}
          refreshControl={
            <RefreshControl
              refreshing={states.refreshing}
              onRefresh={onRefresh}
            />
          }
          contentContainerStyle={{
            paddingBottom: 30,
          }}
          onEndReachedThreshold={0.01}
          onEndReached={({ distanceFromEnd }) => {
            if (distanceFromEnd < 100 && !states.loading) {
              onEndReached();
            }
          }}
          ListFooterComponent={() =>
            states.loading ? <LoadComponent /> : null
          }
          decelerationRate="fast"
        />
      )}
    </SafeAreaView>
  );
};
