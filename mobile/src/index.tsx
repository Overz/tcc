import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Routes } from '~/routes';
import { AuthProvider, NotificationProvider } from '~/contexts';

export const App: React.FC = () => (
  <SafeAreaProvider>
    <NavigationContainer>
      <StatusBar hidden barStyle="dark-content" />
      <AuthProvider>
        <NotificationProvider>
          <Routes />
        </NotificationProvider>
      </AuthProvider>
    </NavigationContainer>
  </SafeAreaProvider>
);
