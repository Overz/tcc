import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import { SplashScreen } from '../screens/auth/splash';
import { CreateAccoutScreen } from '../screens/auth/sigup/criar';
import { SigUpScreen } from '../screens/auth/sigup/dados';
import { AboutScreen } from '../screens/auth/sigup/sobre';
import { ActivationAccountScreen } from '../screens/auth/sigup/ativar';
import { SigInScreen } from '../screens/auth/sigin';
import { ForgotPasswordScreenEmail } from '../screens/auth/sigin/forgot/email';
import { ForgotPasswordScreenSenha } from '../screens/auth/sigin/forgot/senha';

// Components
import { AuthHeaderComponent } from '../components/header/auth';

// Others
import { AppRoutes as Routes } from '../constants/routes';

const { Navigator, Screen } = createStackNavigator();

export const AuthRoutes: React.FC = () => (
  <Navigator
    initialRouteName={Routes.SplashRouter}
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen name={Routes.SplashRouter} component={SplashScreen} />
    <Screen name={Routes.SignInRouter} component={SigInScreen} />
    <Screen
      name={Routes.SignUpRouter}
      component={SigUpScreen}
      options={{
        headerShown: true,
        header: () => <AuthHeaderComponent title="Cadastro" />,
      }}
    />
    <Screen
      name={Routes.AboutRouter}
      component={AboutScreen}
      options={{
        headerShown: true,
        header: () => <AuthHeaderComponent title="Cadastro" />,
      }}
    />

    <Screen
      name={Routes.CreateAccoutRouter}
      component={CreateAccoutScreen}
      options={{
        headerShown: true,
        header: () => <AuthHeaderComponent title="Cadastro" />,
      }}
    />

    <Screen
      name={Routes.ActivationAccountRouter}
      component={ActivationAccountScreen}
      options={{
        headerShown: true,
        header: () => <AuthHeaderComponent title="Ativação" />,
      }}
    />

    <Screen
      name={Routes.ForgotPasswordRouterEmail}
      component={ForgotPasswordScreenEmail}
      options={{
        headerShown: true,
        header: () => <AuthHeaderComponent title="Esqueci Senha" />,
      }}
    />
    <Screen
      name={Routes.ForgotPasswordRouterSenha}
      component={ForgotPasswordScreenSenha}
      options={{
        headerShown: true,
        header: () => <AuthHeaderComponent title="Esqueci Senha" />,
      }}
    />
  </Navigator>
);
