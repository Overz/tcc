import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ImageBackground, View, Text } from 'react-native';
import { TextInput, HelperText, Button } from 'react-native-paper';

import background from '~/img/background.png';
import { api } from '~/services';
import { getError, handleMessage } from '~/errors/handle-message';
import { styles } from './styles';
import { AppRoutes as Routes } from '~/constants/routes';

export const ActivationAccountScreen: React.FC = () => {
  const { register, watch, setValue, handleSubmit } = useForm();
  const navigation = useNavigation();

  useEffect(() => {
    register('token');
    register('helper');
    register('loading');
    register('error');

    setValue('helper', false);
    setValue('loading', false);
  }, [register]);

  const handleAtivar = async (data: any) => {
    try {
      setValue('loading', true);
      await api.post('/api/usuario/ativar', data);
      navigation.navigate(Routes.SignInRouter);
    } catch (err) {
      setValue('error', handleMessage(err));
      setValue('helper', true);
      setValue('loading', false);
    }
  };

  return (
    <ImageBackground style={styles.container} source={background}>
      <View />

      <View style={styles.titleWrapper}>
        <Text style={styles.title}>
          Verifique seu email para{'\n'}resgatar o token de ativação
        </Text>
      </View>

      <View>
        <TextInput
          mode="outlined"
          label="Digite o Token de Ativação"
          onChangeText={(text) => setValue('token', text)}
        />
        <HelperText type="error" visible={watch('helper')}>
          {getError(/token/gi, watch('error'))}
        </HelperText>
      </View>
      <View />

      <Button
        mode="contained"
        color="black"
        loading={watch('loading')}
        contentStyle={{ flexDirection: 'row-reverse' }}
        icon={() => <MaterialIcons name="check" size={25} color="white" />}
        onPress={handleSubmit(handleAtivar)}
      >
        Ativar
      </Button>
    </ImageBackground>
  );
};
