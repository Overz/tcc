import React from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

import { JobType } from '~/contexts';

import { styles } from './styles';

export const TypeJobComponent: React.FC<{
  type?: JobType;
}> = ({ type }) => (
  <View style={styles.textWrapper}>
    <Text style={styles.align}>
      {type === 'O' ? (
        <View style={styles.align}>
          <Ionicons name="earth" color="black" size={24} />
          <Text>{` ${type}`}</Text>
        </View>
      ) : (
        <View style={styles.align}>
          <MaterialCommunityIcons name="map-marker" color="black" size={24} />
          <Text>{` ${type}`}</Text>
        </View>
      )}
    </Text>
  </View>
);
