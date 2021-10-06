import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { ToastAndroid } from 'react-native';
import { handleMessage } from '~/errors/handle-message';
import { api } from '~/services';
import { useAuth, User } from './auth';
import {
  Item,
  Job,
  ListItem,
  PageResult,
  Filter,
  BottomFetch,
  FilterValues,
  PublishJob,
  HistoryOrRequests,
  ListCandidatos,
  ID,
} from './types';

interface JobContextData {
  limitJobs: number;
  currentJobs: number;
  jobList: ListItem[];
  historyList: ListItem[];
  requestsList: ListItem[];
  candidatosList: ListCandidatos[];
  job: Job;
  filters: FilterValues;
  candidato: ListCandidatos;
  setFilters: (_filters: FilterValues) => void;
  topFetch: () => Promise<void>;
  defaultFetch: (_page?: number) => Promise<void>;
  bottomFetch: (_bottom: BottomFetch) => Promise<void>;
  filteredFetch: (_filter: Filter) => Promise<void>;
  assignJob: (_job: Job) => Promise<void>;
  cancelJob: (_job: Job) => Promise<void>;
  updateDtEntrega: (_job: Job, _dtentrega: Date) => Promise<void>;
  findCandidates: (_id: ID) => Promise<void>;
  selectCandidate: (_candidate: ListCandidatos) => void;
  acceptCandidate: (_candidate: ListCandidatos) => Promise<void>;
  finishJob: (_from: 'contratante' | 'contratado', _job: Job) => Promise<void>;
  publishJob: (_job: PublishJob) => Promise<void>;
  selectJob: (_id: ID) => void;
  getHistory: (_history: HistoryOrRequests) => Promise<void>;
  getRequests: (_requests: HistoryOrRequests) => Promise<void>;
}

/**
 * calcula o tempo da request;
 *
 * @param block function
 */
const track = async (block: () => Promise<unknown>, log = false) => {
  const start = new Date();
  await block();
  log &&
    console.log(
      `Tempo de requisição: ${new Date(
        new Date().getTime() - start.getTime()
      ).getSeconds()}s`
    );
};

const POR_FILTRO = '/api/trampo/consulta/por-filtro';
const POR_GEOCODE = '/api/trampo/consulta/por-geocode';
const DEFAULT = '/api/trampo';

const JobContext = createContext({} as JobContextData);

const JobProvier: React.FC = ({ children }) => {
  const [job, setJob] = useState<Job>(null);
  const [trampos, setTrampos] = useState<PageResult<ListItem>>(
    {} as PageResult<ListItem>
  );
  const [history, setHistory] = useState<PageResult<ListItem>>(
    {} as PageResult<ListItem>
  );
  const [requests, setRequests] = useState<PageResult<ListItem>>(
    {} as PageResult<ListItem>
  );
  const [candidatos, setCandidatos] = useState<PageResult<ListCandidatos>>(
    {} as PageResult<ListCandidatos>
  );
  const [candidato, setCandidato] = useState({} as ListCandidatos);
  const [filters, setFilters] = useState({} as FilterValues);
  const [limitJobs, setLimitJobs] = useState(0);
  const { user } = useAuth();

  const topFetch = useCallback(async () => {
    await track(async () => {
      try {
        let url = `${POR_GEOCODE}?page=${0}`;

        if (user?.location) {
          const {
            location: { latitude, longitude },
          } = user as User;
          if (latitude && longitude) {
            url += `&location=${latitude},${longitude}`;
          }
        } else {
          url = DEFAULT;
        }

        const { data } = await api.get<PageResult<ListItem>>(url);
        setTrampos(data);
      } catch (err) {
        console.log('TOP FETCH', handleMessage(err));
      }
    });
  }, []);

  const bottomFetch = useCallback(async ({ page, pageSize }: BottomFetch) => {
    await track(async () => {
      try {
        let url = `${POR_GEOCODE}?page=${page}&pageSize=${pageSize}`;

        if (user?.location) {
          const {
            location: { latitude, longitude },
          } = user as User;

          if (latitude && longitude) {
            url += `&location=${latitude},${longitude}`;
          }
        } else {
          url = `${DEFAULT}?page=${page}&pageSize=${pageSize}`;
        }

        const { data } = await api.get<PageResult<ListItem>>(url);
        setTrampos((s) => ({
          ...data,
          data: [...s.data, ...data.data],
        }));
      } catch (err) {
        console.log('BOTTOM FETCH', handleMessage(err));
      }
    });
  }, []);

  const filteredFetch = useCallback(
    async ({ area, cidade, grupo, page, pageSize, checkbox, add }: Filter) => {
      await track(async () => {
        try {
          let url = `${POR_FILTRO}?page=${page}&pageSize=${pageSize}`;

          if (checkbox) {
            const {
              location: { cidade },
            } = user as User;

            url += `&cidade=${cidade}`;
          } else {
            url += `&area=${area}&cidade=${cidade}&grupo=${grupo}`;
          }

          const pageResult = (await api.get<PageResult<ListItem>>(url)).data;

          if (add) {
            setTrampos((s) => ({
              ...pageResult,
              data: [...s.data, ...pageResult.data],
            }));
          } else {
            setTrampos(pageResult);
          }
        } catch (err) {
          console.log('FILTERED FETCH', handleMessage(err));
        }
      });
    },
    []
  );

  const defaultFetch = useCallback(async (page?: number) => {
    await track(async () => {
      try {
        let url = `${POR_GEOCODE}?page=${page}`;

        if (user?.location) {
          const {
            location: { latitude, longitude },
          } = user as User;

          if (latitude && longitude) {
            url += `&location=${latitude},${longitude}`;
          }
        } else {
          url = `${DEFAULT}?flStatus=P&cdContratado=IS NULL`;
        }

        const { data } = await api.get<PageResult<ListItem>>(url);
        setTrampos(data);
      } catch (err) {
        console.log('DEFAULT FETCH', handleMessage(err));
      }
    });
  }, []);

  const assignJob = useCallback(async (job: any) => {
    try {
      await api.put(`/api/trampo/${job.id}/candidatar`);
      ToastAndroid.show('Você se Candidatou!', ToastAndroid.SHORT);
    } catch (err) {
      const erro = handleMessage(err);
      console.log('CANDIDATAR-SE', erro);
      erro && ToastAndroid.show(erro, ToastAndroid.SHORT);
    }
  }, []);

  const cancelJob = useCallback(async (job: Item | null) => {
    try {
      if (job) {
        await api.put(`/api/trampo/${job.id}/cancelar`);
        ToastAndroid.show('Trampo Cancelado!', ToastAndroid.SHORT);
      }
    } catch (err) {
      const erro = handleMessage(err);
      console.log('CANCELAR', erro);
      erro && ToastAndroid.show(erro, ToastAndroid.SHORT);
    }
  }, []);

  const updateDtEntrega = useCallback(
    async (job: Item | null, dtentrega: Date) => {
      try {
        await api.put(`/api/trampo/${job?.id}/renovar-data`, { dtentrega });
        ToastAndroid.show('Data Atualizada!', ToastAndroid.SHORT);
      } catch (err) {
        const erro = handleMessage(err) || '';
        console.log('DTENTREGA: ', erro);
        erro && ToastAndroid.show(erro, ToastAndroid.SHORT);
      }
    },
    []
  );

  const findCandidates = useCallback(async (id: ID) => {
    try {
      if (id) {
        const { data } = await api.get<PageResult<ListCandidatos>>(
          `/api/trampo/candidatos/${id}?pageSize=100`
        );
        setCandidatos(data);
      }
    } catch (err) {
      console.log('ERRO CONSULTANDO CANDIDATOS');
      const erro = handleMessage(err) || '';
      console.log(erro);
      erro && ToastAndroid.show(erro, ToastAndroid.SHORT);
    }
  }, []);

  const selectCandidate = useCallback((candidato: ListCandidatos) => {
    setCandidato(candidato);
  }, []);

  const acceptCandidate = useCallback(async (candidato: ListCandidatos) => {
    console.log('CONTRATANDO: ', candidato);

    try {
      await api.put(
        `/api/trampo/${candidato.trampo}/contratar/${candidato.id}`
      );
      ToastAndroid.show(
        `${candidato.nome} foi contratado, entre em contato!!`,
        ToastAndroid.SHORT
      );
    } catch (err) {
      const erro = handleMessage(err) || '';
      console.log('ERRO ACEITANDO CANDIDATO!!!', erro);
      erro && ToastAndroid.show(erro, ToastAndroid.SHORT);
    }
  }, []);

  /**
   * Cadastra um novo trabalho
   *
   * @param job Dados
   */
  const publishJob = useCallback(async (job: PublishJob) => {
    await api.post('/api/trampo/novo', job);
  }, []);

  /**
   * Seleciona o objeto.
   * Seta o objeto no estado para abrir na outra tela.
   * @param item Item da Lista
   */
  const selectJob = useCallback(
    async (id: ID) => setJob((await api.get(`/api/trampo/${id}`)).data),
    []
  );

  const getHistory = useCallback(
    async ({ add, page, pageSize }: HistoryOrRequests) => {
      try {
        const { data } = await api.get<PageResult<ListItem>>(
          `${DEFAULT}?page=${page}&pageSize=${pageSize}&cdContratado=${user?.id}`
        );

        if (add) {
          setHistory((h) => ({ ...data, data: [...h.data, ...data.data] }));
        } else {
          setHistory(data);
        }
      } catch (err) {
        console.log(handleMessage(err));
      }
    },
    []
  );

  const getRequests = useCallback(
    async ({ add, page, pageSize }: HistoryOrRequests) => {
      try {
        // TODO: Chamar API, filtrar cima e em baixo?
        const { data } = await api.get<PageResult<ListItem>>(
          `${DEFAULT}?page=${page}&pageSize=${pageSize}&cdContratante=${user?.id}`
        );

        if (add) {
          setRequests((r) => ({ ...data, data: [...r.data, ...data.data] }));
        } else {
          setRequests(data);
        }
      } catch (err) {
        console.log(handleMessage(err));
      }
    },
    []
  );

  const finishJob = useCallback(
    async (from: 'contratante' | 'contratado', job: Job) => {
      try {
        if (from === 'contratado') {
          await api.put(`/api/trampo/${job?.id}/contratado/finalizar`);
        }

        if (from === 'contratante') {
          await api.put(`/api/trampo/${job?.id}/contratante/finalizar`);
        }
        ToastAndroid.show('Pendente para finalização!', ToastAndroid.SHORT);
      } catch (err) {
        const erro = handleMessage(err) || '';
        console.log(`ERRO FINALIZANDO POR ${from}:`, erro);
        erro && ToastAndroid.show(erro, ToastAndroid.SHORT);
      }
    },
    []
  );

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       setLimitJobs((await api.get(`/api/trampo/limite`)).data.limit);
  //     } catch (err) {
  //       console.log('COUNT', handleMessage(err));
  //     }
  //   })();
  // }, []);

  return (
    <JobContext.Provider
      value={{
        job,
        candidato,
        limitJobs,
        currentJobs: trampos.totalRecords,
        jobList: trampos.data,
        filters,
        historyList: history.data,
        requestsList: requests.data,
        getHistory,
        getRequests,
        setFilters,
        topFetch,
        defaultFetch,
        bottomFetch,
        filteredFetch,
        assignJob,
        cancelJob,
        updateDtEntrega,
        publishJob,
        selectJob,
        findCandidates,
        selectCandidate,
        acceptCandidate,
        finishJob,
        candidatosList: candidatos.data,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

/**
 * Utiliza o contexto de Job
 * @returns JobContextData
 */
const useJob = () => {
  const context = useContext(JobContext);

  if (!context) {
    throw new Error('"jobContext" Precisa ser usado com "JobProvider"');
  }

  return context;
};

export { JobContext, JobProvier, useJob };
