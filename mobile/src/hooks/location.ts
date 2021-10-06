/* eslint-disable consistent-return */
/* eslint-disable no-return-await */
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { GOOGLE_KEY_API } from '~/constants/constants';

export const getUserLocation = async () => {
  const { granted } = await Location.requestPermissionsAsync();

  if (!granted) {
    Alert.alert(
      'Esta aplicação precisa de permissão para usar geolocalização!'
    );
    return;
  }

  Location.setGoogleApiKey(GOOGLE_KEY_API);
  return granted;
};
