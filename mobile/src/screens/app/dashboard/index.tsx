import React, { useState, useEffect } from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import {
  RefreshControl,
  SafeAreaView,
  View,
  FlatList,
  ToastAndroid,
} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';

// Context
import { useJob, ListItem, useRank } from '~/contexts';

// Components
import { LoadComponent } from '~/components/load';
import { HelpComponent } from '~/components/help';
import { JobCardComponent } from '~/components/job/card';
import { DashboardHeader } from './header';
import { DashboardFilter } from './filter';

// Others
import { styles } from './styles';
import { lorem } from '~/utils/lorem-ipsum';
import { AppRoutes as Routes } from '~/constants/routes';
import { fabActions } from './options';
import { delay } from '~/utils/delay';
import { handleMessage } from '~/errors/handle-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AREA_FILTER_VALUE,
  CIDADE_FILTER_VALUE,
  GRUPO_FILTER_VALUE,
} from '~/constants/constants';

interface DashboardStates {
  page: number;
  help: boolean;
  filter: boolean;
  hasFilter: boolean;
  fetching: boolean;
  checkbox: boolean;
  loading: boolean;
  refreshing: boolean;
  retries: number;
}

export const DashboardScreen: React.FC<DrawerContentComponentProps> = ({
  navigation,
}) => {
  const {
    defaultFetch,
    topFetch,
    filteredFetch,
    bottomFetch,
    jobList,
    filters,
    selectJob,
    setFilters,
  } = useJob();
  const { getUserRank } = useRank();

  const [states, setState] = useState<DashboardStates>({
    page: 1,
    help: false,
    filter: false,
    hasFilter: false,
    fetching: false,
    checkbox: false,
    loading: false,
    refreshing: false,
    retries: 3,
  });

  const entryPoint = async () => {
    try {
      setState((s) => ({ ...s, fetching: true }));

      const cidade = (await AsyncStorage.getItem(CIDADE_FILTER_VALUE)) || '';
      const grupo = (await AsyncStorage.getItem(GRUPO_FILTER_VALUE)) || '';
      const area = (await AsyncStorage.getItem(AREA_FILTER_VALUE)) || '';

      if (cidade || grupo || area) {
        setState((s) => ({ ...s, hasFilter: true }));
        setFilters({ cidade, grupo, area });
      }

      await defaultFetch();

      setState((s) => ({ ...s, fetching: false }));
    } catch (err) {
      console.log(handleMessage(err));
      ToastAndroid.show('Ocorreu um erro!', ToastAndroid.SHORT);
    }
  };

  const cleanState = () =>
    setState({
      page: 0,
      refreshing: false,
      fetching: false,
      hasFilter: false,
      checkbox: false,
      loading: false,
      filter: false,
      help: false,
      retries: 3,
    });

  const resetFilters = async () => {
    setFilters({ area: '', cidade: '', grupo: '' });
    setState((s) => ({
      ...s,
      filter: false,
      hasFilter: false,
      area: '',
      grupo: '',
      cidade: '',
      checkbox: false,
    }));

    await AsyncStorage.removeItem(AREA_FILTER_VALUE);
    await AsyncStorage.removeItem(GRUPO_FILTER_VALUE);
    await AsyncStorage.removeItem(CIDADE_FILTER_VALUE);
  };

  const onOpenJob = async (item: ListItem) => {
    selectJob(item.id);
    getUserRank(item.idusuario).then(() => {
      ToastAndroid.show('Carregando...', ToastAndroid.SHORT);
      delay(1500).then(() => {
        navigation.navigate(Routes.JobsDetailsRouter, {
          isContratante: false,
          isContratado: false,
          isCandidato: true,
        });
      });
    });
  };

  const fetchData = async (type: 'top' | 'bottom' | 'filtered') => {
    try {
      // BUG: Bottom com ComboBox
      const start = new Date().getTime();

      if (states.retries <= 0) {
        setTimeout(() => {
          console.log('Reseting Dashboard Retries');
          setState((s) => ({ ...s, retries: 3 }));
        }, 10000);
      }

      if (states.retries > 0) {
        switch (type) {
          case 'top':
            if (states.hasFilter) {
              setState((s) => ({
                ...s,
                page: 1,
                retries: 3,
                refreshing: true,
              }));
              if (states.checkbox) {
                await filteredFetch({ checkbox: true, page: 0 });
              } else {
                await filteredFetch({ ...filters, page: 0 });
              }
            } else {
              setState((s) => ({ ...s, page: 1, refreshing: true }));
              await topFetch();
            }
            break;
          case 'bottom':
            setState((s) => ({ ...s, loading: true, page: s.page + 1 }));
            if (states.hasFilter) {
              if (states.checkbox) {
                // console.log('BOTTOM COM CHECKBOX', state);

                await filteredFetch({ checkbox: true, page: states.page++ });
              } else {
                // console.log('BOTTOM COM FILTRO', state);

                await filteredFetch({
                  ...filters,
                  add: true,
                  page: states.page++,
                });
              }
            } else {
              // console.log('BOTTOM FETCH', state);

              await bottomFetch({ page: states.page++ });
            }
            break;
          case 'filtered':
            if (
              !states.checkbox &&
              !filters.area &&
              !filters.cidade &&
              !filters.grupo
            ) {
              setState((s) => ({ ...s, filter: false }));
              return;
            }

            setState((s) => ({
              ...s,
              refreshing: true,
              hasFilter: true,
              page: 1,
              filter: false,
            }));
            if (states.checkbox) {
              await filteredFetch({ checkbox: true, page: 0 });
            } else {
              await filteredFetch({ ...filters, page: 0 });
            }
            break;
          default:
            await defaultFetch(states.page);
            break;
        }

        const end = new Date().getTime();
        const diff = new Date(end - start).getMilliseconds();
        if (diff < 800) {
          setState((s) => ({ ...s, retries: s.retries - 1 }));
        }

        setState((s) => ({
          ...s,
          refreshing: false,
          loading: false,
          filter: false,
        }));
      }

      // console.log('FINAL', state);
    } catch (err) {
      console.log(handleMessage(err));
      cleanState();
    }
  };

  useEffect(() => {
    entryPoint();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <DashboardHeader
        changeColor={states.hasFilter ? 'red' : 'black'}
        onDrawer={() => navigation.toggleDrawer()}
        onFilter={() => setState((s) => ({ ...s, filter: true }))}
      />

      {states.fetching ? (
        <LoadComponent />
      ) : (
        <FlatList
          data={jobList}
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
              onRefresh={() => fetchData('top')}
            />
          }
          contentContainerStyle={{
            paddingBottom: 30,
          }}
          onEndReachedThreshold={0.01}
          onEndReached={({ distanceFromEnd }) => {
            if (distanceFromEnd < 100 && !states.loading) {
              fetchData('bottom');
            }
          }}
          ListFooterComponent={() =>
            states.loading ? <LoadComponent /> : null
          }
          decelerationRate="fast"
        />
      )}

      <FloatingAction
        color="black"
        actions={fabActions}
        onPressItem={(name) => {
          name === 'help' && setState((s) => ({ ...s, help: true }));
          name === 'job' && navigation.navigate(Routes.NewJobRouter);
        }}
      />

      {states.help && (
        <HelpComponent
          fn={() => setState((s) => ({ ...s, help: false }))}
          text={`${lorem(10)}`}
        />
      )}

      {states.filter && (
        <DashboardFilter
          // status={states.checkbox}
          onFilter={() => fetchData('filtered')}
          // onCheckbox={() => setState((s) => ({ ...s, checkbox: !s.checkbox }))}
          onModalClose={resetFilters}
          onGrupoChange={(grupo) =>
            setState((s) => ({ ...s, grupo: String(grupo) }))
          }
          onAreaChange={(area) =>
            setState((s) => ({ ...s, area: String(area) }))
          }
          onCidadeChange={(cidade) =>
            setState((s) => ({ ...s, cidade: String(cidade) }))
          }
        />
      )}
    </SafeAreaView>
  );
};
