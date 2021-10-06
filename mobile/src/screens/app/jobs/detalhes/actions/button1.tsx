import React from 'react';
import { Entypo, Feather, MaterialIcons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { colors } from '~/constants';

interface Btn {
  show: boolean;
  loadMain: boolean;
  loadData: boolean;
  main: () => void;
  candidatos: () => void;
  data: () => void;
}

/**
 * sou o contratante? sim
 * tem ninguem trabalhando? não
 * esta no prazo de validade? sim
 * posso renovar a data? sim
 * data de entreva valida? sim
 *
 * botao1: cancelar
 * botao2: ver candidatos
 * botao3: renovar data
 */
export const Button1: React.FC<Btn> = ({
  loadMain,
  loadData,
  show,
  main,
  data,
  candidatos,
}) => (
  <>
    {show ? (
      <>
        <Button
          mode="contained"
          loading={loadMain}
          color={colors.blueSky}
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
          onPress={candidatos}
          contentStyle={{ flexDirection: 'row-reverse' }}
          icon={() => <Entypo name="list" size={24} color="white" />}
        >
          Ver Candidatos
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
