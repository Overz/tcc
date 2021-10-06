import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UserAddress } from '~/contexts/auth';

import { styles } from './styles';

interface ListItemAddressProps {
  data: UserAddress;
  onDelete: () => void;
}

export const AddressListItem: React.FC<ListItemAddressProps> = ({
  data,
  onDelete,
}) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.label}>{data.nome}</Text>
      <Text
        style={styles.addrs}
      >{`${data.rua} - ${data.numero}, ${data.bairro} - ${data.uf}`}</Text>
    </View>
    <TouchableOpacity onPress={onDelete}>
      <Ionicons name="trash" color="#B92F2F" size={30} />
    </TouchableOpacity>
  </View>
);
