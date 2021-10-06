import { StyleSheet } from 'react-native';
import { colors } from '../../../../constants/colors';
import { AppFonts as Fonts } from '../../../../constants/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    padding: 30,
    justifyContent: 'space-between',
  },

  titleWrapper: { alignItems: 'center', justifyContent: 'center' },
  title: {
    color: colors.blackBold,
    fontSize: 20,
    fontFamily: Fonts.NunitoBold,
  },
});
