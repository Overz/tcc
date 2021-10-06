import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ListCandidatos } from '~/contexts';
import { FunctionVoid } from '~/constants';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';

export const CardCandidate: React.FC<
  ListCandidatos & { onPress: FunctionVoid }
> = ({ nome, area, nota, onPress }) => (
  <TouchableOpacity style={styles.cardWrapper} onPress={onPress}>
    <Text style={styles.label}>{area}</Text>
    <View style={styles.userWrapper}>
      <Text>{nome}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <AntDesign name="star" size={20} color="purple" />
        <Text>{` ${nota}`}</Text>
      </View>
    </View>
  </TouchableOpacity>
);
