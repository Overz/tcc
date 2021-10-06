import { StyleSheet } from 'react-native';
import { colors } from '../../../../constants/colors';
import { AppFonts as Fonts } from '../../../../constants/fonts';

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    padding: 30,
    justifyContent: 'space-between',
  },

  container: {
    flex: 1,
  },

  title: {
    color: colors.blackBold,
    fontSize: 30,
    fontFamily: Fonts.NunitoBold,
  },
});
