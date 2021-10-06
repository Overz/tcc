import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

// Components
import { ModalComponent } from '../modal';

import { styles } from './styles';
import { FunctionVoid } from '~/constants/types';

interface HelpProps {
  fn: FunctionVoid;
  text: string;
}

export const HelpComponent: React.FC<HelpProps> = ({ text, fn }) => (
  <ModalComponent visible width="80%" height="80%" onRequestClose={fn}>
    <ScrollView>
      <Text>{text}</Text>
    </ScrollView>
    <View style={{ flexDirection: 'row' }}>
      <Pressable style={styles.helpButton} onPress={fn}>
        <Text style={styles.helpText}>Aceitar</Text>
      </Pressable>
    </View>
  </ModalComponent>
);
