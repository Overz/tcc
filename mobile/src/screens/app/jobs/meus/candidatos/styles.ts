import { StyleSheet } from 'react-native';
import { AppFonts as Fonts, colors } from '~/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },

  cardWrapper: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.greySemiLight,
    padding: 15,
  },

  userWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  label: {
    color: 'black',
    fontSize: 16,
    fontFamily: Fonts.NunitoBold,
    marginBottom: 10,
    maxHeight: 50,
    maxWidth: 300,
  },
});
