import React from 'react';
import { TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
import { Elogios } from './types';
import { Popable } from 'react-native-popable';
import { colors } from '~/constants';

export const ElogioItem: React.FC<
  Elogios & {
    onPress: () => Promise<void> | void;
    styles?: StyleProp<ViewStyle>;
  }
> = ({ onPress, color, count, enable, icon, message, styles }) => (
  <TouchableOpacity
    style={[
      {
        borderColor: color || colors.greyLight,
        padding: 20,
        borderRadius: 40,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      styles,
    ]}
    disabled={!enable}
    onPress={onPress}
  >
    <Popable content={`${message} - ${count}x`}>
      <Text>{icon(color)}</Text>
    </Popable>
  </TouchableOpacity>
);
