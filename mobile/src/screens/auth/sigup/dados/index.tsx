import React, { createRef, useEffect } from 'react';
import { ImageBackground, View, Text, ToastAndroid } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { TextInput, HelperText, Button } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import { MaterialIcons } from '@expo/vector-icons';

// Context
import { useAuth } from '~/contexts/auth';

// Services
import { api } from '~/services';

// Others
import { AppRoutes as Routes } from '~/constants/routes';
import background from '~/img/background.png';
import { styles } from './styles';
import { getError, handleMessage } from '~/errors/handle-message';

export const SigUpScreen: React.FC = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const { handleFormValues } = useAuth();

  const refCpf = createRef<any>();
  const refTelefone = createRef<any>();

  const navigation = useNavigation();

  useEffect(() => {
    register('nome');
    register('cpf');
    register('telefone');
    register('loading');
    register('error');
    register('helper');

    setValue('loading', false);
    setValue('helper', false);
    setValue('error', '');
  }, [register]);

  const handleValidateData = async (data: any) => {
    try {
      setValue('loading', true);
      handleFormValues({ ...data });

      await api.post('/api/usuario/checar-dados', data);
      navigation.navigate(Routes.AboutRouter);
      setValue('loading', false);
    } catch (err) {
      setValue('error', handleMessage(err));
      setValue('loading', false);
      setValue('helper', true);
    }
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>1/3 Dados</Text>

        <View style={{ justifyContent: 'space-between' }}>
          <View>
            <TextInput
              mode="outlined"
              label="Digite o Nome"
              onChangeText={(text) => setValue('nome', text)}
            />
            <HelperText type="error" visible={watch('helper')}>
              {getError(/nome/g, watch('error'))}
            </HelperText>
          </View>

          <View>
            <TextInput
              label="Digite o CPF"
              mode="outlined"
              render={(props) => (
                <TextInputMask
                  {...props}
                  type="cpf"
                  ref={refCpf}
                  maxLength={14}
                  value={watch('cpf')}
                  onChangeText={(text) => {
                    setValue('cpf', text);
                    props.onChangeText?.(text);
                  }}
                />
              )}
              right={
                <TextInput.Icon
                  name={() => (
                    <MaterialIcons name="info" color="red" size={25} />
                  )}
                  onPress={() =>
                    ToastAndroid.show(
                      'Não poderá ser alterado!',
                      ToastAndroid.LONG
                    )
                  }
                />
              }
            />
            <HelperText type="error" visible={watch('helper')}>
              {getError(/cpf/g, watch('error'))}
            </HelperText>
          </View>

          <View>
            <TextInput
              label="Digite o Telefone"
              render={(props) => (
                <TextInputMask
                  {...props}
                  ref={refTelefone}
                  type="cel-phone"
                  maxLength={15}
                  value={watch('telefone')}
                  onChangeText={(text) => {
                    setValue('telefone', text);
                    props.onChangeText?.(text);
                  }}
                />
              )}
              mode="outlined"
              autoCompleteType="tel"
              dataDetectorTypes="all"
            />
            <HelperText type="error" visible={watch('helper')}>
              {getError(/telefone/g, watch('error'))}
            </HelperText>
          </View>
        </View>

        <Button
          mode="contained"
          color="black"
          contentStyle={{ flexDirection: 'row-reverse' }}
          icon={() => (
            <MaterialIcons color="white" size={30} name="navigate-next" />
          )}
          loading={watch('loading')}
          onPress={handleSubmit(handleValidateData)}
        >
          Continuar
        </Button>
      </View>
    </ImageBackground>
  );
};
