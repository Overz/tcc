import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';
import { AppFonts as Fonts } from '../../../constants/fonts';

const buttons = {
  marginTop: 20,
  borderRadius: 20,
  width: 100,
  padding: 10,
  elevation: 2,
  marginLeft: 15,
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },

  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 45,
  },

  dashboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  dashboardHeaderText: {
    fontSize: 18,
    fontFamily: Fonts.NunitoRegular,
  },

  dashboardDivisor: {
    borderBottomWidth: 1,
    borderBottomColor: colors.greyLight,
    marginVertical: 15,
  },

  separator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.greyLight,
    marginVertical: 15,
  },

  helpText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  closeModalButton: {
    ...buttons,
    backgroundColor: '#444',
  },

  closeModalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  filterModalButton: {
    ...buttons,
    backgroundColor: colors.blueSky,
  },

  filterModalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  picker: {
    borderWidth: 1,
    borderColor: colors.greyLight,
    borderRadius: 15,
    marginBottom: 10,
  },

  checkBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  teste: {
    borderRadius: 20,
    padding: 30,
    borderWidth: 2,
    borderColor: 'red',
    marginBottom: 15,
  },
});
