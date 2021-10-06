import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { colors } from '~/constants';

interface Btn {
  show: boolean;
  loadMain: boolean;
  main: () => void;
}

/**
 * é o candiato ? sim
 *
 * botao1: candidatar-se
 */
export const Button7: React.FC<Btn> = ({ loadMain, show, main }) => (
  <>
    {show ? (
      <Button
        mode="contained"
        loading={loadMain}
        onPress={main}
        color={colors.blueSky}
        contentStyle={{ flexDirection: 'row-reverse' }}
        icon={() => <AntDesign name="solution1" color="white" size={24} />}
      >
        Candidatar-se
      </Button>
    ) : null}
  </>
);
