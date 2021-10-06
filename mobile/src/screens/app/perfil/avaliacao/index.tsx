import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleProp,
  ViewStyle,
  ToastAndroid,
} from 'react-native';
import { Avatar, Button, DefaultTheme } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

import { TipoElogio, useAuth, useJob, useRank } from '~/contexts';

import { LoadComponent } from '~/components';

import { styles } from './styles';
import { colors, AppRoutes as Routes, Indexable } from '~/constants';
import {
  Elogios,
  BOM,
  ADAPTAVEL,
  CARISMATICO,
  COMPETENTE,
  COPERATIVO,
  CRIATIVO,
  EFICIENTE,
  EXCELENTE,
  ORGANIZADO,
  RAPIDO,
  ZELOSO,
  OTIMO,
  getElogios,
} from './types';
import { ElogioItem } from './elogio';
import { Feather } from '@expo/vector-icons';
import { delay } from '~/utils/delay';

const Separator: React.FC = () => (
  <View
    style={{
      borderBottomWidth: 1,
      borderBottomColor: colors.greyLight,
    }}
  />
);

const selected = () => ({
  ADAPTAVEL: false,
  CARISMATICO: false,
  COMPETENTE: false,
  COPERATIVO: false,
  CRIATIVO: false,
  EXCELENTE: false,
  ORGANIZADO: false,
  OTIMO: false,
  EFICIENTE: false,
  BOM: false,
  RAPIDO: false,
  ZELOSO: false,
});

export const ProfileAvaliacaoScreen: React.FC<
  DrawerContentComponentProps & { shouldGet?: boolean }
> = (props) => {
  const { user } = useAuth();
  const { profile, getUserRank, avaliate, canAvaliate } = useRank();
  const { acceptCandidate, candidato, job } = useJob();
  const [states, setStates] = useState({
    fetching: true,
    isAvatarText: true,
    elogios: [] as Elogios[],
    canAvaliate: { from: '', avaliado: false, avaliador: false },
    elogio: '',
    selected: selected(),
    style: { borderColor: colors.blueSky } as StyleProp<ViewStyle>,
    enable: false,
    isAvaliacao: false,
    isContratacao: false,
    loading: false,
    rate: 5,
  });

  const handleAvaliacao = async () => {
    // TODO: Exibir apenas na finalização do trampo
    // TODO: Realizar a request
    if (states.rate <= 0) {
      ToastAndroid.show('De uma nota acima de 0!', ToastAndroid.SHORT);
      return;
    }

    const can = await canAvaliate(job?.id);
    if (!can.avaliado && !can.avaliador) {
      if (job?.status === 'F' || job?.status === 'C') {
        ToastAndroid.show(
          'Trabalho Finalizado ou Cancelado!',
          ToastAndroid.SHORT
        );
        return;
      }
    }

    if (job?.finalizacaopendente === 'S' || job?.status === 'P') {
      const isContratante = job?.contratante.id === user?.id;
      const isContratado = job?.contratado.id === user?.id;
      ToastAndroid.show('Trabalho não Finalizado!', ToastAndroid.SHORT);
      props.navigation.navigate(Routes.JobsDetailsRouter, {
        isContratante,
        isContratado,
        isCandidato: false,
      });
      return;
    }

    const form = {
      avaliado: profile.id,
      nota: states.rate,
      trampo: job?.id as string,
      elogio: states.elogio || undefined,
    };

    console.log('FORMULARIO DE AVALIAÇÃO: ', form);
    await avaliate(form);

    // TODO: Levar para dashboard SEM NAVEGAR
    props.navigation.navigate(Routes.DashboardRouter);
    props.navigation.reset({
      index: 0,
      routes: [{ name: Routes.DashboardRouter }],
    });
  };

  const handleContratacao = () => {
    // TODO: Contratar e levar a tela de Dashboard
    acceptCandidate(candidato).then(() =>
      props.navigation.navigate(Routes.DashboardRouter)
    );
  };

  const handleSelected = (params: Indexable) => {
    const name = Object.keys(params)[0];
    const value = Object.values(params)[0];
    const rest = { ...states.selected } as any;
    const keys = Object.keys(rest);
    for (let i = 0; i < keys.length; i++) {
      rest[keys[i]] = false;
      setStates((s) => ({ ...s, selected: rest }));
    }

    setStates((s) => ({
      ...s,
      selected: { ...s.selected, [name]: value },
      elogio: name,
    }));
  };

  useEffect(() => {
    if (props.shouldGet) {
      setStates((s) => ({ ...s, fetching: true }));
      getUserRank().then(() => setStates((s) => ({ ...s, fetching: false })));
    }

    const {
      route: { params },
    } = props as any;

    let isContratacao = false;
    let isAvaliacao = false;
    let enable = false;
    if (params?.isAvaliacao) {
      isAvaliacao = params.isAvaliacao;
    }
    if (params?.isContratacao) {
      isContratacao = params.isContratacao;
    }

    if (params?.isEnable) {
      enable = params.isEnable;
    }

    setStates((s) => ({ ...s, isAvaliacao, isContratacao, enable }));

    // canAvaliate(job?.id).then((data) => {
    //   if(job?.contratante.id === user?.id) {
    //     setStates((s) => ({...s, canAvaliate: {...s.canAvaliate, }}))
    //   }
    //   setStates((s) => ({ ...s, canAvaliate: data }));
    // });
  }, [props]);

  useEffect(() => {
    setStates((s) => ({ ...s, fetching: true }));
    const elogios: Elogios[] = getElogios();
    const select = selected();

    if (profile?.elogios?.length > 0) {
      for (let i = 0; i < profile.elogios.length; i++) {
        const elogio = profile.elogios[i];
        if (elogio.total <= 0) {
          // eslint-disable-next-line no-continue
          continue;
        }

        switch (elogio.tipo) {
          case TipoElogio.BOM:
            elogios[BOM].count = elogio.total;
            elogios[BOM].enable = true;
            elogios[BOM].color = colors.blueSky;
            select.BOM = true;
            break;
          case TipoElogio.ADAPTAVEL:
            elogios[ADAPTAVEL].count = elogio.total;
            elogios[ADAPTAVEL].enable = true;
            elogios[ADAPTAVEL].color = '#42AFB1';
            select.ADAPTAVEL = true;
            break;
          case TipoElogio.CARISMATICO:
            elogios[CARISMATICO].count = elogio.total;
            elogios[CARISMATICO].enable = true;
            elogios[CARISMATICO].color = '#FF8BF3';
            select.CARISMATICO = true;
            break;
          case TipoElogio.COMPETENTE:
            elogios[COMPETENTE].color = '#0039B4';
            elogios[COMPETENTE].count = elogio.total;
            elogios[COMPETENTE].enable = true;
            select.COMPETENTE = true;
            break;
          case TipoElogio.COPERATIVO:
            elogios[COPERATIVO].color = '#37B437';
            elogios[COPERATIVO].count = elogio.total;
            elogios[COPERATIVO].enable = true;
            select.COPERATIVO = true;
            break;
          case TipoElogio.CRIATIVO:
            elogios[CRIATIVO].color = '#767272';
            elogios[CRIATIVO].count = elogio.total;
            elogios[CRIATIVO].enable = true;
            select.CRIATIVO = true;
            break;
          case TipoElogio.EFICIENTE:
            elogios[EFICIENTE].color = '#904BD0';
            elogios[EFICIENTE].count = elogio.total;
            elogios[EFICIENTE].enable = true;
            select.EFICIENTE = true;
            break;
          case TipoElogio.EXCELENTE:
            elogios[EXCELENTE].color = '#f00';
            elogios[EXCELENTE].count = elogio.total;
            elogios[EXCELENTE].enable = true;
            select.EXCELENTE = true;
            break;
          case TipoElogio.ORGANIZADO:
            elogios[ORGANIZADO].color = '#000';
            elogios[ORGANIZADO].count = elogio.total;
            elogios[ORGANIZADO].enable = true;
            select.ORGANIZADO = true;
            break;
          case TipoElogio.RAPIDO:
            elogios[RAPIDO].color = '#FF6C00';
            elogios[RAPIDO].count = elogio.total;
            elogios[RAPIDO].enable = true;
            select.RAPIDO = true;
            break;
          case TipoElogio.ZELOSO:
            elogios[ZELOSO].color = '#C04F4F';
            elogios[ZELOSO].count = elogio.total;
            elogios[ZELOSO].enable = true;
            select.ZELOSO = true;
            break;
          case TipoElogio.OTIMO:
            elogios[OTIMO].color = '#D1B038';
            elogios[OTIMO].count = elogio.total;
            elogios[OTIMO].enable = true;
            select.OTIMO = true;
            break;
          default:
            break;
        }
      }
    }

    delay(2000).then(() => {
      setStates((s) => ({
        ...s,
        fetching: false,
        elogios,
        selected: select,
        isAvatarText: profile?.pic?.length <= 2,
      }));
    });
  }, [profile]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {states.fetching ? (
        <LoadComponent center />
      ) : (
        <>
          <View style={styles.containerAvatar}>
            <View style={styles.avatar}>
              {states.isAvatarText ? (
                <Avatar.Text size={130} label={profile?.pic || ''} />
              ) : (
                <Avatar.Image
                  size={130}
                  source={{ uri: `data:image/gif;base64,${profile.pic}` }}
                />
              )}
            </View>

            <Text style={{ marginTop: 20, fontSize: 20, fontWeight: 'bold' }}>
              {profile.nome}
            </Text>

            <Rating
              type="custom"
              showRating={states.isAvaliacao}
              readonly={!states.isAvaliacao}
              style={{ marginTop: 20 }}
              ratingTextColor="purple"
              ratingColor="purple"
              showReadOnlyText={false}
              fractions={1}
              tintColor={DefaultTheme.colors.background}
              startingValue={profile.avaliacao}
              ratingCount={5.0}
              minValue={1}
              imageSize={32}
              jumpValue={5}
              onFinishRating={(rate: any) => setStates((s) => ({ ...s, rate }))}
            />
          </View>

          {!states.isAvaliacao && (
            <View>
              <View style={{ paddingBottom: 15 }}>
                <View style={styles.infoWrapper}>
                  <Text style={[{ paddingLeft: 30 }, styles.infoText]}>
                    {profile.totalTrabalhos}
                  </Text>
                  <Text style={[{ paddingLeft: 30 }, styles.infoText]}>
                    {profile.avaliacao}
                  </Text>
                  <Text style={styles.infoText}>{profile.dtcadastro}</Text>
                </View>
                <View style={styles.infoWrapper}>
                  <Text style={styles.infoText}>Trabalhos</Text>
                  <Text style={styles.infoText}>Avaliação</Text>
                  <Text style={styles.infoText}>Cadastro</Text>
                </View>
              </View>

              <Separator />

              <View style={{ paddingTop: 20, paddingBottom: 20 }}>
                <Text style={styles.infoSobre}>{profile.sobre}</Text>
              </View>

              <Separator />
            </View>
          )}

          <View style={styles.elogioInfo}>
            <Text style={{ marginTop: 10, fontSize: 22, fontWeight: 'bold' }}>
              Elogios
            </Text>
          </View>

          <View>
            <View style={styles.elogioRow}>
              <ElogioItem
                {...states.elogios[ADAPTAVEL]}
                enable={states.enable}
                onPress={() =>
                  handleSelected({ ADAPTAVEL: !states.selected.ADAPTAVEL })
                }
                styles={
                  states.selected.ADAPTAVEL && { borderColor: colors.blueSky }
                }
                color={
                  states.selected.ADAPTAVEL ? colors.blueSky : colors.greyLight
                }
              />
              <ElogioItem
                {...states.elogios[CARISMATICO]}
                enable={states.enable}
                onPress={() =>
                  handleSelected({ CARISMATICO: !states.selected.CARISMATICO })
                }
                styles={
                  states.selected.CARISMATICO && { borderColor: '#FF8BF3' }
                }
                color={
                  states.selected.CARISMATICO ? '#FF8BF3' : colors.greyLight
                }
              />
              <ElogioItem
                {...states.elogios[COMPETENTE]}
                enable={states.enable}
                onPress={() =>
                  handleSelected({ COMPETENTE: !states.selected.COMPETENTE })
                }
                styles={
                  states.selected.COMPETENTE && { borderColor: '#0039B4' }
                }
                color={
                  states.selected.COMPETENTE ? '#0039B4' : colors.greyLight
                }
              />
              <ElogioItem
                {...states.elogios[COPERATIVO]}
                enable={states.enable}
                onPress={() =>
                  handleSelected({ COPERATIVO: !states.selected.COPERATIVO })
                }
                styles={
                  states.selected.COPERATIVO && { borderColor: '#37B437' }
                }
                color={
                  states.selected.COPERATIVO ? '#37B437' : colors.greyLight
                }
              />
            </View>
            <View style={styles.elogioRow}>
              <ElogioItem
                {...states.elogios[CRIATIVO]}
                enable={states.enable}
                onPress={() =>
                  handleSelected({ CRIATIVO: !states.selected.CRIATIVO })
                }
                styles={states.selected.CRIATIVO && { borderColor: '#767272' }}
                color={states.selected.CRIATIVO ? '#767272' : colors.greyLight}
              />
              <ElogioItem
                {...states.elogios[EXCELENTE]}
                enable={states.enable}
                onPress={() =>
                  handleSelected({ EXCELENTE: !states.selected.EXCELENTE })
                }
                styles={states.selected.EXCELENTE && { borderColor: '#f00' }}
                color={states.selected.EXCELENTE ? '#f00' : colors.greyLight}
              />
              <ElogioItem
                {...states.elogios[ORGANIZADO]}
                enable={states.enable}
                onPress={() =>
                  handleSelected({ ORGANIZADO: !states.selected.ORGANIZADO })
                }
                styles={states.selected.ORGANIZADO && { borderColor: '#000' }}
                color={states.selected.ORGANIZADO ? '#000' : colors.greyLight}
              />
              <ElogioItem
                {...states.elogios[OTIMO]}
                enable={states.enable}
                onPress={() =>
                  handleSelected({ OTIMO: !states.selected.OTIMO })
                }
                styles={states.selected.OTIMO && { borderColor: '#D1B038' }}
                color={states.selected.OTIMO ? '#D1B038' : colors.greyLight}
              />
            </View>
            <View style={styles.elogioRow}>
              <ElogioItem
                {...states.elogios[EFICIENTE]}
                enable={states.enable}
                onPress={() =>
                  handleSelected({ EFICIENTE: !states.selected.EFICIENTE })
                }
                styles={states.selected.EFICIENTE && { borderColor: '#904BD0' }}
                color={states.selected.EFICIENTE ? '#904BD0' : colors.greyLight}
              />
              <ElogioItem
                {...states.elogios[BOM]}
                enable={states.enable}
                onPress={() => handleSelected({ BOM: !states.selected.BOM })}
                styles={states.selected.BOM && { borderColor: '#42AFB1' }}
                color={states.selected.BOM ? '#42AFB1' : colors.greyLight}
              />
              <ElogioItem
                {...states.elogios[RAPIDO]}
                enable={states.enable}
                onPress={() =>
                  handleSelected({ RAPIDO: !states.selected.RAPIDO })
                }
                styles={states.selected.RAPIDO && { borderColor: '#FF6C00' }}
                color={states.selected.RAPIDO ? '#FF6C00' : colors.greyLight}
              />
              <ElogioItem
                {...states.elogios[ZELOSO]}
                enable={states.enable}
                onPress={() =>
                  handleSelected({ ZELOSO: !states.selected.ZELOSO })
                }
                styles={states.selected.ZELOSO && { borderColor: '#C04F4F' }}
                color={states.selected.ZELOSO ? '#C04F4F' : colors.greyLight}
              />
            </View>
          </View>

          <View style={{ paddingTop: 35 }}>
            {states.isAvaliacao && (
              <>
                <Button
                  style={{ marginBottom: 10 }}
                  contentStyle={{ flexDirection: 'row-reverse' }}
                  mode="contained"
                  icon={() => states.elogios[OTIMO].icon('white')}
                  loading={states.loading}
                  onPress={handleAvaliacao}
                >
                  Avaliar
                </Button>
                {/* 
                <View />

                <Button
                  style={{ marginTop: 10 }}
                  contentStyle={{ flexDirection: 'row-reverse' }}
                  mode="contained"
                  icon={() => states.elogios[ZELOSO].icon('white')}
                  onPress={handleProblema}
                >
                  Relatar Problema
                </Button> */}
              </>
            )}

            {states.isContratacao && (
              <Button
                mode="contained"
                contentStyle={{ flexDirection: 'row-reverse' }}
                loading={states.loading}
                icon={() => <Feather name="check" size={24} color="white" />}
                onPress={handleContratacao}
              >
                Contratar
              </Button>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
};
