import { StyleSheet } from 'react-native';
import { colors } from '../../../../constants/colors';
import { AppFonts as Fonts } from '../../../../constants/fonts';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 30,
    justifyContent: 'space-between',
  },

  background: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  title: {
    color: colors.blackBold,
    fontSize: 30,
    fontFamily: Fonts.NunitoBold,
  },

  label: {
    color: colors.black,
    fontFamily: Fonts.NunitoSemibold,
    fontSize: 18,
    marginBottom: 8,
    marginLeft: 10,
  },

  about: {
    maxHeight: 285,
    minHeight: 285,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    paddingBottom: 15,
  },
});
