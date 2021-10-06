import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { differenceInDays } from 'date-fns';

import { styles } from './styles';
import { TypeJobComponent } from '../type';
import { colors } from '~/constants';

interface CardData {
  id: string | number;
  area: string;
  usuario: string;
  remuneracao: string;
  tipo: 'O' | 'P' | string;
  dtpublicado: string;
  status: 'P' | 'F' | 'C' | string;
  onPress: () => void;
}

export const JobCardComponent: React.FC<CardData> = ({
  id,
  area,
  tipo,
  usuario,
  remuneracao,
  dtpublicado,
  status,
  onPress,
}) => {
  const [cardStyle, setCardStyle] = useState<any>({
    backgroundColor: colors.blueSky,
    borderWidth: 1.4,
    borderColor: colors.blueSemiLight,
  });

  useEffect(() => {
    if (status === 'C') {
      setCardStyle({
        borderWidth: 1.4,
        backgroundColor: colors.redLight,
        borderColor: colors.redPink,
      });
    }

    if (status === 'F') {
      setCardStyle({
        borderWidth: 1.4,
        backgroundColor: '#ccc',
        borderColor: 'grey',
      });
    }
  }, []);

  return (
    <TouchableOpacity
      style={
        tipo === 'O'
          ? [styles.container, cardStyle]
          : [styles.container, cardStyle]
      }
      onPress={onPress}
    >
      <Text style={styles.label}>{`${area} - ${id}`}</Text>

      <View style={[styles.nameAndTypeWrapper]}>
        <View style={{ flexDirection: 'row' }}>
          <MaterialIcons name="emoji-people" color="black" size={20} />
          <Text style={styles.userName}>{usuario}</Text>
        </View>

        <TypeJobComponent type={tipo === 'O' ? 'Online' : 'Presencial'} />
      </View>

      <View style={styles.moneyWrapper}>
        <View style={{ flexDirection: 'row' }}>
          <MaterialIcons name="attach-money" color="black" size={20} />
          <Text style={styles.money}>
            {Number(remuneracao.replace(/[R$]/g, '')).toFixed(2)}
          </Text>
        </View>
        <Text>
          {`${differenceInDays(
            new Date().getTime(),
            new Date(Date.parse(dtpublicado)).getTime()
          )} dias atras`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
