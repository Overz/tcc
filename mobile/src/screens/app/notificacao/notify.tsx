import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { NotificationData } from '~/contexts';

import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

export const NotifyItem: React.FC<
  DrawerContentComponentProps &
    NotificationData & { visto: boolean; onPress: () => void }
> = ({ body, onPress, visto, id }) => {
  const [states, setStates] = useState({
    textColor: 'purple',
    borderColor: 'purple',
  });

  const updateItem = () => {
    if (visto) {
      setStates({ textColor: '#ccc', borderColor: '#ccc' });
    }
  };

  useEffect(() => updateItem(), []);

  return (
    <TouchableOpacity
      style={{
        ...styles.notifyWrapper,
        borderColor: states.borderColor,
      }}
      onPress={() => {
        onPress();
        updateItem();
      }}
    >
      <Text style={{ ...styles.notifyBody, color: states.textColor }}>
        {body} - {id}
      </Text>
      <Ionicons name="notifications" size={24} color="rgba(0,0,0,0.7)" />
    </TouchableOpacity>
  );
};
