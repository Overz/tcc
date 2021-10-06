import React, { createContext, useCallback, useContext, useState } from 'react';
import { ToastAndroid } from 'react-native';
import { handleMessage } from '~/errors/handle-message';
import { api } from '~/services';
import { useAuth } from './auth';
import { ID, UserRank } from './types';

interface Avaliation {
  nota: number;
  elogio?: string;
  avaliado: ID;
  trampo: ID;
}

interface RankContextData {
  profile: UserRank;
  getUserRank: (_id?: ID) => Promise<void>;
  avaliate: (_avaliation: Avaliation) => Promise<void>;
  canAvaliate: (
    id?: ID
  ) => Promise<{ from: string; avaliado: boolean; avaliador: boolean }>;
}

const RankContext = createContext({} as RankContextData);

const RankProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const [userRank, setUserRank] = useState<UserRank>({} as UserRank);

  const avaliate = useCallback(
    async ({ avaliado, nota, trampo, elogio }: Avaliation) => {
      //   TODO: Utilizar para avaliar os usuários
      try {
        await api.post('/api/avaliacao', { avaliado, nota, trampo, elogio });
        ToastAndroid.show('Candidato Avaliado!', ToastAndroid.SHORT);
      } catch (err) {
        const erro = handleMessage(err) || '';
        console.log('ERRO AVALIANDO: ', erro);
        erro && ToastAndroid.show(erro, ToastAndroid.SHORT);
      }
    },
    []
  );

  const canAvaliate = useCallback(
    async (id?: ID): Promise<any> =>
      (await api.get(`/api/avaliacao/disponivel/${id}`)).data,
    []
  );

  const getUserRank = useCallback(async (id?: ID) => {
    const { data } = await api.get<UserRank>(
      `/api/avaliacao/pessoal/${id || user?.id}`
    );

    const dtcadastro = new Date(
      Date.parse(data.dtcadastro)
    ).toLocaleDateString();
    const split = dtcadastro.split('/');
    data.dtcadastro = `${split[1]}/${split[0]}/${split[2]}`;

    setUserRank(data);
  }, []);

  return (
    <RankContext.Provider
      value={{
        profile: userRank,
        avaliate,
        getUserRank,
        canAvaliate,
      }}
    >
      {children}
    </RankContext.Provider>
  );
};

const useRank = () => {
  const context = useContext(RankContext);

  if (!context) {
    throw new Error('"rankContext" precisa ser utilizado com o provider');
  }

  return context;
};

export { RankContext, RankProvider, useRank };
