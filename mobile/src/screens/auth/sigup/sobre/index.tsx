import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  ScrollView,
  View,
  Text,
  ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

// Context
import { useAuth } from '~/contexts/auth';

// Others
import { AppRoutes as Routes } from '~/constants/routes';
import background from '~/img/background.png';
import { styles } from './styles';

const placeholder = `Sou formado em ...

Trabalho na area a...

Meus conhecimentos são...

Trabalhei como...

Meu crescimento profissional é...

Minhas metas são...`;

export const AboutScreen: React.FC = () => {
  const conhecimentosMaxTextLenght = 650;
  const { register, handleSubmit, setValue, watch } = useForm();
  const { formValues, handleFormValues } = useAuth();
  const [chars, setChars] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    register('sobre');
  }, [register]);

  const handleAbout = async (data: any) => {
    if (!data.sobre) {
      ToastAndroid.show('Informe algo sobre você', ToastAndroid.SHORT);
      return;
    }

    handleFormValues({ ...formValues, ...data });
    navigation.navigate(Routes.CreateAccoutRouter);
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>2/3 Conhecimentos</Text>

        <View style={{ paddingVertical: 15 }} />

        <Text style={styles.label}>
          Descreva um pouco sobre Você e seus Conhecimentos
        </Text>

        <View style={{ paddingVertical: 15 }} />

        <View>
          <Text style={{ marginLeft: 10 }}>
            {chars}/{conhecimentosMaxTextLenght}
          </Text>
          <TextInput
            multiline
            style={styles.about}
            value={watch('sobre')}
            maxLength={conhecimentosMaxTextLenght}
            onChangeText={(text) => {
              setChars(text.length);
              setValue('sobre', text);
            }}
            placeholder={placeholder}
          />
        </View>

        <View style={{ paddingVertical: 15 }} />

        <Button
          mode="contained"
          color="black"
          contentStyle={{ flexDirection: 'row-reverse' }}
          icon={() => (
            <MaterialIcons color="white" size={30} name="navigate-next" />
          )}
          onPress={handleSubmit(handleAbout)}
        >
          Continuar
        </Button>
      </ScrollView>
    </ImageBackground>
  );
};
