import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';
import { AppFonts as Fonts } from '../../../constants/fonts';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  text: {
    fontSize: 18,
    fontFamily: Fonts.NunitoBold,
    marginLeft: -10,
  },

  button: {
    borderColor: colors.greySemiLight,
    padding: 5,
  },
});
