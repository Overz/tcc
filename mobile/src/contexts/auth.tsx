import React, { createContext, useState, useContext, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_DATA } from '~/constants/constants';
import { api } from '~/services/index';
import { handleMessage } from '~/errors/handle-message';
import { ToastAndroid } from 'react-native';

export interface UserAddress {
  id?: number;
  nome: string;
  uf: string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
  latitude: number;
  longitude: number;
}

export interface User {
  id: number;
  email: string;
  senha: string;
  nome: string;
  cpf: string;
  telefone: string;
  endereco?: UserAddress[];
  ativo: 'A' | 'I';
  sobre: string;
  pic: string;
  location: {
    latitude: number;
    longitude: number;
    cidade: string;
  };
}

interface SignIn {
  email: string;
  senha: string;
  terms: boolean;
}

interface ForgotPassword {
  email: string;
  token: string;
  senha: string;
}

interface SignUp {
  nome: string;
  cpf: string;
  telefone: string;
  about: string;
  email: string;
  senha: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  address: UserAddress | null;
  formValues: any;
  setUser: (_user: User) => void;
  signOut: () => Promise<void>;
  signIn: (_sigin: SignIn) => Promise<void>;
  signUp: (_data: SignUp) => Promise<void>;
  setAddress: (_addr: UserAddress) => void;
  saveAddress: (_addr: UserAddress) => Promise<void>;
  deleteAddress: (_addr: UserAddress) => Promise<void>;
  forgotPassword: (
    _stage: 'esqueci-senha' | 'resetar-senha',
    _data: ForgotPassword | any
  ) => Promise<void>;
  handleFormValues: (_props: any) => void;
}

const AuthContext = createContext({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [formValues, setFormValues] = useState({});
  const [address, setAddress] = useState<UserAddress | null>(null);

  /**
   * Seta os dados do formulario de cadastro/esqueci-senha
   * @param props form
   */
  const handleFormValues = useCallback(
    (props: any) => setFormValues({ ...props }),
    []
  );

  /**
   * Pega as Duas primeiras letras
   * de Nome e Sobrenome, para ter
   * um avatar com duas Letras.
   *
   * @param nome Username
   * @returns string
   */
  const avatarText = useCallback((nome: string) => {
    const name = nome.split(' ');
    const first = name?.[0].substr(0, 1);
    if (name.length === 2) {
      const last = name?.[1].substr(0, 1);
      return `${first}${last}`;
    }
    return first;
  }, []);

  /**
   * Realiza o login do usuario.
   * Caso seja uma rota de "login" e não de "cadastro",
   * é necessário aceitar os termos para cotinuar.
   *
   * @param email
   * @param senha
   * @param type
   * @param terms?
   * @returns void
   */
  const signIn = useCallback(
    async ({ email, senha, terms }: SignIn): Promise<void> => {
      const login = await api.post('/api/usuario/login', { email, senha });

      const cookie = login.headers['set-cookie'][0];
      api.defaults.headers.cookie = cookie;

      const dadosUsuario = (await api.get('/api/usuario/atual')).data;

      const usuarioFinal = {
        ...dadosUsuario,
        endereco: [...dadosUsuario.enderecos],
        senha,
        terms,
      } as User;

      setUser(usuarioFinal);

      await AsyncStorage.setItem(USER_DATA, JSON.stringify(usuarioFinal));
    },
    []
  );

  /**
   * Realiza o cadastro de um novo usuario
   *
   * @param data SignUp
   */
  const signUp = useCallback(async (data: SignUp): Promise<void> => {
    await api.post('/api/usuario/novo', {
      ...data,
      pic: avatarText(data.nome),
    });
  }, []);

  /**
   * "Desloga" o usuario, limpando o cookie de requisição
   * e o storage
   */
  const signOut = useCallback(async (): Promise<void> => {
    // Ações : Limpa todo o storage e deixa o usuario null
    // fazendo com q a tela renderize para tela de login
    await api.post('/api/usuario/logout');
    await AsyncStorage.clear();
    api.defaults.headers.cookie = null;
    setUser(null);
  }, []);

  /**
   * Recupera a senha.
   *
   * @param stage pagina
   * @param data dados
   */
  const forgotPassword = useCallback(
    async (
      stage: 'esqueci-senha' | 'resetar-senha',
      data: ForgotPassword
    ): Promise<void> => {
      if (stage === 'esqueci-senha') {
        await api.post('/api/usuario/esqueci-senha', data);
      }

      if (stage === 'resetar-senha') {
        await api.post('/api/usuario/resetar-senha', data);
      }
    },
    []
  );

  /**
   * Cadastra um novo endereço
   * e atualiza o estado do usuário.
   *
   * @param data Endereço
   */
  const saveAddress = useCallback(async (data: UserAddress): Promise<void> => {
    const res = (await api.post(`/api/endereco`, data)).data;
    const usr = { ...user, endereco: [res, ...(user?.endereco || [])] } as User;
    await AsyncStorage.setItem(USER_DATA, JSON.stringify(usr));
    setUser((u) => ({ ...u, ...(usr as User) }));
  }, []);

  /**
   * Deleta um endereço e atualiza o estado do usuario.
   * @param data Endereço
   */
  const deleteAddress = useCallback(
    async (data: UserAddress): Promise<void> => {
      try {
        await api.delete(`/api/endereco/${data.id}`);
      } catch (err) {
        const msg = handleMessage(err) || '';
        if (
          msg ===
          'Este endereço esta vinculado a algúm trabalho e não pode ser removido!'
        ) {
          ToastAndroid.show(msg, ToastAndroid.LONG);
        } else {
          console.log('deleteAddres: ', msg);
        }
        return;
      }

      const endereco = user?.endereco?.filter(
        (e) => e !== data
      ) as UserAddress[];
      const usr = { ...user, endereco } as User;

      setUser((u) => ({ ...(u as User), endereco }));
      await AsyncStorage.setItem(USER_DATA, JSON.stringify(usr));

      ToastAndroid.show('Endereço removido!', ToastAndroid.SHORT);
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        signed: user?.ativo === 'A',
        user,
        address,
        formValues,
        setUser,
        signIn,
        signOut,
        signUp,
        setAddress,
        deleteAddress,
        saveAddress,
        forgotPassword,
        handleFormValues,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('"authContext" Precisa ser usado com o "AuthProvider"');
  }

  return context;
};

export { AuthContext, AuthProvider, useAuth };
