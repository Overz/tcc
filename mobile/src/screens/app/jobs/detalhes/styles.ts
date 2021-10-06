import { StyleSheet } from 'react-native';
import { colors } from '../../../../constants/colors';
import { AppFonts as Fonts } from '../../../../constants/fonts';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },

  mapWrapper: {
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: colors.greyLight,
  },

  map: {
    width: '100%',
    height: 350,
    borderRadius: 20,
  },

  separator: { borderWidth: 0.6, borderColor: '#ccc', marginVertical: 15 },

  label: {
    fontSize: 20,
    fontFamily: Fonts.NunitoBold,
    maxHeight: 65,
  },

  textSeparator: {
    marginVertical: 10,
  },

  textWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  personWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textInfo: {
    fontFamily: Fonts.NunitoBold,
  },

  infoWrapper: { flexDirection: 'row', marginBottom: 10 },

  info: {
    fontSize: 20,
    fontFamily: Fonts.NunitoBold,
  },

  sobreWrapper: {
    padding: 10,
    borderRadius: 5,
  },

  userNameWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },

  verticalView: {
    borderColor: colors.greyLight,
    borderWidth: 1,
    height: 35,
  },

  userName: {
    maxWidth: 330,
    maxHeight: 45,
    fontFamily: Fonts.NunitoBold,
    marginLeft: 10,
  },

  userInfo: {
    fontFamily: Fonts.NunitoBold,
    marginLeft: 10,
    color: 'black',
  },

  infoMoney: {
    fontFamily: Fonts.NunitoBold,
    // marginLeft:
    color: 'black',
  },

  noMap: {
    padding: 15,
    borderWidth: 1,
    borderColor: 'red',
    width: '100%',
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttons: { width: '100%', marginBottom: 15 },

  showProfileButton: {
    borderWidth: 1,
    borderColor: '#37C77F',
    backgroundColor: '#37C77F',
    borderRadius: 10,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
