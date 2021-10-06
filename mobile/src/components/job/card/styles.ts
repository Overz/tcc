import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';
import { AppFonts as Fonts } from '../../../constants/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 15,
    padding: 10,
  },

  online: {
    borderWidth: 1.4,
    borderColor: colors.blueSemiLight,
    backgroundColor: colors.blueSky,
  },

  presencial: {
    borderWidth: 1.4,
    borderColor: 'grey',
    backgroundColor: colors.greyLight,
  },

  label: {
    color: 'black',
    fontSize: 16,
    fontFamily: Fonts.NunitoBold,
    marginBottom: 10,
    maxHeight: 50,
    maxWidth: 300,
  },

  nameAndTypeWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: 10,
  },

  userName: {
    marginLeft: 5,
    // maxWidth: 270,
    maxWidth: 135,
    maxHeight: 35,
  },

  moneyWrapper: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    paddingRight: 10,
  },

  area: {
    marginLeft: 10,
    maxWidth: 150,
    maxHeight: 60,
  },

  money: {
    maxWidth: 90,
    maxHeight: 20,
  },
});
