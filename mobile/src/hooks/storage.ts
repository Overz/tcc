/* eslint-disable consistent-return */
/* eslint-disable no-return-await */
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const getUserPersonalStorage = async () => {
  const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!granted) {
    Alert.alert(
      'Por favor, esta aplicação precisa de permissão para alterar imagens!'
    );
    return;
  }

  return async () =>
    await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });
};
