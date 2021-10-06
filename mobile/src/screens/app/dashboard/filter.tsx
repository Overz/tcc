import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ToastAndroid } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Component
import { ModalComponent } from '~/components/modal';

import { styles } from './styles';
import {
  ALIMENTICIOS,
  CONSULTORIA,
  EDUCACAO,
  Grupos,
  GRUPOS,
  MAO_DE_OBRA,
  PickerProps,
  PUBLICO,
  SAUDE,
  TI,
} from '../options';
import { IbgeApi, ibgeApi } from '~/services';
import { FilterValues, ID, useAuth, useJob, User } from '~/contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AREA_FILTER_VALUE,
  CIDADE_FILTER_VALUE,
  GRUPO_FILTER_VALUE,
  IBGE_CIDADES,
} from '~/constants/constants';
import { googleReverseGeocodeAsync } from 'expo-location/build/LocationGoogleGeocoding';

interface DashboardFilterProps {
  // status: boolean;
  onFilter: () => void;
  // onCheckbox: () => void;
  onModalClose: () => void;
  onGrupoChange?: (_item: ID, _index: number) => void;
  onAreaChange?: (_item: ID, _index: number) => void;
  onCidadeChange?: (_item: ID, _index: number) => void;
  onCleanFilter?: () => void;
}

interface PickerItem {
  list: PickerProps[];
  selectedValue: string;
  setSelectedValue: (_item: string) => void;
  onPickerValueChange?: (_item: ID, _index: number) => void;
}

const Filter: React.FC<PickerItem> = ({
  list,
  selectedValue,
  setSelectedValue,
  onPickerValueChange,
}) => (
  <View style={styles.picker}>
    <Picker
      selectedValue={selectedValue}
      onValueChange={(item, index) => {
        setSelectedValue(item.toString());
        onPickerValueChange?.(item, index);
      }}
    >
      {list.map(({ label, value }) => (
        <Picker.Item label={label} value={value} key={value} />
      ))}
    </Picker>
  </View>
);

const DEFAULT = [{ label: 'Selecione', value: 'Selecione' }];

export const DashboardFilter: React.FC<DashboardFilterProps> = ({
  // status,
  // onCheckbox,
  onFilter,
  onModalClose,
  onGrupoChange,
  onAreaChange,
  onCidadeChange,
}) => {
  const { user } = useAuth();
  const { filters, setFilters } = useJob();
  const [states, setStates] = useState({
    cidade: filters.cidade || 'Selecione',
    grupo: filters.grupo || 'Selecione',
    area: filters.area || 'Selecione',
    cidadeList: DEFAULT,
    areaList: DEFAULT,
  });

  const updateComboboxArea = () => {
    switch (states.grupo) {
      case Grupos.ALIMENTICIOS:
        setStates((f) => ({ ...f, areaList: ALIMENTICIOS }));
        break;
      case Grupos.CONSULTORIA:
        setStates((f) => ({ ...f, areaList: CONSULTORIA }));
        break;
      case Grupos.EDUCACAO:
        setStates((f) => ({ ...f, areaList: EDUCACAO }));
        break;
      case Grupos.MAO_DE_OBRA:
        setStates((f) => ({ ...f, areaList: MAO_DE_OBRA }));
        break;
      case Grupos.SAUDE:
        setStates((f) => ({ ...f, areaList: SAUDE }));
        break;
      case Grupos.TI:
        setStates((f) => ({ ...f, areaList: TI }));
        break;
      case Grupos.PUBLICO:
        setStates((f) => ({ ...f, areaList: PUBLICO }));
        break;
      case Grupos.OUTROS:
        setStates((f) => ({
          ...f,
          areaList: [{ label: 'Outros', value: 'Outros' }],
        }));
        break;
      default:
        setStates((f) => ({ ...f, areaList: DEFAULT }));
    }
  };

  const loadCidades = async () => {
    const defaultValue = [{ label: 'Selecione', value: '' }];
    const storageCidades = await AsyncStorage.getItem(IBGE_CIDADES);

    if (!storageCidades) {
      const { location } = user as User;
      const addrs = await googleReverseGeocodeAsync(location);

      const split = addrs[0].region?.split(' ') || [];

      if (split.length > 1) {
        const uf = String(
          split[0].charAt(0) + split[1].charAt(0)
        ).toUpperCase();

        ToastAndroid.show('Consultando cidades', ToastAndroid.LONG);
        const ibge = (await ibgeApi.get<IbgeApi[]>(`${uf}/municipios`)).data;

        const cidades = ibge.map(({ nome }) => ({ label: nome, value: nome }));

        await AsyncStorage.setItem(IBGE_CIDADES, JSON.stringify(cidades));
        setStates((f) => ({
          ...f,
          cidadeList: [...defaultValue, ...cidades],
        }));
      }
    } else {
      setStates((f) => ({
        ...f,
        cidadeList: [...defaultValue, ...JSON.parse(storageCidades)],
      }));
    }
  };

  const saveFilters = async (filterValues: FilterValues) => {
    const { area, cidade, grupo } = filterValues;

    if (area) {
      setStates((f) => ({ ...f, area }));
      setFilters({ ...filters, area });
      await AsyncStorage.setItem(AREA_FILTER_VALUE, area);
    }

    if (cidade) {
      setStates((f) => ({ ...f, cidade }));
      setFilters({ ...filters, cidade });
      await AsyncStorage.setItem(CIDADE_FILTER_VALUE, cidade);
    }

    if (grupo) {
      setStates((f) => ({ ...f, grupo }));
      setFilters({ ...filters, grupo });
      await AsyncStorage.setItem(GRUPO_FILTER_VALUE, grupo);
    }
  };

  useEffect(() => updateComboboxArea(), [states.grupo]);

  useEffect(() => {
    ToastAndroid.show('Atualizando', ToastAndroid.SHORT);
    loadCidades();
  }, []);

  return (
    <ModalComponent
      visible
      width="85%"
      height="80%"
      onRequestClose={onModalClose}
    >
      <Text style={{ fontSize: 20 }}>Filtrar Trabalhos</Text>

      <View style={{ width: 250 }}>
        <Text>{'  Grupo'}</Text>
        <Filter
          list={GRUPOS}
          selectedValue={states.grupo}
          setSelectedValue={(grupo) => saveFilters({ grupo })}
          onPickerValueChange={onGrupoChange}
        />

        <Text>{'  Area'}</Text>
        <Filter
          list={states.areaList}
          selectedValue={states.area}
          setSelectedValue={(area) => saveFilters({ area })}
          onPickerValueChange={onAreaChange}
        />

        <Text>{'  Cidade'}</Text>
        <Filter
          list={states.cidadeList}
          selectedValue={states.cidade}
          setSelectedValue={(cidade) => saveFilters({ cidade })}
          onPickerValueChange={onCidadeChange}
        />

        {/* <View style={styles.checkBoxWrapper}>
          <Checkbox
            color={colors.blueSky}
            onPress={onCheckbox}
            status={status ? 'checked' : 'unchecked'}
          />
          <Text>Apenas minha cidade</Text>
        </View> */}
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Pressable style={styles.closeModalButton} onPress={onModalClose}>
          <Text style={styles.closeModalButtonText}>Cancelar</Text>
        </Pressable>
        <Pressable style={styles.filterModalButton} onPress={onFilter}>
          <Text style={styles.helpText}>Filtrar</Text>
        </Pressable>
      </View>
    </ModalComponent>
  );
};
