import { StyleSheet } from 'react-native';
import { colors } from '~/constants/colors';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingVertical: 30,
    justifyContent: 'space-between',
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

  sobre: {
    maxHeight: 285,
    minHeight: 285,
  },
});
