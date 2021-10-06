import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

const imglength = 85;

export const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 15,
    flex: 1,
  },

  headerProfileButton: {
    borderRadius: imglength,
    flexDirection: 'row',
  },

  headerImgStyle: {
    width: imglength,
    height: imglength,
    borderRadius: imglength / 2,
    borderWidth: 1.4,
    borderColor: colors.greyLight,
  },

  headerUserName: {
    color: 'black',
    marginLeft: 15,
    marginTop: imglength / 5,
    paddingRight: 2,
    maxWidth: 100,
    maxHeight: 55,
  },

  headerSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.greyLight,
    marginVertical: 15,
  },

  sideBarContent: {
    justifyContent: 'space-evenly',
    flex: 1,
    padding: 10,
    paddingRight: 30,
  },

  sideBarItemContent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  text: {
    fontSize: 18,
  },
});
