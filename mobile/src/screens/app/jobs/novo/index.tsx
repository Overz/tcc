import React, { useEffect, useState } from 'react';
import { View, Text, ToastAndroid, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Button, TextInput } from 'react-native-paper';
import DatePicker from '@react-native-community/datetimepicker';
import CurrencyInput from 'react-native-currency-input';
import { ScrollView } from 'react-native-gesture-handler';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

// Context
import { ID, PublishJob, useAuth, useJob, UserAddress } from '~/contexts';

// Components
import { AppHeaderComponent } from '~/components/header/app';
import { HelpComponent } from '~/components/help';

// Others
import { lorem } from '~/utils/lorem-ipsum';
import {
  ALIMENTICIOS,
  CONSULTORIA,
  EDUCACAO,
  Grupos,
  GRUPOS,
  MAO_DE_OBRA,
  PUBLICO,
  SAUDE,
  TI,
} from '../../options';
import { styles } from './styles';
import { FunctionVoid, AppRoutes as Routes } from '~/constants';
import { handleMessage } from '~/errors/handle-message';
import ms from 'ms';

type PickerProps = { label: string; value: string; id?: ID }[];

interface InputPickerProps {
  data: PickerProps;
  selectedValue: string;
  info: string;
  enable?: boolean;
  onValueChange: FunctionVoid;
}

interface StatesProps {
  help: boolean;
  loading: boolean;
  online: false;
  tipo: PickerProps;
  datePicker: boolean;
  area: PickerProps;
  enderecos: PickerProps;
  enable: boolean | null;
}

const InputPicker: React.FC<InputPickerProps> = ({
  data,
  info,
  selectedValue,
  onValueChange,
  enable,
}) => (
  <View>
    <Text style={{ marginLeft: 10 }}>{info}</Text>
    <View style={styles.picker}>
      <Picker
        enabled={enable}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        {data.map(({ label, value }) => (
          <Picker.Item label={label} value={value} key={label} />
        ))}
      </Picker>
    </View>
  </View>
);

const DEFAULT = [{ label: 'Selecione', value: '', id: '' }];

const placeholder = `Descreva tudo sobre o trabalho para o futuro candidato ficar ciente no que ele ira trabalhar.

Exemplo:

Este trabalho requer experiência em pintura de casas...

Aceito trabalho em conjunto...

Horarios difinidos são...
`;

export const NewJobScreen: React.FC<DrawerContentComponentProps> = (props) => {
  const { user } = useAuth();
  const { publishJob } = useJob();
  const [states, setStates] = useState<StatesProps>({
    help: false,
    loading: false,
    datePicker: false,
    online: false,
    area: DEFAULT,
    tipo: [
      { label: 'Online', value: 'O' },
      { label: 'Presencial', value: 'P' },
    ],
    enable: null,
    enderecos: [
      ...DEFAULT,
      ...(user?.endereco?.map(({ nome, id }) => ({
        label: nome,
        value: nome,
        id,
      })) as PickerProps),
    ],
  });

  const [form, setForm] = useState({
    grupo: '',
    area: '',
    tipo: 'O',
    descricao: '',
    remuneracao: 0,
    endereco: ['', ''],
    dtentrega: new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate()
    ),
  });

  const updateComboboxArea = () => {
    switch (form.grupo) {
      case Grupos.ALIMENTICIOS:
        setStates((f) => ({ ...f, area: ALIMENTICIOS }));
        break;
      case Grupos.CONSULTORIA:
        setStates((f) => ({ ...f, area: CONSULTORIA }));
        break;
      case Grupos.EDUCACAO:
        setStates((f) => ({ ...f, area: EDUCACAO }));
        break;
      case Grupos.MAO_DE_OBRA:
        setStates((f) => ({ ...f, area: MAO_DE_OBRA }));
        break;
      case Grupos.SAUDE:
        setStates((f) => ({ ...f, area: SAUDE }));
        break;
      case Grupos.TI:
        setStates((f) => ({ ...f, area: TI }));
        break;
      case Grupos.PUBLICO:
        setStates((f) => ({ ...f, area: PUBLICO }));
        break;
      case Grupos.OUTROS:
        setStates((f) => ({
          ...f,
          area: [{ label: 'Outros', value: 'Outros' }],
        }));
        break;
      default:
        setStates((f) => ({ ...f, area: DEFAULT }));
    }
  };

  const cleanForm = () => {
    setForm({
      grupo: '',
      area: '',
      tipo: 'O',
      descricao: '',
      remuneracao: 0,
      endereco: ['', ''],
      dtentrega: new Date(),
    });
  };

  const handlePublish = async () => {
    // TODO: Publicar o trabalho
    try {
      if (form.area === 'Selecione' || form.endereco[0] === 'Selecione') {
        ToastAndroid.show('Opção "Selecione" não é valida', ToastAndroid.SHORT);
        return;
      }
      setStates((s) => ({ ...s, loading: true }));

      let data = {};
      if (!form.endereco?.[1]) {
        data = { ...form, endereco: !!form.endereco?.[1] };
      } else {
        data = { ...form, endereco: form.endereco?.[1] || '' };
      }

      console.log('ENDERECO CADASTRADO: ', data);

      await publishJob(data as PublishJob);
      setStates((s) => ({ ...s, loading: false }));
      ToastAndroid.show('Publicado!', ToastAndroid.SHORT);
      cleanForm();
      props.navigation.goBack();
    } catch (err) {
      setStates((s) => ({ ...s, loading: false }));
      const erro = handleMessage(err) || '';
      erro && ToastAndroid.show(erro, ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    updateComboboxArea();
  }, [form.grupo]);

  useEffect(() => {
    console.log(user);

    if (form.tipo === 'P' && (user?.endereco as any).length <= 0) {
      Alert.alert(
        'Aviso',
        'Nenhum endereço cadastrado, deseja cadastrar novos endereços?',
        [
          {
            text: 'Cadastrar',
            onPress: () => {
              setForm((f) => ({ ...f, tipo: 'O' }));
              props.navigation.navigate(Routes.ProfileRouter);
            },
          },
          {
            text: 'Não',
            onPress: () => {
              setForm((s) => ({ ...s, tipo: 'O' }));
            },
          },
        ]
      );
    }

    if (user && user.endereco) {
      const picker = user.endereco.map(({ nome, id }) => ({
        label: nome,
        value: nome,
        id,
      }));

      setStates((s) => ({ ...s, enderecos: [...DEFAULT, ...picker] }));
    }
  }, [form.tipo]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppHeaderComponent {...props} text="Novo Trampo">
        <Entypo
          name="help"
          size={24}
          color="black"
          onPress={() => setStates((s) => ({ ...s, help: true }))}
        />
      </AppHeaderComponent>

      {states.help && (
        <HelpComponent
          fn={() => setStates((s) => ({ ...s, help: false }))}
          text={`${lorem(10)}`}
        />
      )}

      <InputPicker
        enable
        data={GRUPOS}
        info="Grupo de Atuação"
        selectedValue={form.grupo}
        onValueChange={(item) =>
          setForm((f) => ({ ...f, grupo: String(item) }))
        }
      />

      <InputPicker
        enable
        data={states.area}
        info="Área de Atuação"
        selectedValue={form.area}
        onValueChange={(item) => setForm((f) => ({ ...f, area: String(item) }))}
      />

      <InputPicker
        enable
        data={states.tipo}
        info="Modo de Trabalho"
        selectedValue={form.tipo}
        onValueChange={(item) => setForm((f) => ({ ...f, tipo: String(item) }))}
      />

      <InputPicker
        enable={form.tipo === 'P'}
        data={states.enderecos}
        info="Meus Endereços"
        selectedValue={form.endereco[0]}
        onValueChange={(item, i) => {
          const { value, id } = states.enderecos[i];
          setForm((f) => ({ ...f, endereco: [String(value), String(id)] }));
        }}
      />

      <View>
        <Text style={{ marginLeft: 10 }}>Remuneração</Text>
        <CurrencyInput
          style={[styles.picker, { padding: 10, fontSize: 16 }]}
          value={form.remuneracao}
          prefix="R$ "
          delimiter=","
          separator="."
          precision={2}
          maxLength={13}
          onChangeValue={(n) => setForm((f) => ({ ...f, remuneracao: n || 0 }))}
        />
      </View>

      <TextInput
        mode="outlined"
        value={form.descricao}
        onChangeText={(t) => setForm((f) => ({ ...f, descricao: t }))}
        multiline
        maxLength={1000}
        placeholder={placeholder}
        numberOfLines={1000}
        style={styles.descricao}
      />

      <Button
        style={{ marginBottom: 15 }}
        mode="contained"
        onPress={() => {
          setStates((s) => ({ ...s, datePicker: true }));
        }}
        contentStyle={{ flexDirection: 'row-reverse' }}
        icon={() => (
          <MaterialCommunityIcons
            name="calendar-month"
            color="white"
            size={24}
          />
        )}
      >
        {`Data de Entrega: ${form.dtentrega.getDate()}/${form.dtentrega.getMonth()}/${form.dtentrega.getFullYear()}`}
      </Button>

      {states.datePicker && (
        <DatePicker
          value={form.dtentrega}
          mode="datetime"
          display="spinner"
          minimumDate={new Date(new Date().getTime() + ms('1d'))}
          maximumDate={new Date(new Date().getTime() + ms('1y'))}
          onChange={(evt, date) => {
            setStates((s) => ({ ...s, datePicker: false }));

            if (evt.type === 'set' && date) {
              setForm((f) => ({
                ...f,
                dtentrega: new Date(
                  date.getFullYear(),
                  date.getMonth() + 1,
                  date.getDate()
                ),
              }));
            }
          }}
        />
      )}

      <Button
        loading={states.loading}
        mode="contained"
        onPress={handlePublish}
        contentStyle={{ flexDirection: 'row-reverse' }}
        icon={() => (
          <MaterialCommunityIcons
            name="newspaper-plus"
            color="white"
            size={23}
          />
        )}
      >
        Publicar
      </Button>
    </ScrollView>
  );
};
