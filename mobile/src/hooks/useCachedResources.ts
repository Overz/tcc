/* eslint-disable global-require */
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'Nunito-Light': require('../../assets/fonts/Nunito-Light.ttf'),
          'Nunito-Regular': require('../../assets/fonts/Nunito-Regular.ttf'),
          'Nunito-SemiBold': require('../../assets/fonts/Nunito-SemiBold.ttf'),
          'Nunito-Bold': require('../../assets/fonts/Nunito-Bold.ttf'),
          'Roboto-Light': require('../../assets/fonts/Roboto-Light.ttf'),
          'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
          'Roboto-Bold': require('../../assets/fonts/Roboto-Bold.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        // eslint-disable-next-line no-console
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    };

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
