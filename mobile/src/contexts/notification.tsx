/* eslint-disable no-await-in-loop */
import React, {
  useState,
  createContext,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import ms from 'ms';
import { api } from '~/services';
import {
  setNotificationHandler,
  scheduleNotificationAsync,
} from 'expo-notifications';
import { handleMessage } from '~/errors/handle-message';
import { ID, NotificationData, NotificationRequest } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HAS_NOTIFICATION, NOTIFICATIONS_DATA } from '~/constants';
import { useAuth } from './auth';
import { ToastAndroid } from 'react-native';

interface NotificatiosData {
  notifications: NotificationData[];
  hasNotification: boolean;
  setHasNotification: (_v: boolean) => void;
  recoverNotifications: () => Promise<void>;
  setNotifications: (_data: any[]) => void;
  setVisto: (_id: ID) => Promise<void>;
}

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const NotificationContext = createContext({} as NotificatiosData);

const NotificationProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [timeout, setTimeout] = useState<any>();
  const [hasNotification, setHasNotification] = useState(false);

  const handleNotifications = useCallback(async () => {
    const { data } = await api.get<NotificationRequest[]>('/api/notificacao');

    for (let i = 0; i < data.length; i++) {
      const notify = data[i];
      const content: NotificationData = {
        id: notify.id,
        body: notify.mensagem,
        title: 'Você tem ações pendentes!',
        data: {
          id: notify.id,
          notificado: notify.notificado,
          notificante: notify.notificante,
          trampo: notify.trampo,
          visto: notify.visto,
          tipo: notify.tipo,
        },
      };

      if (!notify.entregue) {
        await api.put(`/api/notificacao/${notify.id}`, { entregue: true });
      }

      let parse: NotificationData[] = [];
      // const stringfy = await AsyncStorage.getItem(NOTIFICATIONS_DATA);
      // if (stringfy) {
      //   parse = JSON.parse(stringfy) as NotificationData[];
      // }
      parse.push(content);
      parse = parse.concat(notifications);

      setHasNotification(true);
      setNotifications(parse);
      await scheduleNotificationAsync({ content, trigger: { seconds: 2 } });
      await AsyncStorage.setItem(NOTIFICATIONS_DATA, JSON.stringify(parse));
      await AsyncStorage.setItem(HAS_NOTIFICATION, 'true');
    }
  }, []);

  const polling = useCallback(() => {
    try {
      console.log('STARTING POOLING NOTIFICATIONS');
      const timer = setInterval(() => handleNotifications(), ms('15s'));
      setTimeout(timer);
    } catch (err) {
      console.log({ timeout });
      console.log('ERRO NO POLL DE NOTIFICAÇÕES');
      console.log(handleMessage(err));
      clearInterval(timeout);
    }
  }, []);

  const recoverNotifications = useCallback(async () => {
    if (user && user.ativo === 'A') {
      const notify = await AsyncStorage.getItem(NOTIFICATIONS_DATA);
      if (notify) {
        setNotifications(JSON.parse(notify));
      }
    }
  }, []);

  const setVisto = useCallback(async (id: ID) => {
    try {
      await api.put(`/api/notificacao/${id}`, { visto: true });
    } catch (err) {
      console.log('ERRO ATUALIZANDO A NOTIFICACAO PARA VISTA!');
      const erro = handleMessage(err) || '';
      console.log(erro);
      ToastAndroid.show('Ocorreu um Erro!', ToastAndroid.SHORT);
    }
  }, []);

  useEffect(() => polling(), []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        hasNotification,
        setVisto,
        setNotifications,
        setHasNotification,
        recoverNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('"Provider" não fornecido');
  }

  return context;
};

export { NotificationContext, NotificationProvider, useNotification };
