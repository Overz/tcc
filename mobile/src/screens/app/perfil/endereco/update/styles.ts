import { StyleSheet } from 'react-native';
import { colors } from '~/constants/colors';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 50,
  },

  picker: {
    borderWidth: 1,
    borderColor: colors.greySemiLight,
    borderRadius: 5,
    marginBottom: 25,
  },
});
