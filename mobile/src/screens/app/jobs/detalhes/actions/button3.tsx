import React from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { colors } from '~/constants';

interface Btn {
  show: boolean;
  loadMain: boolean;
  loadData: boolean;
  main: () => void;
  data: () => void;
}

/**
 * sou o contratante? sim
 * tem alguem trabahlando? sim
 * esta na validade? não
 * posso renovar a data? sim
 * data de entrega valida? sim
 *
 * botao1: finalizar
 * botao2: vazio
 * botao3: renovar data
 */
export const Button3: React.FC<Btn> = ({
  loadMain,
  loadData,
  show,
  main,
  data,
}) => (
  <>
    {show ? (
      <>
        <Button
          mode="contained"
          color={colors.blueSky}
          loading={loadMain}
          onPress={main}
          style={{ marginBottom: 5 }}
          contentStyle={{ flexDirection: 'row-reverse' }}
          icon={() => <AntDesign name="checkcircleo" size={24} color="white" />}
        >
          Finalizar
        </Button>
        <Button
          mode="contained"
          color={colors.blueSky}
          loading={loadData}
          onPress={data}
          style={{ marginTop: 5 }}
          contentStyle={{ flexDirection: 'row-reverse' }}
          icon={() => <Feather name="refresh-ccw" size={24} color="white" />}
        >
          Renovar Data de Entrega
        </Button>
      </>
    ) : null}
  </>
);
