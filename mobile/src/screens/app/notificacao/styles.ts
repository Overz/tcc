import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },

  notifyWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderLeftWidth: 2,
  },

  notifyBody: {
    fontSize: 16,
    maxWidth: 270,
  },
});
