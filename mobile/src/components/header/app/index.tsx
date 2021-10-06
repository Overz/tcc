import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from './styles';

interface HeaderProps extends DrawerContentComponentProps {
  text: string;
  disable?: boolean;
  fn?: () => void;
}

export const AppHeaderComponent: React.FC<HeaderProps> = ({
  navigation,
  text,
  children,
  disable,
  fn,
}) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button}>
      <Ionicons
        name="ios-arrow-back"
        color="black"
        size={25}
        onPress={() => {
          fn?.();
          if (!disable) {
            navigation.goBack();
          }
        }}
      />
    </TouchableOpacity>
    <Text style={styles.text}>{text}</Text>
    {children ? <>{children}</> : <View />}
  </View>
);
