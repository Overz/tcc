import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import {
  AntDesign,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';

// Context
import { Item, useJob } from '~/contexts';

// Components
import { AppHeaderComponent } from '~/components/header/app';
import { TypeJobComponent } from '~/components/job/type';

// Styles
import { styles } from './styles';
import { AppRoutes as Routes } from '~/constants';

export const DetailsComponent: React.FC<DrawerContentComponentProps> = ({
  navigation,
  ...rest
}) => {
  const { job } = useJob();
  const [states, setStates] = useState({
    info: job as Item,
    status: '',
    statusIcon: () => <FontAwesome5 name="running" size={20} color="black" />,
  });

  useEffect(() => {
    setStates((s) => ({ ...s, info: job as Item }));
  }, [job]);

  useEffect(() => {
    const { info } = states;
    let status = 'Pendente';
    let statusIcon = () => (
      <FontAwesome5 name="running" size={20} color="black" />
    );

    if (info.status === 'C') {
      statusIcon = () => (
        <MaterialIcons name="cancel" size={20} color="black" />
      );
      status = 'Cancelado';
    }

    if (info.status === 'F') {
      statusIcon = () => (
        <AntDesign name="checkcircleo" size={20} color="black" />
      );
      status = 'Finalizado';
    }

    setStates((s) => ({ ...s, status, statusIcon }));
  }, [job]);

  return (
    <>
      <AppHeaderComponent
        {...rest}
        navigation={navigation}
        text="Informações do Trampo"
      />
      {states.info.latitude && states.info.longitude ? (
        <View style={styles.mapWrapper}>
          <MapView
            provider="google"
            style={styles.map}
            initialRegion={{
              latitude: +states.info.latitude,
              longitude: +states.info.longitude,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            loadingBackgroundColor="red"
          >
            <Circle
              fillColor="rgba(230,238,255, .7)"
              strokeColor="rgba(0, 120, 255, .5)"
              strokeWidth={1}
              radius={400}
              center={{
                latitude: +states.info.latitude,
                longitude: +states.info.longitude,
              }}
            />
          </MapView>
        </View>
      ) : (
        <View style={styles.noMap}>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <Text style={{ fontSize: 20 }}>Nada Encontrado{'   '}</Text>
            <Feather name="alert-octagon" color="red" size={30} />
          </View>
          <Text style={{ fontSize: 13 }}>
            Tipo do Trabalho:{' '}
            {states.info.tipo === 'O' ? 'Online' : 'Presencial'}
          </Text>
        </View>
      )}

      <View style={styles.separator} />

      <View>
        <Text style={styles.label}>{states.info.area}</Text>
        <View style={styles.textSeparator} />
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginBottom: 15,
          }}
        >
          <TypeJobComponent
            type={states.info.tipo === 'O' ? 'Online' : 'Presencial'}
          />
        </View>
        <View style={styles.textWrapper}>
          <MaterialIcons name="attach-money" size={24} color="black" />
          <Text style={styles.infoMoney}>
            {`Valor: ${Number(states.info.remuneracao).toFixed(2)}`}
          </Text>
        </View>
        <View style={styles.textSeparator} />

        <View style={styles.textWrapper}>
          <MaterialCommunityIcons
            name="calendar-month"
            color="black"
            size={25}
          />
          <Text>{` Publicado em: `}</Text>
          <Text style={styles.textInfo}>
            {format(
              (states.info.dtpublicado && new Date(states.info.dtpublicado)) ||
                0,
              'dd/MM/yyyy',
              {
                locale: pt,
              }
            )}
          </Text>
        </View>

        <View style={[styles.textWrapper, { marginTop: 15 }]}>
          <MaterialCommunityIcons
            name="calendar-month"
            color="black"
            size={25}
          />
          <Text>{` Data de entrega: `}</Text>
          <Text style={styles.textInfo}>
            {format(
              (states.info.dtentrega && new Date(states.info.dtentrega)) || 0,
              'dd/MM/yyyy',
              {
                locale: pt,
              }
            )}
          </Text>
        </View>

        <View style={[styles.textWrapper, { marginTop: 15 }]}>
          <AntDesign name="questioncircleo" size={24} color="black" />
          <Text>{` Status: ${states.status}  `}</Text>
          {states.statusIcon()}
        </View>
      </View>

      <View style={styles.separator} />

      <View>
        <View style={styles.infoWrapper}>
          <Feather name="info" size={30} color="rgba(0, 120, 255, .5)" />
          <Text style={styles.info}>{' Informações:'}</Text>
        </View>
        <View style={styles.sobreWrapper}>
          <Text>{states.info.descricao}</Text>
        </View>
      </View>

      <View>
        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.showProfileButton}
          onPress={() => {
            ToastAndroid.show('Carregando...', ToastAndroid.SHORT);
            navigation.navigate(Routes.ProfileAvaliationRouter, {
              isAvaliacao: false,
              isContratacao: false,
            });
          }}
        >
          <View style={styles.textWrapper}>
            <FontAwesome5 name="user-circle" color="black" size={20} />
            <Text style={[styles.userName, { maxHeight: 20 }]}>
              {states.info.contratante.nome}
            </Text>
          </View>
          <Feather name="arrow-right" size={20} color="black" />
        </TouchableOpacity>

        <View style={styles.textSeparator} />

        <View style={styles.textWrapper}>
          <Ionicons name="ios-logo-whatsapp" color="green" size={20} />
          <Text style={styles.userInfo}>
            {states.info.contratante.telefone}
          </Text>
        </View>

        <View style={styles.textSeparator} />

        <View style={styles.textWrapper}>
          <MaterialIcons name="email" color="#D1481C" size={20} />
          <Text style={styles.userName}>{states.info.contratante.email}</Text>
        </View>
      </View>

      <View style={styles.separator} />
    </>
  );
};
