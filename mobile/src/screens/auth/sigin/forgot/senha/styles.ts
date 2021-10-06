import { StyleSheet } from 'react-native';
import { AppFonts as Fonts } from '../../../../../constants/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  titleWrapper: { justifyContent: 'center', alignItems: 'center' },

  title: { fontSize: 25, fontFamily: Fonts.NunitoBold },
});
