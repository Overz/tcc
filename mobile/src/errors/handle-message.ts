import { ToastAndroid } from 'react-native';

export const handleMessage = (err: any) => {
  if (err.response && err.response.data) {
    if (err.response.data.message === 'Not found') {
      console.log('ROTA NÃO ENCONTRADA!', err.response.headers);
      return;
    }

    if (err.response.data.message === 'Internal server error') {
      ToastAndroid.show(
        'Um erro ocorreu, tente novamente mais tarde!',
        ToastAndroid.SHORT
      );
      return;
    }

    // eslint-disable-next-line consistent-return
    return `${err.response.data.message}`;
  }
};

export const getError = (regexp: RegExp, err: any) =>
  String(err).match(regexp) && err;
