/* eslint-disable no-useless-return */
import React, { useEffect, useState } from 'react';
import { ScrollView, ToastAndroid } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import DatePicker from '@react-native-community/datetimepicker';

// Context
import { useJob } from '~/contexts';

// Components
import { DetailsComponent } from './details';
import {
  Button1,
  Button2,
  Button3,
  Button4,
  Button5,
  Button6,
  Button7,
} from './actions';

// Styles
import { styles } from './styles';
import { LoadComponent } from '~/components/load';
import { AppRoutes as Routes } from '~/constants';
import ms from 'ms';
import { differenceInDays } from 'date-fns';
import { delay } from '~/utils/delay';

export const JobDetailsScreen: React.FC<DrawerContentComponentProps> = (
  props
) => {
  const {
    job,
    assignJob,
    cancelJob,
    updateDtEntrega,
    finishJob,
    selectJob,
  } = useJob();
  const [states, setStates] = useState({
    picker: false,
    fetching: true,
    loadMain: false,
    loadData: false,
    loadRequest: false,
    btn1: false,
    btn2: false,
    btn3: false,
    btn4: false,
    btn5: false,
    btn6: false,
    btn7: false,
  });

  const parseDate = (date?: string | Date | null) => {
    let dt = '';
    if (date) {
      const a = new Date(date);
      dt = `${a.getDate()}/${a.getMonth()}/${a.getFullYear()}`;
    }

    return dt;
  };

  const log = () => {
    if (job) {
      const {
        route: {
          params: { isContratado, isContratante, isCandidato, isContratacao },
        },
      } = props as any;

      const temContratado =
        job.contratado !== null && job.contratado !== undefined;
      const temValidade = job.dtvalidade
        ? new Date(job.dtvalidade).getTime() > new Date().getTime()
        : false;
      const dtEntregaValida = new Date(job.dtentrega) > new Date();
      const pendente = job.finalizacaopendente === 'S';

      console.log(
        `\n`,
        `job -> contratado: ${
          job.contratado !== null || job.contratado !== undefined
        }\n`,
        `job -> data publicado: ${parseDate(job.dtpublicado)}\n`,
        `job -> data validade: ${parseDate(job.dtvalidade)}\n`,
        `job -> data entrega: ${parseDate(job.dtentrega)}\n`,
        `job -> status: ${job?.status}\n`,
        `job -> validade: ${differenceInDays(
          new Date(job.dtvalidade as string).getTime(),
          new Date().getTime()
        )} dias\n`
      );
      console.log(
        `\n`,
        `state -> é o contratante: ${isContratante}\n`,
        `state -> é o contratado: ${isContratado}\n`,
        `state -> é o candidato: ${isCandidato}\n`,
        `state -> finalizado: ${job.status === 'F' || job.status === 'C'}\n`,
        `state -> tem contratado: ${temContratado}\n`,
        `state -> tem validade: ${temValidade}\n`,
        `state -> data entrega valida: ${dtEntregaValida}\n`,
        `state -> finalizacao pendente: ${pendente}\n`
      );
    }
  };

  useEffect(() => {
    const {
      route: {
        params: { isContratado, isContratante, isCandidato },
      },
    } = props as any;

    // log();

    if (job) {
      const temContratado =
        job.contratado !== null && job.contratado !== undefined;
      const temValidade = job.dtvalidade
        ? new Date(job.dtvalidade).getTime() > new Date().getTime()
        : false;
      const dtEntregaValida = new Date(job.dtentrega) > new Date();
      const pendente = job.finalizacaopendente === 'S';
      const corrente = job.status === 'P';

      // é da tela principal;
      // CANDIDATAR-SE
      if (isCandidato) {
        console.log('OPICAO 1');
        setStates((s) => ({
          ...s,
          fetching: false,
          btn1: false,
          btn2: false,
          btn3: false,
          btn4: false,
          btn5: false,
          btn6: false,
          btn7: true,
        }));
        return;
      }

      // nao tem contratado; nao tem validade; tem data de entrega;
      // TODOS
      if (
        isContratante &&
        !temContratado &&
        !temValidade &&
        dtEntregaValida &&
        corrente
      ) {
        console.log('OPCAO 2');
        setStates((s) => ({
          ...s,
          fetching: false,
          btn1: true,
          btn2: false,
          btn3: false,
          btn4: false,
          btn5: false,
          btn6: false,
          btn7: false,
        }));
        return;
      }

      // nao tem contratado; nao tem validade; esta na entrega
      // CANCELAR/RENOVAR DATA
      if (
        isContratante &&
        !temContratado &&
        !temValidade &&
        dtEntregaValida &&
        corrente
        //  && !pendente
      ) {
        console.log('OPCAO 3');
        setStates((s) => ({
          ...s,
          fetching: false,
          btn1: false,
          btn2: true,
          btn3: false,
          btn4: false,
          btn5: false,
          btn6: false,
          btn7: false,
        }));
        return;
      }

      // tem contratado; nao tem validade; data entrega valida;
      // FINALIZAR/RENOVAR DATA
      if (
        isContratante &&
        temContratado &&
        dtEntregaValida &&
        corrente &&
        pendente
      ) {
        console.log('OPCAO 4');
        setStates((s) => ({
          ...s,
          fetching: false,
          btn1: false,
          btn2: false,
          btn3: true,
          btn4: false,
          btn5: false,
          btn6: false,
          btn7: false,
        }));
        return;
      }

      if (
        isContratante &&
        temContratado &&
        temValidade &&
        dtEntregaValida &&
        corrente
      ) {
        console.log('OPÇÃO 5');
        setStates((s) => ({
          ...s,
          fetching: false,
          btn1: false,
          btn2: true,
          btn3: false,
          btn4: false,
          btn5: false,
          btn6: false,
          btn7: false,
        }));
        return;
      }

      // é o contratado, não pediu finalização?
      // FINALIZAR
      if (isContratado && !pendente && corrente) {
        console.log('OPCAO 6');
        setStates((s) => ({
          ...s,
          fetching: false,
          btn1: false,
          btn2: false,
          btn3: false,
          btn4: false,
          btn5: false,
          btn6: true,
          btn7: false,
        }));
        return;
      }

      console.log('TIPO: NENHUM');
      setStates((s) => ({
        ...s,
        fetching: false,
        btn1: false,
        btn2: false,
        btn3: false,
        btn4: false,
        btn5: false,
        btn6: false,
        btn7: false,
      }));
    }
  }, [props]);

  return (
    <>
      {states.fetching ? (
        <LoadComponent center />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <DetailsComponent {...props} />

          <Button1
            main={() => {
              setStates((s) => ({ ...s, fetching: true }));
              cancelJob(job).then(() => {
                selectJob(job?.id || '');
                delay(2000).then(() => {
                  ToastAndroid.show('Trabalho Finalizado', ToastAndroid.SHORT);
                  setStates((s) => ({ ...s, fetching: false }));
                  props.navigation.goBack();
                });
              });
            }}
            data={() => setStates((s) => ({ ...s, picker: true }))}
            candidatos={() => {
              props.navigation.navigate(Routes.CandidatesRouter);
            }}
            loadMain={states.loadMain}
            loadData={states.loadData}
            show={states.btn1}
          />

          <Button2
            main={() =>
              cancelJob(job).then(() => {
                ToastAndroid.show('Trabalho Cancelado!', ToastAndroid.SHORT);
                props.navigation.goBack();
              })
            }
            data={() => setStates((s) => ({ ...s, picker: true }))}
            loadData={states.loadData}
            loadRequest={states.loadRequest}
            show={states.btn2}
          />

          <Button3
            main={() => {
              setStates((s) => ({ ...s, fetching: true }));
              finishJob('contratante', job).then(() => {
                selectJob(job?.id || '');
                delay(2000).then(() => {
                  ToastAndroid.show('Trabalho Finalizado!', ToastAndroid.SHORT);
                  setStates((s) => ({ ...s, fetching: false }));
                  props.navigation.goBack();
                });
              });
            }}
            data={() => setStates((s) => ({ ...s, picker: true }))}
            loadMain={states.loadMain}
            loadData={states.loadData}
            show={states.btn3}
          />

          <Button4 show={states.btn4} />

          <Button5 show={states.btn5} />

          <Button6
            main={() => {
              setStates((s) => ({ ...s, fetching: true }));
              finishJob('contratado', job).then(() => {
                ToastAndroid.show(
                  'Finalização em Aguardo!',
                  ToastAndroid.SHORT
                );
              });
              delay(1000).then(() => {
                setStates((s) => ({ ...s, fetching: false }));
                props.navigation.goBack();
              });
            }}
            loadMain={states.loadMain}
            show={states.btn6}
          />

          <Button7
            main={() => {
              setStates((s) => ({ ...s, fetching: true }));
              assignJob(job).then(() => {
                setStates((s) => ({ ...s, fetching: false }));
                props.navigation.canGoBack();
              });
            }}
            loadMain={states.loadMain}
            show={states.btn7}
          />

          {states.picker && (
            <DatePicker
              value={new Date()}
              display="spinner"
              minimumDate={new Date()}
              maximumDate={new Date(new Date().getTime() + ms('1y'))}
              mode="datetime"
              onChange={(evt: any, date: any) => {
                setStates((s) => ({ ...s, fetching: true }));
                if (evt?.type === 'dismissed') {
                  setStates((c) => ({ ...c, picker: false, fetching: false }));
                }

                if (evt?.type === 'set' && date) {
                  ToastAndroid.show('Enviando...', ToastAndroid.SHORT);
                  updateDtEntrega(job, date).then(() => {
                    selectJob(job?.id || '');
                    delay(1500).then(() => {
                      ToastAndroid.show('Atualizado!', ToastAndroid.SHORT);
                      setStates((c) => ({
                        ...c,
                        picker: false,
                        fetching: false,
                      }));
                    });
                  });
                }
              }}
            />
          )}
        </ScrollView>
      )}
    </>
  );
};
