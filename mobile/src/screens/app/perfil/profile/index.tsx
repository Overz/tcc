import React, { createRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { Avatar, Button, HelperText, TextInput } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

// Context
import { useAuth } from '~/contexts/auth';

// Api
import { api } from '~/services';

// Styles
import { styles } from './styles';

// Others
import { USER_DATA } from '~/constants/constants';
import { AppRoutes as Routes } from '~/constants/routes';
import { handleMessage, getError } from '~/errors/handle-message';
import { getUserPersonalStorage } from '~/hooks';

const placeholder = `Sou formado em ...

Trabalho na area a...

Meus conhecimentos são...

Trabalhei como...

Meu crescimento profissional é...

Minhas metas são...`;

export const UserDataScreen: React.FC<DrawerContentComponentProps> = ({
  navigation,
}) => {
  const { user, setUser } = useAuth();
  const [isAvatarText, setIsAvatarText] = useState(false);
  const [help, setHelp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState({
    nome: user?.nome,
    telefone: user?.telefone,
    cpf: user?.cpf,
    email: user?.email,
    sobre: user?.sobre,
    pic: user?.pic,
  });
  const [edit, setEdit] = useState({
    nome: false,
    telefone: false,
    email: false,
    sobre: false,
  });
  const refCpf = createRef<any>();
  const refTelefone = createRef<any>();

  useEffect(() => {
    if (data.pic?.length && data.pic.length <= 2) {
      setIsAvatarText(true);
    } else {
      setIsAvatarText(false);
    }
  }, [isAvatarText, navigation]);

  const changeImage = async () => {
    try {
      const storage = await getUserPersonalStorage();
      if (storage) {
        const result = await storage();

        if (!result?.cancelled) {
          setData((d) => ({ ...d, pic: result.base64 }));
          setIsAvatarText(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const atualizar = async () => {
    try {
      setLoading(true);
      const update = { ...user, ...data } as any;

      delete update.ativo;
      delete update.cpf;
      delete update.id;
      delete update.senha;
      delete update.terms;
      delete update.location;

      if (update.email === user?.email) {
        delete update.email;
      }

      if (update.telefone === user?.telefone) {
        delete update.telefone;
      }

      if (update.pic === user?.pic) {
        delete update.pic;
      }

      if (!update.sobre || update.sobre === user?.sobre) {
        delete update.sobre;
      }

      if (update.nome === user?.nome) {
        delete update.nome;
      }

      if (Object.keys(update).length === 0) {
        ToastAndroid.show('Nada para atualizar', ToastAndroid.SHORT);
        setLoading(false);
        return;
      }

      await api.put(`/api/usuario/${user?.id}`, {
        nome: update.nome,
        email: update.email,
        telefone: update.telefone,
        sobre: update.sobre,
        pic: update.pic,
      });

      const usr = (await api.get(`/api/usuario/${user?.id}`)).data;
      const obj = { ...user, ...usr, senha: user?.senha };

      setData(obj);
      setUser(obj);
      await AsyncStorage.setItem(USER_DATA, JSON.stringify(obj));
      setLoading(false);

      setEdit({ email: false, nome: false, telefone: false, sobre: false });

      ToastAndroid.show('Atualizado!', ToastAndroid.SHORT);
      Alert.alert('Voltar', 'Deseja voltar para a tela principal?', [
        {
          text: 'Sim',
          onPress: () => navigation.navigate(Routes.DashboardRouter),
        },
        {
          text: 'Não',
        },
      ]);
    } catch (err) {
      Alert.alert('Error updating date! - Server sider Error');
      setError(handleMessage(err) || '');
      setHelp(true);
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.containerAvatar}>
        <TouchableOpacity style={styles.avatar} onPress={changeImage}>
          {isAvatarText ? (
            <Avatar.Text size={130} label={data.pic || ''} />
          ) : (
            <Avatar.Image
              size={130}
              source={{ uri: `data:image/gif;base64,${data.pic}` }}
            />
          )}
        </TouchableOpacity>
      </View>

      <View>
        <TextInput
          mode={edit.nome ? 'outlined' : 'flat'}
          editable={edit.nome}
          label="Nome"
          value={data.nome}
          right={
            <TextInput.Icon
              name={() => <MaterialIcons name="edit" color="#667" size={25} />}
              onPress={() => setEdit((edit) => ({ ...edit, nome: !edit.nome }))}
            />
          }
          onChangeText={(nome) => setData({ ...data, nome })}
        />
        <HelperText type="error" visible={help}>
          {getError(/nome/g, handleMessage(error))}
        </HelperText>
      </View>

      <View>
        <TextInput
          label="CPF"
          editable={false}
          value={data.cpf}
          right={
            <TextInput.Icon
              name={() => <MaterialIcons name="info" color="red" size={25} />}
              onPress={() =>
                ToastAndroid.show(
                  'CPF Não pode ser alterado!',
                  ToastAndroid.SHORT
                )
              }
            />
          }
          render={(props) => (
            <TextInputMask
              {...props}
              type="cpf"
              maxLength={14}
              value={data.cpf}
              ref={refCpf}
            />
          )}
        />
      </View>

      <View style={{ marginTop: 25 }}>
        <TextInput
          mode={edit.telefone ? 'outlined' : 'flat'}
          editable={edit.telefone}
          label="Telefone"
          value={data.telefone}
          onChangeText={(telefone) => setData({ ...data, telefone })}
          right={
            <TextInput.Icon
              name={() => <MaterialIcons name="edit" color="#667" size={25} />}
              onPress={() =>
                setEdit((edit) => ({ ...edit, telefone: !edit.telefone }))
              }
            />
          }
          render={(props) => (
            <TextInputMask
              {...props}
              type="cel-phone"
              maxLength={15}
              value={data.telefone}
              ref={refTelefone}
            />
          )}
        />
        <HelperText type="error" visible={help}>
          {getError(/telefone/g, handleMessage(error))}
        </HelperText>
      </View>

      <View>
        <TextInput
          mode={edit.email ? 'outlined' : 'flat'}
          editable={edit.email}
          label="Email"
          value={data.email}
          onChangeText={(email) => setData({ ...data, email })}
          right={
            <TextInput.Icon
              name={() => <MaterialIcons name="edit" color="#667" size={25} />}
              onPress={() =>
                setEdit((edit) => ({ ...edit, email: !edit.email }))
              }
            />
          }
        />
        <HelperText type="error" visible={help}>
          {getError(/email/g, handleMessage(error))}
        </HelperText>
      </View>

      <View>
        <TextInput
          mode={edit.sobre ? 'outlined' : 'flat'}
          editable={edit.sobre}
          value={data.sobre}
          onChangeText={(sobre) => setData({ ...data, sobre })}
          multiline
          maxLength={665}
          right={
            <TextInput.Icon
              name={() => <MaterialIcons name="edit" color="#667" size={25} />}
              onPress={() =>
                setEdit((edit) => ({ ...edit, sobre: !edit.sobre }))
              }
            />
          }
          placeholder={placeholder}
          numberOfLines={665}
          style={styles.sobre}
        />
        <HelperText type="error" visible={help}>
          {getError(/sobre/g, handleMessage(error))}
        </HelperText>
      </View>

      <Button
        loading={loading}
        mode="contained"
        onPress={atualizar}
        contentStyle={{ flexDirection: 'row-reverse' }}
        icon={() => <Feather name="refresh-cw" color="white" size={20} />}
      >
        Atualizar
      </Button>
    </ScrollView>
  );
};
