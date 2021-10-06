import React, { useEffect } from 'react';
import { View, Text, ImageBackground, Pressable, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { TextInput, HelperText, Button, Checkbox } from 'react-native-paper';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

// Context
import { useAuth } from '~/contexts/auth';

// Components
import { ModalComponent } from '~/components/modal';

// Styles
import { styles } from './styles';

// Others
import background from '~/img/trampo-background.png';
import { lorem } from '~/utils/lorem-ipsum';
import { AppRoutes as Routes } from '~/constants/routes';
import { getError, handleMessage } from '~/errors/handle-message';

export const SigInScreen: React.FC = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const { handleFormValues, signIn, formValues } = useAuth();

  const navigation = useNavigation();

  useEffect(() => {
    register('email');
    register('senha');
    register('terms');
    register('check');
    register('loading');
    register('error');
    register('helper');
    register('secure');

    setValue('terms', false);
    setValue('check', false);
    setValue('helper', false);
    setValue('loading', false);
    setValue('secure', true);
  }, [register]);

  const handleSigin = async (data: any) => {
    try {
      if (!data.check) {
        Alert.alert('É necessário aceitar os termos para continuar!');
        return;
      }

      setValue('loading', true);
      const form = { ...formValues, ...data };
      handleFormValues(form);

      await signIn({
        email: form.email.toLowerCase(),
        senha: form.senha,
        terms: watch('check'),
      });
    } catch (err) {
      if (handleMessage(err)?.match(/usu\Wrio\sn\Wo\sativo/gi)) {
        Alert.alert(
          'Usuário não ativo!',
          'Reative sua conta alterando sua senha,\ncom isso você recebera um Token de ativação novamente!',
          [
            {
              text: 'Ativar',
              onPress: () =>
                navigation.navigate(Routes.ForgotPasswordRouterEmail),
            },
            { text: 'Cancelar' },
          ]
        );
      }

      if (handleMessage(err)?.match(/Credenciais\sinv\Wlidas/g)) {
        Alert.alert(handleMessage(err) || '');
      }

      setValue('error', handleMessage(err));
      setValue('loading', false);
      setValue('helper', true);
    }
  };

  return (
    <ImageBackground source={background} style={styles.container}>
      <View />

      <View style={styles.sigInContainer}>
        <TextInput
          mode="outlined"
          label="Digite seu Email"
          keyboardType="email-address"
          autoCompleteType="email"
          value={watch('email')}
          onChangeText={(text) => setValue('email', text)}
        />
        <HelperText type="error" visible={watch('helper')}>
          {getError(/email/g, watch('error'))}
        </HelperText>

        <TextInput
          mode="outlined"
          label="Digite sua Senha"
          value={watch('senha')}
          secureTextEntry={watch('secure')}
          onChangeText={(text) => setValue('senha', text)}
          dataDetectorTypes="all"
          autoCompleteType="password"
          right={
            <TextInput.Icon
              name={() => <Entypo name="eye" color="black" size={25} />}
              onPress={() => setValue('secure', !watch('secure'))}
            />
          }
        />
        <HelperText type="error" visible={watch('helper')}>
          {getError(/senha/g, watch('error'))}
        </HelperText>

        <View style={styles.termsArea}>
          <Checkbox
            status={watch('check') ? 'checked' : 'unchecked'}
            onPress={() => setValue('check', !watch('check'))}
          />
          <Text style={styles.textTerms}>
            Aceito os termos e condições!
            <Text
              style={{ color: 'blue' }}
              onPress={() => setValue('terms', true)}
            >
              {'\n'}Veja mais!
            </Text>
          </Text>

          {watch('terms') && (
            <ModalComponent
              visible
              width="80%"
              height="80%"
              onRequestClose={() => setValue('terms', !watch('terms'))}
            >
              <ScrollView>
                <Text>{`${lorem(10)}`}</Text>
              </ScrollView>
              <Pressable
                style={styles.modalButton}
                onPress={() => setValue('terms', !watch('terms'))}
              >
                <Text style={styles.textStyle}>Aceitar</Text>
              </Pressable>
            </ModalComponent>
          )}
        </View>
        <View style={styles.forgotPasswordWrapper}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(Routes.ForgotPasswordRouterEmail)
            }
          >
            <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button
        mode="contained"
        loading={watch('loading')}
        color="black"
        contentStyle={{ flexDirection: 'row-reverse' }}
        onPress={handleSubmit(handleSigin)}
        icon={() => <MaterialIcons name="login" size={25} color="white" />}
      >
        Entrar
      </Button>
    </ImageBackground>
  );
};
