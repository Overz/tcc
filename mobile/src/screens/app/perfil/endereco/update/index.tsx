import React, { createRef, useEffect, useState } from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { View, Alert, ToastAndroid, ScrollView } from 'react-native';
import { HelperText, TextInput, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { TextInputMask } from 'react-native-masked-text';
import { Feather } from '@expo/vector-icons';

// Contexts
import { useAuth, UserAddress } from '~/contexts/auth';

// Components
import { AppHeaderComponent } from '~/components/header/app';

// Apis
import { IbgeApi, ibgeApi } from '~/services';

import { styles } from './styles';
import { PickerProps, STATES } from '~/screens/app/options';
import { getError, handleMessage } from '~/errors/handle-message';
import { googleGeocodeAsync } from 'expo-location/build/LocationGoogleGeocoding';

export const UpdateAddressScreen: React.FC<DrawerContentComponentProps> = (
  props
) => {
  const { user, saveAddress } = useAuth();
  const [form, setForm] = useState({
    nome: '',
    cep: '',
    bairro: '',
    rua: '',
    numero: '',
    estado: 'Selecione',
    cidade: '',
  });
  const [ibgeCidades, setIbgeCidades] = useState<PickerProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  const refCep = createRef<TextInputMask>();

  const cleanStates = () => {
    setForm({
      bairro: '',
      cep: '',
      cidade: '',
      nome: '',
      numero: '',
      rua: '',
      estado: '',
    });
  };

  const newAddress = async () => {
    try {
      if (
        !form ||
        !form.bairro ||
        !form.cep ||
        !form.cidade ||
        !form.estado ||
        !form.nome ||
        !form.numero ||
        !form.rua
      ) {
        Alert.alert('', 'Preencha Todos os Campos!');
        return;
      }

      setLoading(true);

      form.rua = form.rua.trim();
      form.cep = form.cep.trim();
      form.bairro = form.bairro.trim();
      form.cidade = form.cidade.trim();
      form.estado = form.estado.trim();
      form.numero = form.numero.trim();
      form.nome = form.nome.trim();

      // 'rua, numero - bairro, cidade - uf'
      const toFind = `${form.rua}, ${form.numero} - ${form.bairro}, ${form.cidade} - ${form.estado}, ${form.cep}, Brasil`;
      console.log('CONSULTANDO: ', toFind);
      const addrs = await googleGeocodeAsync(toFind);

      console.log('ENCONTRADO: ', addrs.length);

      if (addrs.length <= 0) {
        Alert.alert(
          'Erro',
          'Por favor, verifique o endereço cadastrado!' +
            '\n\nProblema ocorrido na busca pela Geo Localização!',
          [{ text: 'Ok' }]
        );
        setLoading(false);
        cleanStates();
        return;
      }

      const { latitude, longitude } = addrs[0];
      const finalData = {
        ...form,
        latitude,
        longitude,
        pais: 'Brasil',
      } as UserAddress;

      if (user?.endereco) {
        for (let i = 0; i < user.endereco.length; i++) {
          if (user.endereco[i].nome === finalData.nome) {
            Alert.alert(
              'Erro',
              '"Nome" informado informado já existente.\n\nPor favor selecione outro.'
            );
            setLoading(false);
            return;
          }
        }
      }

      await saveAddress(finalData);
      setLoading(false);
      cleanStates();
      ToastAndroid.show('Cadastrado!', ToastAndroid.SHORT);
    } catch (err) {
      const erro = handleMessage(err) || '';
      console.log('ERRO CADASTRANDO ENDERECO: ', erro);
      setError(erro);
      setLoading(false);
      setVisible(true);
      cleanStates();
    }
  };

  const updateCidadesCombobox = async () => {
    const r = (await ibgeApi.get<IbgeApi[]>(`${form.estado}/municipios`)).data;
    r.length && ToastAndroid.show('Consultando cidades', ToastAndroid.LONG);
    setIbgeCidades(r.map(({ nome }) => ({ label: nome, value: nome })));
  };

  useEffect(() => {
    updateCidadesCombobox();
  }, [form.estado]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <AppHeaderComponent {...props} text="Endereços" />

      <View>
        <TextInput
          label="Nome"
          mode="outlined"
          dataDetectorTypes="address"
          autoCompleteType="street-address"
          placeholder="Nome (Como ficara visivel)"
          value={form.nome}
          onChangeText={(nome) => setForm((f) => ({ ...f, nome }))}
        />
        <HelperText type="error" visible={visible}>
          {getError(/nome/g, error)}
        </HelperText>
      </View>

      <View>
        <TextInput
          label="CEP"
          mode="outlined"
          onChangeText={(cep) => setForm((f) => ({ ...f, cep }))}
          dataDetectorTypes="address"
          autoCompleteType="street-address"
          value={form.cep}
          render={(props) => (
            <TextInputMask
              {...props}
              type="zip-code"
              maxLength={9}
              value={form.cep}
              ref={refCep}
              onChangeText={(cep) => {
                setForm((f) => ({ ...f, cep }));
                props.onChangeText?.(cep);
              }}
              dataDetectorTypes="address"
              autoCompleteType="street-address"
            />
          )}
        />
        <HelperText type="error" visible={visible}>
          {getError(/cep/gi, error)}
        </HelperText>
      </View>

      <View>
        <TextInput
          label="Bairro"
          mode="outlined"
          value={form.bairro}
          onChangeText={(bairro) => setForm((f) => ({ ...f, bairro }))}
          dataDetectorTypes="address"
          autoCompleteType="street-address"
        />
        <HelperText type="error" visible={visible}>
          {getError(/bairro/gi, error)}
        </HelperText>
      </View>

      <View>
        <TextInput
          label="Rua"
          mode="outlined"
          value={form.rua}
          onChangeText={(rua) => setForm((f) => ({ ...f, rua }))}
          dataDetectorTypes="address"
          autoCompleteType="street-address"
        />
        <HelperText type="error" visible={visible}>
          {getError(/rua/gi, error)}
        </HelperText>
      </View>

      <View>
        <TextInput
          label="Número"
          mode="outlined"
          value={form.numero}
          onChangeText={(numero) => setForm((f) => ({ ...f, numero }))}
          dataDetectorTypes="address"
          autoCompleteType="street-address"
        />
        <HelperText type="error" visible={visible}>
          {getError(/rua/gi, error)}
        </HelperText>
      </View>

      <View style={styles.picker}>
        <Picker
          mode="dropdown"
          selectedValue={form.estado}
          onValueChange={(uf) => setForm((f) => ({ ...f, estado: String(uf) }))}
        >
          {STATES.map(({ label, value }) => (
            <Picker.Item key={label} label={label} value={value} />
          ))}
        </Picker>
      </View>

      <View style={styles.picker}>
        <Picker
          mode="dropdown"
          selectedValue={form.cidade}
          onValueChange={(cidade) =>
            setForm((f) => ({ ...f, cidade: String(cidade) }))
          }
        >
          {ibgeCidades.map(({ label, value }) => (
            <Picker.Item key={label} label={label} value={value} />
          ))}
        </Picker>
      </View>

      <Button
        mode="contained"
        loading={loading}
        contentStyle={{ flexDirection: 'row-reverse' }}
        onPress={newAddress}
        icon={() => <Feather name="refresh-cw" color="white" size={20} />}
      >
        Cadastrar
      </Button>
    </ScrollView>
  );
};
