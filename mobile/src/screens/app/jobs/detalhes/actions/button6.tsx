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
 * é o contratante? nao
 * finalizacao pendente? nao
 *
 * botao1: finalizar
 */
export const Button6: React.FC<Btn> = ({ loadMain, show, main }) => (
  <>
    {show ? (
      <Button
        mode="contained"
        color={colors.blueSky}
        loading={loadMain}
        onPress={main}
        contentStyle={{ flexDirection: 'row-reverse' }}
        icon={() => <AntDesign name="checkcircleo" size={24} color="white" />}
      >
        Finalizar
      </Button>
    ) : null}
  </>
);
