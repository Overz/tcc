import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Accuracy, getCurrentPositionAsync } from 'expo-location';

// Contexts
import { useAuth, UserAddress } from '~/contexts/auth';

// Components
import { AddressListItem } from './items';
import { LoadComponent } from '~/components/load';

// Others
import marker from '~/img/marker.svg';
import { styles } from './styles';
import { AppRoutes as Routes } from '~/constants/routes';

const Separator: React.FC = () => <View style={styles.separator} />;

export const UserAddressScreen: React.FC<DrawerContentComponentProps> = ({
  navigation,
}) => {
  const { user, deleteAddress } = useAuth();
  const [states, setStates] = useState({
    loading: true,
    deleting: false,
    latitude: user?.location?.latitude || 0,
    longitude: user?.location?.longitude || 0,
  });

  const remove = (data: UserAddress) => {
    Alert.alert('Remover', 'Deseja mesmo remover este endereço?', [
      {
        text: 'Sim',
        onPress: () => {
          setStates((s) => ({ ...s, deleting: true }));
          deleteAddress(data).then(() =>
            setStates((s) => ({ ...s, deleting: false }))
          );
        },
      },
      { text: 'Não' },
    ]);
  };

  useEffect(() => {
    getCurrentPositionAsync({ accuracy: Accuracy.Highest }).then(
      ({ coords: { latitude, longitude } }) => {
        setStates((s) => ({ ...s, loading: false, latitude, longitude }));
      }
    );
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.mapContainer}>
          {states.loading ? (
            <LoadComponent center />
          ) : (
            <MapView
              provider="google"
              loadingEnabled
              showsMyLocationButton
              showsUserLocation
              mapType="standard"
              rotateEnabled={false}
              cacheEnabled
              initialRegion={{
                latitude: states.latitude,
                longitude: states.longitude,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
              }}
              onMapReady={() => setStates((s) => ({ ...s, loading: false }))}
              style={styles.mapStyle}
            >
              {user?.endereco &&
                user?.endereco.map(({ latitude, longitude, nome, id }) => (
                  <Marker
                    key={id}
                    icon={marker}
                    coordinate={{ latitude, longitude }}
                  >
                    <Callout key={id} tooltip>
                      <View style={styles.callout}>
                        <Text>{nome}</Text>
                      </View>
                    </Callout>
                  </Marker>
                ))}
            </MapView>
          )}
        </View>
        <Text style={{ fontSize: 11 }}>
          A localização atual é pega de acordo com sua geo-localização
        </Text>

        <View style={{ paddingVertical: 10 }}>
          <Text style={styles.infoAddress}>Meus endereços</Text>
          <Button
            mode="contained"
            color="black"
            style={{ marginVertical: 15 }}
            contentStyle={{ flexDirection: 'row-reverse' }}
            icon={() => (
              <MaterialCommunityIcons
                name="map-marker-plus"
                color="white"
                size={20}
              />
            )}
            onPress={() =>
              navigation.navigate(Routes.ProfileUpdateAddressRouter)
            }
          >
            Adicionar
          </Button>
        </View>

        <Separator />

        {states.deleting ? (
          <LoadComponent center />
        ) : (
          user?.endereco &&
          user.endereco.map((data) => (
            <AddressListItem
              data={data}
              onDelete={() => remove(data)}
              key={data.id}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
