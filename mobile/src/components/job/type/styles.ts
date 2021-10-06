import { StyleSheet } from 'react-native';
import { AppFonts as Fonts } from '../../../constants/fonts';

export const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: 'row',
  },

  textInfo: {
    fontFamily: Fonts.NunitoBold,
  },

  align: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
