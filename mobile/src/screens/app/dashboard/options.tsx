import React from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { IActionProps } from 'react-native-floating-action';

export const fabActions: IActionProps[] = [
  {
    name: 'job',
    text: 'Novo Trampo',
    icon: <MaterialIcons name="post-add" size={30} color="green" />,
    color: 'white',
  },
  {
    name: 'help',
    text: 'Ajuda',
    color: 'yellow',
    icon: <MaterialCommunityIcons name="help" size={30} color="black" />,
  },
];
