import React, { useState } from 'react';
import { Text } from 'react-native';

import {
  TabView,
  SceneMap,
  TabBar,
  NavigationState,
  SceneRendererProps,
} from 'react-native-tab-view';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

// Screens
import { JobHistoryScreen } from './historico';
import { RequestsJobsScreen } from './publicados';

import { colors } from '~/constants/colors';

export const MyRequestsAndHistoryScreens: React.FC<DrawerContentComponentProps> = (
  props
) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'history', title: 'Histórico' },
    { key: 'requests', title: 'Pedidos' },
  ]);

  const renderScene = SceneMap({
    history: () => <JobHistoryScreen {...props} />,
    requests: () => <RequestsJobsScreen {...props} />,
  });

  const tabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{ key: string; title: string }>;
    }
  ) => (
    <TabBar
      {...props}
      style={{ backgroundColor: 'white' }}
      pressColor={colors.greyLight}
      indicatorStyle={{ backgroundColor: colors.blueSky }}
      renderLabel={({ route }) => (
        <Text style={{ color: 'black' }}>{route.title}</Text>
      )}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={tabBar}
    />
  );
};
