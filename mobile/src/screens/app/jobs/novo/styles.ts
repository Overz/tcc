import { StyleSheet } from 'react-native';
import { DatePickerCustomStylesProps } from 'react-native-datepicker';
import { colors } from '~/constants/colors';
import { AppFonts as Fonts } from '~/constants/fonts';

export const datePickerStyle: DatePickerCustomStylesProps = {
  dateText: {
    color: 'white',
    fontSize: 17,
  },
  dateInput: {
    borderColor: 'none',
    borderWidth: 0,
    backgroundColor: '#6200ee',
    paddingLeft: 100,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  placeholderText: {
    fontSize: 17,
  },
};

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    justifyContent: 'space-between',
    flexGrow: 1,
    paddingBottom: 30,
  },

  datePicker: {
    width: '100%',
    paddingBottom: 15,
  },

  infoPicker: {
    marginLeft: 10,
    marginBottom: 3,
    fontSize: 14,
    fontFamily: Fonts.NunitoRegular,
  },

  picker: {
    borderWidth: 1,
    borderColor: colors.greyLight,
    borderRadius: 15,
    marginBottom: 10,
  },

  iconDatePicker: {
    backgroundColor: '#6200ee',
    height: 40,
    paddingRight: 90,
    paddingTop: 7.5,
    marginHorizontal: -1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },

  descricao: {
    maxHeight: 400,
    minHeight: 400,
    paddingTop: 10,
    paddingBottom: 15,
  },
});
