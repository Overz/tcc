import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ImageBackground } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

// Context
import { useAuth } from '~/contexts/auth';

// Others
import { AppRoutes as Routes } from '~/constants/routes';
import background from '~/img/background.png';
import { styles } from './styles';
import { getError, handleMessage } from '~/errors/handle-message';

export const ForgotPasswordScreenEmail: React.FC = () => {
  const { register, setValue, handleSubmit, watch } = useForm();
  const { forgotPassword } = useAuth();

  const navigation = useNavigation();

  useEffect(() => {
    register('email');
    register('loading');
    register('error');
    register('helper');

    setValue('helper', false);
    setValue('loading', false);
  }, [register]);

  const handleEsqueciSenha = async (data: any) => {
    try {
      setValue('loading', true);
      await forgotPassword('esqueci-senha', data);

      setValue('loading', false);
      navigation.navigate(Routes.ForgotPasswordRouterSenha);
    } catch (err) {
      setValue('loading', false);
      setValue('error', handleMessage(err));
      setValue('helper', true);
    }
  };

  return (
    <ImageBackground source={background} style={styles.container}>
      <View />

      <View style={styles.titleWrapper}>
        <Text style={styles.title}>
          Insira seu Email{'\n'}para resetar sua senha
        </Text>
      </View>

      <View>
        <TextInput
          mode="outlined"
          label="Digite seu Email"
          autoCompleteType="email"
          dataDetectorTypes="all"
          onChangeText={(text) => setValue('email', text)}
        />
        <HelperText type="error" visible={watch('helper')}>
          {getError(/email/gi, watch('error'))}
        </HelperText>
      </View>

      <View />

      <Button
        mode="contained"
        color="black"
        loading={watch('loading')}
        onPress={handleSubmit(handleEsqueciSenha)}
        contentStyle={{ flexDirection: 'row-reverse' }}
        icon={() => (
          <MaterialIcons color="white" size={30} name="navigate-next" />
        )}
      >
        Proximo
      </Button>
    </ImageBackground>
  );
};
