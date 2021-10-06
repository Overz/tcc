import React from 'react';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { colors } from '~/constants';

interface Btn {
  show: boolean;
  loadData: boolean;
  loadRequest: boolean;
  main: () => void;
  data: () => void;
}

/**
 * sou o contratante? sim
 * tem algúem trabalhando? sim
 * esta no prazo de validade? sim
 * posso renovar a data? sim
 * data de entrega valida? sim
 *
 * botao1: cancelar
 * botao2: vazio
 * botao3: renovar data
 */
export const Button2: React.FC<Btn> = ({
  loadData,
  loadRequest,
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
          loading={loadData}
          onPress={main}
          style={{ marginBottom: 5 }}
          contentStyle={{ flexDirection: 'row-reverse' }}
          icon={() => <MaterialIcons name="cancel" size={24} color="white" />}
        >
          Cancelar
        </Button>
        <Button
          color={colors.blueSky}
          mode="contained"
          loading={loadRequest}
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
