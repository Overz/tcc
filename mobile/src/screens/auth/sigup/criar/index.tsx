import React, { useEffect } from 'react';
import { ImageBackground, View, Text } from 'react-native';
import { TextInput, HelperText, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

// Context
import { useAuth } from '~/contexts/auth';

// Other
import { AppRoutes as Routes } from '~/constants/routes';
import { getError, handleMessage } from '~/errors/handle-message';
import background from '~/img/background.png';
import { styles } from './styles';
import { Entypo, Ionicons } from '@expo/vector-icons';

export const CreateAccoutScreen: React.FC = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const { signUp, handleFormValues, formValues } = useAuth();

  const navigation = useNavigation();

  useEffect(() => {
    register('email');
    register('senha');
    register('loading');
    register('helper');
    register('error');
    register('secure');

    setValue('loading', false);
    setValue('helper', false);
    setValue('secure', true);
    setValue('error', '');
  }, [register]);

  const handleSignIn = async (data: any) => {
    try {
      setValue('loading', true);
      const dadosCadastro = { ...formValues, ...data };
      handleFormValues({ ...dadosCadastro });

      await signUp({ ...dadosCadastro });

      navigation.navigate(Routes.ActivationAccountRouter);
    } catch (err) {
      setValue('error', handleMessage(err));
      setValue('helper', true);
      setValue('loading', false);
    }
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <Text style={styles.title}>3/3 Finalizando</Text>

      <View>
        <TextInput
          mode="outlined"
          label="Digite seu Email"
          onChangeText={(text) => setValue('email', text)}
        />
        <HelperText type="error" visible={watch('helper')}>
          {getError(/email/gi, watch('error'))}
        </HelperText>

        <TextInput
          mode="outlined"
          label="Digite sua Senha"
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
          {getError(/senha/gi, watch('error'))}
        </HelperText>
      </View>

      <Button
        mode="contained"
        loading={watch('loading')}
        color="black"
        contentStyle={{ flexDirection: 'row-reverse' }}
        icon={() => (
          <Ionicons color="white" size={20} name="md-person-add-sharp" />
        )}
        onPress={handleSubmit(handleSignIn)}
      >
        Cadastrar
      </Button>
    </ImageBackground>
  );
};
