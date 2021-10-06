import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Accuracy, getCurrentPositionAsync } from 'expo-location';

// Context
import {
  JobProvier,
  RankProvider,
  useAuth,
  User,
  useNotification,
} from '~/contexts';

// Routes
import { AppRoutes } from '~/routes/app.routes';
import { AuthRoutes } from '~/routes/auth.routes';

// Components
import { LoadComponent } from '~/components/load';

// Others
import { USER_DATA } from '~/constants/constants';
import { api } from '~/services';
import { ToastAndroid } from 'react-native';
import { handleMessage } from '~/errors/handle-message';
import { delay } from '~/utils/delay';
import { googleReverseGeocodeAsync } from 'expo-location/build/LocationGoogleGeocoding';

export const Routes: React.FC = () => {
  const { signed, setUser } = useAuth();
  const { recoverNotifications } = useNotification();
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      ToastAndroid.show('Consultando Dados', ToastAndroid.SHORT);
      const storage = await AsyncStorage.getItem(USER_DATA);

      console.log('STORAGE: ', storage !== null);

      if (storage) {
        const usuario = JSON.parse(storage) as User;
        const login = await api.post('/api/usuario/login', {
          email: usuario.email,
          senha: usuario.senha,
        });

        const cookie = login.headers['set-cookie'][0];
        api.defaults.headers.cookie = cookie;

        const { coords } = await getCurrentPositionAsync({
          accuracy: Accuracy.Highest,
        });
        const region = await googleReverseGeocodeAsync(coords);

        if (!coords || !region[0]) {
          ToastAndroid.show(
            'Por favor, habilite a geolocalização!',
            ToastAndroid.LONG
          );
        }

        delay(5000).then(() => {
          recoverNotifications();
        });
        setUser({
          ...usuario,
          location: { ...coords, cidade: region[0].subregion || '' },
        });
        ToastAndroid.show('Logado!', ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log(typeof err);
      console.log(err);
      // console.log(`ERROR ROUTER INDEX: ${__filename}`);
      console.log(handleMessage(err));
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData().then(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadComponent center />;
  }

  if (!loading && signed) {
    return (
      <RankProvider>
        <JobProvier>
          <AppRoutes />
        </JobProvier>
      </RankProvider>
    );
  }

  if (!loading && !signed) {
    <AuthRoutes />;
  }

  return !signed ? <AuthRoutes /> : <LoadComponent center />;
};
