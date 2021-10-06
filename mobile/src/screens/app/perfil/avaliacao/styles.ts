import { StyleSheet } from 'react-native';
import { AppFonts, colors } from '~/constants';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 35,
  },

  containerAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.greyLight,
    paddingBottom: 25,
    marginVertical: 15,
  },

  avatar: {
    borderRadius: 130,
    borderColor: colors.greyLight,
    borderWidth: 1.4,
    padding: 3,
  },

  infoWrapper: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  infoSobre: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: colors.greyLight,
    fontSize: 16,
  },

  infoText: {
    fontSize: 16,
    fontFamily: AppFonts.NunitoRegular,
  },

  elogioInfo: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },

  elogioRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
});
