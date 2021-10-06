import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';
import { AppFonts as Fonts } from '../../../constants/fonts';

export const addrStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    // paddingBottom: 20,
    backgroundColor: colors.white,
  },

  info: {
    marginLeft: 10,
    paddingVertical: 10,
    fontFamily: Fonts.NunitoRegular,
  },

  scrollView: {
    flex: 1,
  },

  title: {
    color: colors.blackBold,
    fontSize: 30,
    fontFamily: Fonts.NunitoBold,
  },

  mapStyle: {
    width: '100%',
    height: 270,
    borderRadius: 20,
  },

  mapContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.8,
    borderColor: '#B3DAE2',
    marginTop: 30,
  },
});
