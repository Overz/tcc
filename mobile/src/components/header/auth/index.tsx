import React from 'react';
import { View, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { AppRoutes as Routes } from '../../../constants/routes';
import { styles } from './styles';

interface IHeaderProps {
  title: string;
  showCancel?: boolean;
  transparent?: boolean;
}

export const AuthHeaderComponent: React.FC<IHeaderProps> = ({
  title,
  showCancel = true,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15b6d6" />
      </BorderlessButton>
      <Text style={styles.title}>{title}</Text>
      {showCancel ? (
        <BorderlessButton
          onPress={() => {
            navigation.navigate(Routes.SplashRouter);
          }}
        >
          <Feather name="x" size={24} color="#ff669d" />
        </BorderlessButton>
      ) : (
        <View />
      )}
    </View>
  );
};
