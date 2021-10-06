import { StyleSheet } from 'react-native';
import { colors } from '~/constants/colors';
import { AppFonts as Fonts } from '~/constants/fonts';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  separator: { borderBottomWidth: 1, borderBottomColor: colors.greyLight },

  mapContainer: {
    borderWidth: 0.6,
    overflow: 'hidden',
    borderColor: colors.greyLight,
    borderRadius: 10,
    height: 350,
    width: '100%',
  },

  mapStyle: {
    width: '100%',
    height: 550,
  },

  infoAddress: {
    fontFamily: Fonts.NunitoBold,
    fontSize: 20,
  },

  createAddressWrapper: { paddingVertical: 10 },

  createAddressInfo: {
    fontFamily: Fonts.NunitoBold,
    fontSize: 20,
  },

  callout: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
});
