import React, { useState } from 'react';
import { Text } from 'react-native';

import {
  TabView,
  SceneMap,
  TabBar,
  NavigationState,
  SceneRendererProps,
} from 'react-native-tab-view';

// Screens
import { UserDataScreen } from './profile';
import { UserAddressScreen } from './endereco';
import { ProfileAvaliacaoScreen } from './avaliacao';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { colors } from '~/constants/colors';

export const ProfileScreen: React.FC<DrawerContentComponentProps> = (props) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'profile', title: 'Perfil' },
    { key: 'address', title: 'Endereço' },
    { key: 'avaliation', title: 'Avaliação' },
  ]);

  const renderScene = SceneMap({
    profile: () => <UserDataScreen {...props} />,
    address: () => <UserAddressScreen {...props} />,
    avaliation: () => <ProfileAvaliacaoScreen {...props} shouldGet />,
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
