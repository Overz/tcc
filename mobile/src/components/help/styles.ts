import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  helpButton: {
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: colors.blueSky,
  },

  helpText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
