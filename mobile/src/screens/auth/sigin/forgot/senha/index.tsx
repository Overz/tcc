import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, ImageBackground, Alert } from 'react-native';
import { TextInput, HelperText, Button } from 'react-native-paper';
import { useAuth } from '~/contexts/auth';

import background from '~/img/background.png';
import { styles } from './styles';
import { AppRoutes as Routes } from '~/constants/routes';
import { getError, handleMessage } from '~/errors/handle-message';

export const ForgotPasswordScreenSenha: React.FC = () => {
  const { register, setValue, watch, handleSubmit } = useForm();
  const { forgotPassword } = useAuth();

  const navigation = useNavigation();

  useEffect(() => {
    register('token');
    register('senha');
    register('novasenha');
    register('loading');
    register('helper');
    register('error');
    register('secure');

    setValue('loading', false);
    setValue('helper', false);
    setValue('secure', true);
  }, [register]);

  const handleResetar = async (data: any) => {
    try {
      if (data.senha !== data.novasenha) {
        setValue('error', 'As senhas digitadas não batem');
        return;
      }

      setValue('loading', true);

      await forgotPassword('resetar-senha', data);
      navigation.navigate(Routes.SignInRouter);
    } catch (err) {
      const e = handleMessage(err);

      e?.match(/usuario/gi) && Alert.alert(e);

      setValue('error', e);
      setValue('loading', false);
      setValue('helper', true);
    }
  };

  return (
    <ImageBackground source={background} style={styles.container}>
      <View />

      <Text style={{ fontSize: 20 }}>
        Verifique seu Email para{'\n'}resgatar o token
      </Text>
      <View>
        <TextInput
          mode="outlined"
          label="Digite o Token"
          onChangeText={(text) => setValue('token', text)}
        />
        <HelperText type="error" visible={watch('helper')}>
          {getError(/token/gi, watch('error'))}
        </HelperText>
      </View>

      <Text style={{ fontSize: 20 }}>Digite a Senha</Text>
      <View>
        <TextInput
          mode="outlined"
          label="Senha"
          secureTextEntry={watch('secure')}
          onChangeText={(text) => setValue('senha', text)}
          autoCompleteType="password"
          right={
            <TextInput.Icon
              name={() => <Entypo name="eye" color="black" size={25} />}
              onPress={() => setValue('secure', !watch('secure'))}
            />
          }
        />
        <HelperText type="error" visible={watch('helper')}>
          {getError(/senhas|senha/g, watch('error'))}
        </HelperText>

        <TextInput
          mode="outlined"
          label="Confirme sua Senha"
          secureTextEntry={watch('secure')}
          onChangeText={(text) => setValue('novasenha', text)}
          autoCompleteType="password"
          right={
            <TextInput.Icon
              name={() => <Entypo name="eye" color="black" size={25} />}
              onPress={() => setValue('secure', !watch('secure'))}
            />
          }
        />
        <HelperText type="error" visible={watch('helper')}>
          {getError(/senhas|senha/g, watch('error'))}
        </HelperText>
      </View>

      <View />
      <View />

      <Button
        color="black"
        mode="contained"
        loading={watch('loading')}
        onPress={handleSubmit(handleResetar)}
        contentStyle={{ flexDirection: 'row-reverse' }}
        icon={() => (
          <MaterialCommunityIcons name="lock-reset" size={25} color="white" />
        )}
      >
        Resetar
      </Button>
    </ImageBackground>
  );
};
