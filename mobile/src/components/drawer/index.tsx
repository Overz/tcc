/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { Avatar } from 'react-native-paper';

// Context
import { useAuth } from '~/contexts/auth';

// Others
import { styles } from './styles';
import { AppRoutes as Routes } from '~/constants/routes';
import { NOTIFICATIONS_DATA } from '~/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Content {
  text: JSX.Element;
  icon: JSX.Element;
  fn: (
    _navigation: DrawerNavigationHelpers,
    _fn?: () => void,
    _fn2?: () => void
  ) => void;
}

const content: Content[] = [
  {
    icon: <MaterialIcons name="dashboard" size={25} color="black" />,
    text: <Text style={styles.text}>Dashboard</Text>,
    fn: (navigation) => navigation.navigate(Routes.DashboardRouter),
  },
  {
    icon: <MaterialIcons name="account-tree" size={25} color="black" />,
    text: <Text style={styles.text}>Pedidos e Históricos</Text>,
    fn: (navigation) => navigation.navigate(Routes.MyRequestsAndHistoryRouter),
  },
  {
    icon: <Ionicons name="person-circle-outline" size={25} color="black" />,
    text: <Text style={styles.text}>Perfil</Text>,
    fn: (navigation) => navigation.navigate(Routes.ProfileRouter),
  },
  {
    icon: <MaterialIcons name="notifications" size={25} color="black" />,
    text: <Text style={styles.text}>Notificações</Text>,
    fn: (navigation) =>
      navigation.navigate(Routes.NotificationRouter, { shouldGet: true }),
  },
  {
    icon: <MaterialIcons name="help" size={25} color="black" />,
    text: <Text style={styles.text}>Ajuda</Text>,
    fn: (navigation) => navigation.navigate(Routes.HelpScreenRouter),
  },
  {
    icon: <MaterialIcons name="exit-to-app" size={25} color="black" />,
    text: <Text style={styles.text}>Sair</Text>,
    fn: (navigation, fn) => fn?.(),
  },
  // {
  //   icon: <MaterialIcons name="exit-to-app" size={25} color="black" />,
  //   text: <Text style={styles.text}>Limpar</Text>,
  //   fn: (navigation, fn) => AsyncStorage.removeItem(NOTIFICATIONS_DATA),
  // },
];

export const DrawerContentComponent: React.FC<DrawerContentComponentProps> = ({
  navigation,
}) => {
  const { user, signOut } = useAuth();
  const [isAvatarText, setIsAvatarText] = useState(false);

  useEffect(() => {
    (user?.pic && user.pic.length === 2) || user?.pic.length === 1
      ? setIsAvatarText(true)
      : setIsAvatarText(false);
  }, [user?.pic, isAvatarText, navigation]);

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.headerProfileButton}
          onPress={() => {
            navigation.navigate(Routes.ProfileRouter);
          }}
        >
          {isAvatarText ? (
            <Avatar.Text size={50} label={user?.pic || ''} />
          ) : (
            <Avatar.Image
              size={50}
              source={{ uri: `data:image/gif;base64,${user?.pic}` }}
            />
          )}
          <Text style={styles.headerUserName}>{user?.nome}</Text>
        </TouchableOpacity>

        <View style={styles.headerSeparator} />
      </View>

      <View style={styles.sideBarContent}>
        {content.map(({ icon, text, fn }) => (
          <TouchableOpacity
            style={styles.sideBarItemContent}
            onPress={() => fn(navigation, signOut)}
            key={Math.random()}
          >
            {text}
            {icon}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
