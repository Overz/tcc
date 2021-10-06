import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';

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

  sigInContainer: {
    marginTop: 51,
  },

  termsArea: { flexDirection: 'row', alignItems: 'center' },

  textTerms: {
    marginLeft: 5,
    color: colors.black,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalButton: {
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: colors.blueSky,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  forgotPasswordWrapper: { paddingHorizontal: '25%', marginTop: 20 },

  forgotPassword: {
    padding: 3,
    color: '#666',
    textAlign: 'center',
    textDecorationColor: '#666',
    textDecorationLine: 'underline',
  },
});
