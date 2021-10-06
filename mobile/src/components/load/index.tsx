import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { colors } from '~/constants/colors';
import { styles } from './styles';

export const LoadComponent: React.FC<{ center?: boolean }> = ({ center }) =>
  center ? (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#ccc" />
    </View>
  ) : (
    <View style={styles.normal}>
      <ActivityIndicator size="large" color={colors.blueSky} />
    </View>
  );
