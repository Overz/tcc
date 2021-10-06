import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// Styles
import { styles } from './styles';

// Others
import trampo from '~/img/trampo.png';
import { AppRoutes as Routes } from '~/constants/routes';
import { colors } from '~/constants/colors';

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground source={trampo} style={styles.image}>
      <View style={{ width: '85%' }}>
        <Button
          mode="contained"
          color="#0EB003"
          contentStyle={{ flexDirection: 'row-reverse' }}
          onPress={() => navigation.navigate(Routes.SignInRouter)}
          icon={() => <MaterialIcons name="login" size={25} color="white" />}
        >
          Entrar
        </Button>
        <View style={{ marginVertical: 10 }} />
        <Button
          mode="contained"
          color={colors.blueSky}
          contentStyle={{ flexDirection: 'row-reverse' }}
          onPress={() => navigation.navigate(Routes.SignUpRouter)}
          icon={() => (
            <Ionicons color="white" size={20} name="md-person-add-sharp" />
          )}
        >
          Cadastrar
        </Button>
      </View>
    </ImageBackground>
  );
};
